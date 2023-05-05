import mongoose, { Document, Schema, Types } from "mongoose";

export interface IAnnouncement {
  title: string;
  description: string;
  section: string;
  date: Date;
}

export interface AnnouncementModel extends Document {
  title: string;
  description: string;
  section: typeof mongoose.Types.ObjectId;
  date: Date;
}

const AnnouncementSchema: Schema = new Schema<AnnouncementModel>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  section: { type: Types.ObjectId, required: true },
  date: { type: Date, required: true },
});

export default mongoose.model<AnnouncementModel>("Group", AnnouncementSchema);
