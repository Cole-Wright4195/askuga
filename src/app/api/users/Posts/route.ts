import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import Post from "@/models/post"
import connectMongoDB from "@/lib/mongodb";
import { Route } from "next";
import mongoose from "mongoose";

export async function POST(request: NextRequest) {
    const{title, content, authorId} = await request.json();
    await connectMongoDB();
    await Post.create({title, content, authorId});
    return NextResponse.json({message: "Post added successfully"}, {status: 201} )
   
   }
   
   export async function GET(request: NextRequest) {
    await connectMongoDB();

    // Extract the search query from the request URL
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q"); // Get the "q" parameter

    try {
        const Posts = query
            ? await Post.find({
                  $or: [
                      { title: { $regex: query, $options: "i" } }, // Case-insensitive search
                      { content: { $regex: query, $options: "i" } },
                  ],
              })
            : await Post.find(); // If no query, fetch all posts

        return NextResponse.json({ Posts });
    } catch (error) {
        console.error("Error fetching posts:", error);
        return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 });
    }
}