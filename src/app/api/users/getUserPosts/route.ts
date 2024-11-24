import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import Post from "@/models/post"
import connectMongoDB from "@/lib/mongodb";
import User from "@/models/user";
import { NextApiRequest,NextApiResponse} from "next";
import mongoose from "mongoose";


export async function GET(request: NextRequest) {
    try {
      // Parse the user ID from the query parameters
      const { searchParams } = new URL(request.url);
      const userId = searchParams.get("USER");
  
      // Validate userId
      if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
        return NextResponse.json({ error: "Invalid or missing USER parameter" }, { status: 400 });
      }
  
      // Connect to the database
      await connectMongoDB();
  
      // Query posts by userId
      const posts = await Post.find({ authorId: userId }).sort({ createdAt: -1 });
  
      // Return the posts
      return NextResponse.json({ posts }, { status: 200 });
    } catch (error) {
      console.error("Error fetching posts:", error);
      return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
    
  }