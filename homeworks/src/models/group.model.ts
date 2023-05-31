import mongoose, { Schema, Document } from "mongoose";

export enum GroupType {
  "TD" = "TD",
  "TP" = "TP",
}

export interface IGroup {
  name: string;
  type: GroupType;
  idSection: mongoose.Types.ObjectId;
}
export interface GroupeModel extends Document {
  name: string;
  type: GroupType;
  idSection: mongoose.Types.ObjectId;
}

const GroupSchema: Schema = new Schema<GroupeModel>({
  name: { type: String, required: true },
  type: {
    type: String,
    enum: Object.values(GroupType),
    required: true,
  },
  idSection: {
    type: Schema.Types.ObjectId,
    ref: "Section",
    required: true,
  },
});

export default mongoose.model<GroupeModel>("Group", GroupSchema);
