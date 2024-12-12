/* eslint-disable @typescript-eslint/no-explicit-any */
import TwitterProvider from 'next-auth/providers/twitter';
import FacebookProvider from 'next-auth/providers/facebook';
import { NextAuthOptions } from 'next-auth';
import axios from 'axios';
import { cookies } from 'next/headers';
import GoogleProvider from "next-auth/providers/google";
export const authOptions: NextAuthOptions = {
  providers: [
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID as string,
      clientSecret: process.env.TWITTER_CLIENT_SECRET as string,
      version: '2.0',
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: 'email public_profile',
        },
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  
  callbacks: {
    signIn: async ({ profile, account }: any) => {
      console.log('Social login ==>', profile, account);
      if (!profile || !account) {
        return false;
      }
     if(account.provider === 'google'){
      const name = profile?.name || 'Unknown';
      const [firstName, ...rest] = name.split(' ');
      const secondName = rest.join(' ');
      const userProfile = {
        firstName,
        secondName,
        image: profile?.picture,
        email: profile?.email,

      };
      try {
        const response = await axios.post(
          'https://find-house-server-xi.vercel.app/api/v2/auth/login/google',
          userProfile
        );

        if (response.data.data.accessToken) {
          cookies().set('accessToken', response.data.data.accessToken);
        }
        console.log('Twitter login response:', response.data);
      } catch (error) {
        console.error('Error posting to backend:', error);
      }

    }




      if (account.provider === 'twitter') {
        const name = profile?.data?.name || 'Unknown';
        const [firstName, ...rest] = name.split(' ');
        const secondName = rest.join(' ');

        const userProfile = {
          firstName,
          secondName,
          image: profile?.data?.profile_image_url,
          twitterId: profile?.data?.id,
        };
        try {
          const response = await axios.post(
            'https://find-house-server-xi.vercel.app/api/v2/auth/login/twitter',
            userProfile
          );

          if (response.data.data.accessToken) {
            cookies().set('accessToken', response.data.data.accessToken);
          }
          console.log('Twitter login response:', response.data);
        } catch (error) {
          console.error('Error posting to backend:', error);
        }
      }

      if (account.provider === 'facebook') {
        const name = profile?.name || 'Unknown';
        const [firstName, ...rest] = name.split(' ');
        const secondName = rest.join(' ');

        const userProfile = {
          firstName,
          secondName,
          image: profile?.picture?.data?.url,
          facebookId: profile?.id,
        };
        try {
          const response = await axios.post(
            'https://find-house-server-xi.vercel.app/api/v2/auth/login/facebook',
            userProfile
          );
          console.log('Facebook login response:', response.data);

          if (response.data.data.accessToken) {
            cookies().set('accessToken', response.data.data.accessToken);
          }
        } catch (error) {
          console.error('Error posting to backend:', error);
        }
      }
      return true;
    },
  },
  pages: {
    signIn: '/signup',
  },
  secret: process.env.NEXTAUTH_SECRET!,
  debug: true,
};
