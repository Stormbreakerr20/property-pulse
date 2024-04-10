import GoogleProvider from "next-auth/providers/google";
import connectDB from "@/config/db";
import User from "@/models/User";
import { signIn } from "next-auth/react";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,

      // to choose google account each time on login
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    // invoked on successful sign in
    async signIn({ profile }) {
      //1. connect to DB
      await connectDB();

      //2. check if user exists in DB
      const userExists = await User.findOne({ email: profile.email });

      //3. if not, create user
      if (!userExists) {
        await User.create({
          // Truncate user name if too long
          username:
            profile.name.length > 20
              ? profile.name.substring(0, 20)
              : profile.name,
          email: profile.email,
          image: profile.image,
        });
      }

      return true;
    },

    // modifies the session object before it is returned
    async session({ session }) {
      //1. Get user from DB
      const user = await User.findOne({ email: session.user.email });

      //2. Assign user id to session
      session.user.id = user._id.toString();

      return session;
    },
  },
};
