import { Schema, model } from 'mongoose';

const ConversationSchema = new Schema({
  name: { type: String },
  hostUserId: {
    type: String,
    required: true
  },
  joiningUserIds: {
    type: [{ type: String }],
    default: []
  },
  messages: {
    type: [{
      userId: {
        type: String,
        required: true
      },
      text: { type: String }
    }]
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
});

export default model('Conversation', ConversationSchema);