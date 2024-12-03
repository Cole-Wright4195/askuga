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

  export async function PATCH(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const postId = searchParams.get("POST_ID");

        if (!postId || !mongoose.Types.ObjectId.isValid(postId)) {
            return NextResponse.json({ error: "Invalid or missing POST_ID parameter" }, { status: 400 });
        }

        const { title, content } = await request.json();

        await connectMongoDB();

        const updatedPost = await Post.findByIdAndUpdate(
            postId,
            { title, content },
            { new: true }
        );

        if (!updatedPost) {
            return NextResponse.json({ error: "Post not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Post updated successfully", updatedPost }, { status: 200 });
    } catch (error) {
        console.error("Error updating post:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function DELETE(request:NextRequest, {params}: RouteParams) {
  const url = request.nextUrl;
  const POST_ID = url.searchParams.get("POST_ID");

  // Log POST_ID for debugging
  console.log("POST_ID:", POST_ID);

  if(!mongoose.Types.ObjectId.isValid(POST_ID)) {
      return NextResponse.json({message: "invalid ID format"}, {status: 400});
  }
  await connectMongoDB();
  const deleteItem = await Post.findByIdAndDelete(POST_ID);

  if(!deleteItem) {
      return NextResponse.json({message: "Item not found"}, {status: 404});
  }
  return NextResponse.json({message: "item deleted"}, {status: 200});

}

     