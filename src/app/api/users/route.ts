import { NextResponse } from "next/server";
import { MongoClient } from 'mongodb';
import { User } from "@/types/user";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";





export async function GET() {
  try {
    const mongoClient = new MongoClient(process.env.MONGODB_URI!);
    const users = await mongoClient.db().collection<User>('Users').find({}).toArray();
    console.log(users);
    return NextResponse.json(users);
  } catch (error: Error | unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('MongoDB Error:', error);
    return NextResponse.json({ error: `Failed to fetch users: ${errorMessage}` }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const mongoClient = new MongoClient(process.env.MONGODB_URI!);
    const result = await mongoClient.db().collection<User>('Users').insertOne(body);
    
    return NextResponse.json(result);
  } catch (error: Error | unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('MongoDB Error:', error);
    return NextResponse.json({ error: `Failed to create user: ${errorMessage}` }, { status: 500 });
  }
} 