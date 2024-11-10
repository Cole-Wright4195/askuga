import mongoose, { Document, Model, Schema } from 'mongoose';

interface userInterface extends Document {
    name: string;
    email?: string;
    username?: string;
    password: string;
}

const userSchema = new Schema<userInterface>({
    name: {
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
