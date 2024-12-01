import { authConfig } from "./auth.config";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import User from "./models/user";
import connectMongoDB from "./lib/mongodb";

export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut,
} = NextAuth({
    ...authConfig,
    providers: [
        CredentialsProvider({
            credentials: {
                email: {},
                password: {},
            },
            async authorize(credentials) {
                if (!credentials) return null;

                try {
                    await connectMongoDB();
                    // Look up the user in the databse using provided credentials
                    const user = await User.findOne({ email: credentials.email }).lean();

                    if (user) {
                        //Checking if password matches
                        const isMatch = await bcrypt.compare( credentials.password, user.password );

                        if (isMatch) {
                            // Returns user objetc if successful
                            return {
                                id: user._id.toString(),
                                email: user.email,
                                name: user.username,
                            };
                        } else {
                            console.log("Email or Password is not correct!");
                            return null;
                        }
                    } else {
                        console.log("User not found");
                        return null;
                    }
                } catch (error: any) {
                    console.log("An error occurred: ", error);
                    return null;
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
          if (user) { // User is available during sign-in
            token.id = user.id
          }
          return token
        },
        async session({ session, token }) {
          session.user.id = token.id
          return session
        },
      },
});