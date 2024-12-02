import mongoose, { Schema, Document, Model } from "mongoose";
import { ObjectId } from "mongodb";


export interface IReply extends Document {
    
    content: string;
    postId: string | ObjectId;  // reference to the User who created it
    // any other fields you want for your posts
  }


  const replySchema = new Schema<IReply>(
    {
      content: { type: String, required: true },
      postId: { type: Schema.Types.ObjectId, ref: "Posts", required: false }, // Reference to User
    },
    { timestamps: true }
  );

  const Reply: Model<IReply> = mongoose.models.Reply || mongoose.model<IReply>("Reply", replySchema);

export default Reply;
