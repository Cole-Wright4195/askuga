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
   
   export async function GET() {
     await connectMongoDB();
     const Posts = await Post.find();
     return NextResponse.json({Posts});
   }