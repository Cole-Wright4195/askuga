import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import User from "@/models/user";
import connectMongoDB from "@/lib/mongodb";
import Post from "@/models/post";


export async function POST(request: NextRequest) {
 const{name, email, username, password} = await request.json();
 await connectMongoDB();
 await User.create({name, email, username, password});
 return NextResponse.json({message: "item added successfully"}, {status: 201} )

}

export async function GET() {
  await connectMongoDB();
  const Users = await User.find();
  return NextResponse.json({Users});
}


 



