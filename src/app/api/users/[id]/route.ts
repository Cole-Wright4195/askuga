import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import User from "@/models/user";
import connectMongoDB from "@/lib/mongodb";
import { Route } from "next";
import mongoose from "mongoose";

interface RouteParams {
    params: {id: string};
}


export async function GET(request:NextRequest, {params}:RouteParams) {
    const {id} = await params;
    await connectMongoDB();
    const user = await User.findOne({_id: id});
    return NextResponse.json({user}, {status: 200});

}

export async function PUT(request:NextRequest, {params}:RouteParams) {
    const {id} = params;
    const {firstName: firstName, lastName: lastName, email: email, username: username, password: password} = await request.json();
    await connectMongoDB();
    const user = await User.findByIdAndUpdate(id,{firstName, lastName, email, username, password});
    return NextResponse.json({message: "item updated successfully"}, {status: 200});
}

export async function DELETE(request:NextRequest, {params}: RouteParams) {
    const {id} = params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return NextResponse.json({message: "invalid ID format"}, {status: 400});
    }
    await connectMongoDB();
    const deleteItem = await User.findByIdAndDelete(id);

    if(!deleteItem) {
        return NextResponse.json({message: "Item not found"}, {status: 404});
    }
    return NextResponse.json({message: "item deleted"}, {status: 200});

}

