import nextauth from 'next-auth';
import Providers from 'next-auth/providers';

import User from '../../../models/user';
import dbConnect from '../../../utils/dbConnect';

export default nextauth({
  session: {
    jwt: true,
  },
  jwt: { signingKey: process.env.JWT_SIGNING_PRIVATE_KEY },
  providers: [
    Providers.Credentials({
      async authorize(credentials) {
        dbConnect();
        const { email, password } = credentials;
        //if email and password is entered
        if (!email && !password) {
          throw new Error('Please Enter email or password');
        }

        //Find User in the database
        var user = await User.findOne({ email }).select('+password');

        if (!user) {
          throw new Error('1,Invalid Email');
        }
        // Check if password is correct
        const isPasswordMatch = await user.comparePassword(password);
        if (!isPasswordMatch) {
          throw new Error('2,Invalid Password');
        }
        delete user.password;

        return Promise.resolve(user);
      },
    }),
  ],
  callbacks: {
    jwt: async (token, user) => {
      user && (token.user = user);
      return Promise.resolve(token);
    },
    session: async (session, user) => {
      session.user = user.user;
      return Promise.resolve(session);
    },
  },
});
