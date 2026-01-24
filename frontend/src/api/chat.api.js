import axios from "./axios.api";
import {API_ROUTE} from "../utils/constant";

const chatAPI={
  // get all chat of that user
  getMyChats: async()=>{
    const {data} =await axios.get(API_ROUTE.CHAT.GET_MY_CHATS);
    return data;
  },
  // get-chat-by-id
  getChatById: async(chatId)=>{
    const {data}=await axios.get(
        API_ROUTE.CHAT.GET_CHAT_BY_ID(chatId)
    );
    return data;
  },
  //get message for a chat
  getMessages: async(chatId, page=1, limit = 50)=>{
    const {data} = await axios.get(
        API_ROUTE.CHAT.GET_MESSAGES(chatId),{
            params: {page,limit},
        }
    );
    return data;
  },
  sendMessage: async (chatId, {content, image}) => {
    const formData =new FormData();
    if(content) formData.append("content", content);
    if(image) formData.append("image", image);
    const {data}=await axios.post(
        API_ROUTE.CHAT.SEND_MESSAGE(chatId),
        formData,{
            headers:{
                "Content-Type": "multipart/form-data",
            },
        }
    );
    return data;
  },
  //del message
  deleteMessage: async(chatId, messageId)=>{
    const {data} =await axios.delete(
        API_ROUTE.CHAT.DELETE_MESSAGE(chatId, messageId)
    );
    return data;
  },
};

export default chatAPI;
