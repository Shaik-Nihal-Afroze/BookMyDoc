import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema(
  {
    appointment: { type: mongoose.Schema.Types.ObjectId, ref: 'Appointment', required: true },
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    text: { type: String, trim: true },
    imageUrl: { type: String },
  },
  { timestamps: true }
);

const Message = mongoose.model('Message', messageSchema);
export default Message;