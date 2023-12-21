import NextAuth, { AuthOptions, Session } from "next-auth";

import GithubProvider from "next-auth/providers/github";
import { Provider } from "next-auth/providers/index";


import { PrismaAdapter } from "@auth/prisma-adapter";
import { Pclient } from "@/lib/prismadb";




export const authOptions :AuthOptions = {
    adapter: PrismaAdapter(Pclient),
    providers:[
        GithubProvider({
          clientId: process.env.NEXT_GITHUB_CLIENT_ID as string,
          clientSecret: process.env.NEXT_GITHUB_CLIENT_SECRET as string,
}
    )
    ] as Provider[],
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60, // 30 days
    }, 
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };