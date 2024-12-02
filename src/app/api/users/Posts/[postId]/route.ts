import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import Reply from "@/models/reply"
import connectMongoDB from "@/lib/mongodb";
import { Route } from "next";
import mongoose, { ObjectId, Types } from "mongoose";
import Post from "@/models/post";


interface RouteParams {
    params: {postId: string | ObjectId};
}


export async function POST(request: NextRequest) {
    const{content,postId} = await request.json();
    await connectMongoDB();
    await Reply.create({content,postId});
    return NextResponse.json({message: "Reply added successfully"}, {status: 201} )
   
   }


   export async function GET(request: NextRequest, { params }: RouteParams) {
    const { postId } = params; // Extract postId from params
    await connectMongoDB();

    try {
        // Fetch the post by postId
        const post = await Post.findById(postId);
        if (!post) {
            return NextResponse.json({ error: "Post not found" }, { status: 404 });
        }

        // Fetch replies associated with the post
        const replies = await Reply.find({ postId: postId });

        return NextResponse.json({ post, replies });
    } catch (error) {
        console.error("Error fetching post and replies:", error);
        return NextResponse.json({ error: "Failed to fetch post and replies" }, { status: 500 });
    }
}

