import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
    request: {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Request",
        required : true
    },
    participants : {
        type: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                required: true
            }
        ],
        validate: {
            validator: function(value){
                return (
            Array.isArray(value) &&
            value.length === 2 &&
            value[0].toString() !== value[1].toString()
                 );
            },
            message:"Chat must have exactly 2 participants"
        }
    }
}, {timestamps : true});


chatSchema.index(
  { request: 1, participants: 1 },
  { unique: true }
);

chatSchema.index({request : 1});
chatSchema.index({participants : 1});

export const Chat = mongoose.model("Chat", chatSchema);