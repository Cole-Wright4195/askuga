import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import User from "@/models/user";
import connectMongoDB from "@/lib/mongodb";
import Post from "@/models/post";
import bcrypt from 'bcryptjs';



export async function POST(request: NextRequest) {
  try {
    const{firstName, lastName, email, username, password} = await request.json();
    console.log('Received data:', { firstName, lastName, email, username, password });

    await connectMongoDB();
    
    let user = await User.findOne({ email });
    if (user) {
      return NextResponse.json({ message: "User already registered!"}, {status: 409});
    }
      
    user = await User.findOne({ username });
    if (user) {
      return NextResponse.json({ message: "Username is already taken!"}, {status: 409});
    }

    const hashedPassword = await bcrypt.hash(password, 5);
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      username,
      password: hashedPassword
    });
    await newUser.save();

    return NextResponse.json( {message: "You have registered successfully!"}, {status: 201} );
} catch (err) {
    return NextResponse.json( {message: "Something went wrong!" }, {status: 500} );
}
 
 

}

export async function GET() {
  await connectMongoDB();
  const Users = await User.find();
  return NextResponse.json({Users});
}


 



