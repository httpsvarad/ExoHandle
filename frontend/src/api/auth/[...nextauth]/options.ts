import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { Account, AuthOptions } from 'next-auth';
import User from '../../../../models/user';

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async signIn({ user, account }) {
      const existingUser = await User.findOne({ email: user.email });

      if (!existingUser) {
        const newUser = await User.create({
          name: user.name,
          email: user.email,
          provider: account?.provider,
          isVerified: account?.provider === 'google', // Set isVerified to true for Google
          role: 'student',
          createdAt: new Date(),
          updatedAt: new Date(),
        });

        // Store the dbid in the token
        user.dbid = newUser._id.toString();
        user.joinedclass = newUser.joinedclassrooms;
      } else {
        // Store the dbid for existing users
        user.dbid = existingUser._id.toString();
        user.joinedclass = existingUser.joinedclassrooms;
      }

      return true;
    },

    async session({ session, token }) {
      // Attach dbid to session
      session.user.id = token.sub;
      session.user.joinedclass = token.joinedclass;
      session.user.dbid = token.dbid; // Ensure dbid is passed from the token to the session
      console.log(session);
      return session;
    },

    async jwt({ token, user }) {
      if (user) {
        token.dbid = user.dbid;
        token.joinedclass = user.joinedclass // Attach dbid to JWT token
      }
      return token;
    }
  },
};
