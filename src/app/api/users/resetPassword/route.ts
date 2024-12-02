import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import User from "@/models/user";
import connectMongoDB from "@/lib/mongodb";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";


export async function POST(request: NextRequest) {
    try {
        const { email } = await request.json();
        //console.log('Recieved email: ', { email });
        await connectMongoDB();

        let user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ message: "User does not exist!" }, { status: 404});
        }

        //Making a JWT Token for the password reset link with token
        const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET as string, { expiresIn: "1hr" });
        

        const resetLink = `http://localhost:3000/api/users/resetPassword?token=${token}`;

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.USER_EMAIL,
                pass: process.env.USER_PASS,
            },
        });

        const mailOptions = {
            from: process.env.USER_EMAIL,
            to: user.email,
            subject: "Password Reset Request",
            text: `Hello,\n\nYou requested a password reset. Please click the link below to reset your password:\n\n${resetLink}\n\nIf you did not request a password reset, please ignore this email.`,
        };

        await transporter.sendMail(mailOptions);

        return NextResponse.json({ message: "A password reset link has been sent to your email"}, { status: 201});

    } catch (err) {
        console.error("Error in resetPassword API: ", err);
        return NextResponse.json({ message: "Something went wrong!" }, { status: 500});
    }
}

export async function GET(request: NextRequest) {
    try {
        const token = request.nextUrl.searchParams.get('token');

        // Verify the JWT token
        if (!token) {
            return NextResponse.json({ message: "Token is missing" }, { status: 400 });
        }

        const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);
        console.log(decoded);

        if (!decoded) {
            return NextResponse.json({ message: "Invalid or expired token" }, { status: 401 });
        }

        // You can also fetch the user data here if needed
        const user = await User.findOne({ email: decoded.email });
        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        
        //return NextResponse.json({ message: "Token is valid. You can now reset the password." }, { status: 200 });

        const resetPasswordUrl = new URL('/resetPassword', request.url);
        resetPasswordUrl.searchParams.set('token', token);
        return NextResponse.redirect(resetPasswordUrl);

    } catch (err) {
        console.error("Error in resetPassword API: ", err);
        return NextResponse.json({ message: "Invalid or expired token" }, { status: 401 });
    }
}

export async function PUT(request: NextRequest) {
    try {
        const {token, password} = await request.json();
        //console.log("Recieved the following: ");
        //console.log(token);
        //console.log(password);
        await connectMongoDB();

        const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);
        console.log(decoded);

        let user = await User.findOne({ email: decoded.email });

        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }
        console.log(user);

        const hashedPassword = await bcrypt.hash(password, 5);

        user.password = hashedPassword;

        await user.save();

        console.log(user);

        return NextResponse.json({ message: "Password has been successfully updated" }, { status: 201 });
        
    } catch (err) {
        console.error("Error in resetPassword API: ", err);
        return NextResponse.json({ message: "Encountered an unexpected error" }, { status:500 });
    }
}