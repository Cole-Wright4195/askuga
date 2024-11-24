import mongoose, { Document, Model, Schema } from 'mongoose';

interface userInterface extends Document {
    title: string;
    email?: string;
    username?: string;
    password: string;
}

const userSchema = new Schema<userInterface>({
    title: {
        type: String,
        required: true,
    },
    email: {
        type: String,
    },
    username: {
        type: String,
    },
    password: {
        type: String,
        required: true,
    },
});

const User: Model<userInterface> = mongoose.models.User || mongoose.model<userInterface>("User", userSchema);
export default User;
