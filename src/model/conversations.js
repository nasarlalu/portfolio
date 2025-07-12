import mongoose from "mongoose";

const ConversationSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        title: {
            type: String,
            required: true
        },
        messages: [
            {
                role: {
                    type: String,
                    enum: ['user', 'model'],
                    required: true
                },
                content: {
                    type: String,
                    required: true
                },
                timestamp: {
                    type: Date,
                    default: Date.now
                }
            }
        ],
    },
    { timestamps: true }
);

const Conversation = mongoose.models.Conversation || mongoose.model("Conversation", ConversationSchema);
export default Conversation;
