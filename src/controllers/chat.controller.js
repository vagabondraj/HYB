import {Chat} from '../models/chat.models.js';
import {Message }from '../models/message.models.js';
import {User} from '../models/user.models.js';
import {Notification} from '../models/notification.models.js';
import asyncHandler from '../utils/asyncHandler.js';
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';
import { uploadOnCloudinary }from '../utils/cloudinary.js';


const isParticipant = (chat, userId) => 
    chat.participants.some(p => (
        p._id?p._id.toString():p.toString()) === userId.toString()
    );

const getMyChats = asyncHandler(async (req, res) => {
  const chats = await Chat.find({ participants: req.user.id })
    .populate('participants', 'fullName userName avatar')
    .populate('request', 'title status')
    .sort({ updatedAt: -1 })
    .lean();

  if(!chats.length){
    return res
    .status(200)
    .json(new ApiResponse(200, {chats:[]}, "No chats found"));
  }
  
  const chatIds = chats.map(chat => chat._id);
  const lastMessages = await Message.aggregate([
    { $match: { chat: { $in: chatIds } } },
    { $sort: { createdAt: -1 } },
    {
      $group: {
        _id: '$chat',
        lastMessage: { $first: '$$ROOT' }
      }
    }
  ]);

  const lastMessageMap = {};
  lastMessages.forEach(({ _id, lastMessage }) => {
    lastMessageMap[_id.toString()] = lastMessage;
  });

  const result = chats.map(chat => ({...chat,
    lastMessage: lastMessageMap[chat._id.toString()] || null
  }));

  return res
    .status(200)
    .json(new ApiResponse(200, { chats: result }, 'Chats retrieved successfully'));
});

const getChatById = asyncHandler(async (req, res) => {
    const chat = await Chat.findById(req.params.id)
    .populate("participants", "fullName userName avatar")
    .populate("request", "title status");

    if(!chat)throw new ApiError("Chat not found", 404);
    if(!isParticipant(chat, req.user.id))
        throw new ApiError("Not authorized to access this chat", 403);

    return res
    .status(200)
    .json(new ApiResponse(200, { chat }, "Chat retrieved successfully"));
});

const sendMessage = asyncHandler(async (req, res) => {
  const { content } = req.body;
  const chatId = req.params.id;

  const chat = await Chat.findById(chatId);
  if (!chat) throw new ApiError('Chat not found', 404);
  if (!isParticipant(chat, req.user.id))
    throw new ApiError('Not authorized to send messages', 403);

  let image = null;
  if (req.file) {
    image = await uploadOnCloudinary(req.file.buffer, 'hyb/messages');
  }

  if (!content && !image) {
    throw new ApiError('Message content or image is required', 400);
  }

  const message = await Message.create({
    chat: chatId,
    sender: req.user.id,
    content: content || '',
    image
  });

  await message.populate('sender', 'fullName userName avatar');

  chat.updatedAt = Date.now();
  await chat.save();

  const receiver = chat.participants.find(
    p => p.toString() !== req.user.id
  );

 try {
     await Notification.create({
       user: receiver,
       type: 'new_message',
       request: chat.request,
       message: `New message from ${req.user.fullName}`
     });
 } catch (error) {
    console.log("Sendmessage error", error.message);
 }

  return res
    .status(201)
    .json(new ApiResponse(201, { message }, 'Message sent successfully'));
});

const getMessages = asyncHandler(async (req, res) => {
  const chatId = req.params.id;
  const page = Math.max(parseInt(req.query.page) || 1, 1);
  const limit = Math.min(parseInt(req.query.limit) || 50, 100);
  const skip = (page - 1) * limit;

  const chat = await Chat.findById(chatId);
  if (!chat) throw new ApiError('Chat not found', 404);
  if (!isParticipant(chat, req.user.id))
    throw new ApiError('Not authorized to view messages', 403);

  const [messages, total] = await Promise.all([
    Message.find({ chat: chatId })
      .populate('sender', 'fullName userName avatar')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit),
    Message.countDocuments({ chat: chatId })
  ]);

  try {
    await Message.updateMany(
      {
        chat: chatId,
        sender: { $ne: req.user.id },
        isRead: false
      },
      { $set: { isRead: true } }
    );
  } catch (error) {
    console.log(error.message);
  }

  res.status(200).json(
    new ApiResponse(
      200,
      {
        messages: messages.reverse(),
        pagination: {
          total,
          page,
          pages: Math.ceil(total / limit)
        }
      },
      'Messages retrieved successfully'
    )
  );
});

export {
    getMyChats,
    getChatById,
    sendMessage,
    getMessages
}
