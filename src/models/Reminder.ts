import mongoose from 'mongoose';
import { IReminder } from '../interfaces/IReminder';

const ReminderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  contentId: {
    type: Number,
    required: true,
  },
  ogTitle: {
    type: String,
    required: true,
  },
  ogImage: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  isSeen: {
    type: Boolean,
    required: true,
  },
  time: {
    type: Date,
    required: true,
  },
});

export default mongoose.model<IReminder & mongoose.Document>(
  'Reminder',
  ReminderSchema,
);
