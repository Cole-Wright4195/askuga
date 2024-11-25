import mongoose, { Document, Schema } from 'mongoose';

interface userInterface extends Document {
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    password: string;
}

/** Make the sections below required. And username and email should be UNIQUE */

const userSchema = new Schema<userInterface>({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
});

const User = mongoose.models.User || mongoose.model<userInterface>("User", userSchema);

export default User;
