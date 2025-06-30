"use client";
import { useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react"

export function UserAuth() {
    const { data: session } = useSession()
    if (session) {
        return (
            <div className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-3 text-sm transition disabled:opacity-50 disabled:cursor-not-allowed">
                Signed in as {session.user.email} <br />
                <button onClick={() => signOut()}>Sign out</button>
            </div>
        )
    }
    return (
        <div className="bg-slate-400 p-5">
            Not signed in <br />
            <button className="mt-5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-3 text-sm transition disabled:opacity-50 disabled:cursor-not-allowed" onClick={() => signIn()}>Sign in</button>
        </div>
    )
}

export default function LoginForm() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleLogin(e) {
        e.preventDefault();

        const res = await signIn("credentials", {
            email,
            password,
            redirect: true,
            // callbackUrl: "/chat", // where to go after login
        });
        console.log(res, "handleLogin");
        // You can also handle errors manually here
    }

    return (
        <div className="bg-grey h-[1000px] container">
            <UserAuth />
        </div>

    );
}
