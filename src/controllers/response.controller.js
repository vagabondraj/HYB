import { Response } from "../models/response.models.js";
import { Request } from "../models/request.models.js";
import { Chat } from "../models/chat.models.js";
import { Notification } from "../models/notification.models.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { request } from "express";


const createResponse = asyncHandler(async (req, res) => {
    const {requestId, message} = req.body;

    const request = await Request.findById(requestId);
    if(!request){
        throw new ApiError(404, "Request not found");
    }

    if(request.requestedBy.toString() === req.user._id.toString()){
        throw new ApiError(400, "can't repond toyour own request");
    }
    if(request.status !== "open"){
        throw new ApiResponse(400, "can't respond to this request");
    }

    const alreadyResponded = await Response.findOne({
        request: requestId,
        responder:req.user._id
    });

    if(alreadyResponded){
        throw new ApiError(400, "You already responded to this request");
    }

    let image = null;
    if(req.file){
        const uploaded = await uploadOnCloudinary(req.file.path);
        if(!uploaded?.url){
            throw new ApiError(500, "Image upload failed");
        }
        image = uploaded.url;
    }

    const response = await Response.create({
        request:requestId,
        responder:req.user._id,
        message,
        image
    });

    await response.populate("responder", "fullName userName avatar");
    
    await Notification.create({
        user: request.requestedBy,
        type: "new_requestedBy",
        request: requestId,
        message: `${req.user.fullNmae} want to help with your request`
    });

    return res
    .status(201)
    .json(201,{response}, "Response submitted successfully");
});

const getResponsesForRequest = asyncHandler(async (req, res) => {
  const { requestId } = req.params;

  const request = await Request.findById(requestId);
  if (!request) {
    throw new ApiError(404, "Request not found");
  }

  if (request.requestedBy.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "Not authorized to view responses");
  }

  const responses = await Response.find({ request: requestId })
    .populate("responder", "fullName userName avatar branch year helpCount")
    .sort({ createdAt: -1 });

  res.status(200).json(
    new ApiResponse(200, { responses }, "Responses retrieved successfully")
  );
});

const getMyResponses = asyncHandler(async (req, res) => {
  const responses = await Response.find({ responder: req.user._id })
    .populate({
      path: "request",
      populate: {
        path: "requestedBy",
        select: "fullName userName avatar"
      }
    })
    .sort({ createdAt: -1 });

  res.status(200).json(
    new ApiResponse(200, { responses }, "Your responses retrieved successfully")
  );
});

const acceptResponse = asyncHandler(async (req, res) => {
  const response = await Response.findById(req.params.id);
  if (!response) {
    throw new ApiError(404, "Response not found");
  }

  const request = await Request.findById(response.request);
  if (!request) {
    throw new ApiError(404, "Request not found");
  }

  if (request.requestedBy.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "Not authorized to accept this response");
  }

  if (request.status !== "open") {
    throw new ApiError(400, "This request is no longer open");
  }

  response.status = "accepted";
  await response.save();

  request.status = "in-progress";
  request.acceptedHelper = response.responder;
  await request.save();

  await Response.updateMany(
    { request: request._id, _id: { $ne: response._id } },
    { status: "rejected" }
  );

  const chatExists = await Chat.findOne({
    request: request._id,
    participants: { $all: [req.user._id, response.responder] }
  });

  if (!chatExists) {
    await Chat.create({
      request: request._id,
      participants: [req.user._id, response.responder]
    });
  }

  await Notification.create({
    user: response.responder,
    type: "response_accepted",
    request: request._id,
    message: `Your help offer was accepted by ${req.user.fullName}`
  });

  res.status(200).json(
    new ApiResponse(200, { response }, "Response accepted successfully")
  );
});

const rejectResponse = asyncHandler(async (req, res) => {
  const response = await Response.findById(req.params.id);
  if (!response) {
    throw new ApiError(404, "Response not found");
  }

  const request = await Request.findById(response.request);
  if (!request) {
    throw new ApiError(404, "Request not found");
  }

  if (request.requestedBy.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "Not authorized to reject this response");
  }

  response.status = "rejected";
  await response.save();

  await Notification.create({
    user: response.responder,
    type: "response_rejected",
    request: request._id,
    message: "Your help offer was declined"
  });

  res.status(200).json(
    new ApiResponse(200, { response }, "Response rejected successfully")
  );
});


export {
  createResponse,
  getResponsesForRequest,
  getMyResponses,
  acceptResponse,
  rejectResponse
};