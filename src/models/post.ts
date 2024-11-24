import mongoose, { Schema, Document, Model } from "mongoose";
import { ObjectId } from "mongodb";


export interface IPost extends Document {
    title: string;
    content: string;
    authorId: string | ObjectId;  // reference to the User who created it
    createdAt: Date | string;
    // any other fields you want for your posts
  }


  const postSchema = new Schema<IPost>(
    {
      title: { type: String, required: true },
      content: { type: String, required: true },
      authorId: { type: Schema.Types.ObjectId, ref: "User", required: false }, // Reference to User
    },
    { timestamps: true }
  );

  const Post: Model<IPost> = mongoose.models.Post || mongoose.model<IPost>("Post", postSchema);

export default Post;
