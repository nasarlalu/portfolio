import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/src/lib/database";

export const authOptions = {
    adapter: MongoDBAdapter(clientPromise),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            allowDangerousEmailAccountLinking: true,
            profile(profile) {
                return {
                    id: profile.sub,
                    name: profile.name,
                    email: profile.email,
                    image: profile.picture,
                }
            }
        }),
    ],
    callbacks: {
        async signIn({ user, account, profile }) {
            if (!account || !user.email) return false

            try {
                const client = await clientPromise
                const usersCollection = client.db().collection("users")

                await usersCollection.updateOne(
                    { email: user.email },
                    {
                        $set: {
                            userName: profile?.name || user.name,
                            image: profile?.picture || user.image,
                        },
                        $setOnInsert: {
                            role: "user",
                            createdAt: new Date(),
                        },
                    },
                    { upsert: true }
                )
                return true
            } catch (error) {
                console.error("Error in signIn callback:", error)
                return false
            }
        },
        async session({ session, user }) {
            if (session?.user && user?.id) {
                session.user.id = user.id;
                try {
                    const client = await clientPromise
                    const usersCollection = client.db().collection("users")
                    const dbUser = await usersCollection.findOne({ email: session.user.email })

                    if (dbUser) {
                        session.user.mongoId = dbUser._id.toString()
                        session.user.createdAt = dbUser.createdAt
                    }
                } catch (error) {
                    console.error("Error fetching user data in session callback:", error)
                }
            }
            return session;
        },
        secret: process.env.NEXTAUTH_SECRET,
    }
}