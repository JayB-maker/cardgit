import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      accessToken?: string; // Add custom field
    } & DefaultSession["user"];
  }

  interface User {
    accessToken?: string; // Add custom field
  }
}
