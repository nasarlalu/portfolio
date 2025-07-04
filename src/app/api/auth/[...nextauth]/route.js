import NextAuth from "next-auth";
import { authOptions } from "@/src/lib/authOption"

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
