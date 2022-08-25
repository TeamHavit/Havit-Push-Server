import mongoose from 'mongoose';

export interface IReminder {
  userId: mongoose.Schema.Types.ObjectId;
  contentId: Number;
  ogTitle: String;
  ogImage: String;
  url: String;
  time: Date;
}

export interface IReminderUpdateDTO {
  contentId: Number;
  time: Date;
}

export interface ReminderTitleUpdateDto {
  contentId: Number;
  ogTitle: string;
}

export interface IReminderDeleteDTO {
  contentId: Number;
}
