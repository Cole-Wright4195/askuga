import { ObjectId } from "mongodb";


export interface Post {
    _id?: string | ObjectId;
    title: string;
    content: string;
    authorId: string;  // reference to the User who created it
    createdAt: Date;
    // any other fields you want for your posts
  }