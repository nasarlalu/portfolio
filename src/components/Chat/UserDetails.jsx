"use client"
import { useSession } from "next-auth/react";
import Image from 'next/image';

export default function UserDetails() {
    const { data: session, status } = useSession();

    if (status === "loading") {
        return <p>Loading user details...</p>;
    }

    if (!session?.user) {
        return <p>No user is currently logged in.</p>;
    }

    const { name, email, image } = session.user;

    return (
        <div className="p-4 border rounded shadow-sm max-w-sm bg-zinc-400 text-white h-fit">
            <h6 className="font-semibold text-lg mb-2">User Details</h6>
            <div className="space-y-2">
                {image && (
                    <Image
                        width={100}
                        height={100}
                        src={image}
                        alt="User Profile"
                        className="w-16 h-16 rounded-full object-cover"
                    />
                )}
                <p><strong>Name:</strong> {name || "N/A"}</p>
                <p><strong>Email:</strong> {email || "N/A"}</p>
                {session ?
                    <div>
                        <button onClick={() => signOut({ callbackUrl: "/chat" })}>Sign out</button>
                    </div> :
                    <div>
                        <button onClick={() => signIn("google", { callbackUrl: `${window.location.origin}/chat` })}> Sign In </button>
                    </div>
                }
            </div>
        </div>
    );
}
