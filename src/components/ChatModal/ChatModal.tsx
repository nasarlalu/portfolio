"use client";
import React from 'react'
import { useSession } from "next-auth/react";
import { signIn, signOut } from "next-auth/react";
import { VscAccount } from "react-icons/vsc";
import { IoLogOutOutline } from "react-icons/io5";
import { useChatModal } from "@/src/context/ChatModalContext"
import { AiOutlineDelete } from "react-icons/ai";

export default function ChatModal() {

    const { data: session } = useSession();
    const { isOpen } = useChatModal()
    const email = session?.user?.email;

    return (
        <div className={"chatModal__wrapper w-64 bg-white rounded-xl shadow-lg p-3 space-y-4 border border-slate-300" + ' ' + (isOpen ? "block" : "hidden")}>
            <ul className="flex flex-col gap-2">

                {email && <li className="flex items-center gap-3 text-gray-700 p-2 rounded-lg bg-gray-100 transition-colors opacity-70">
                    <VscAccount className="text-xl" />
                    <span className="truncate">{email}</span>
                </li>}

                <li className="flex items-center gap-3 text-gray-700 p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                    <IoLogOutOutline className="text-xl" />
                    {session ? (
                        <button
                            onClick={() => signOut({ callbackUrl: "/chat" })}
                            className="text-sm"
                        >
                            Sign Out
                        </button>
                    ) : (
                        <button
                            onClick={() =>
                                signIn("google", {
                                    callbackUrl: `${window.location.origin}/chat`,
                                })
                            }
                            className="text-sm"
                        >
                            Sign In with Google
                        </button>
                    )}
                </li>

                {session &&
                    <li className="flex items-center gap-3 text-gray-700 p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                        <AiOutlineDelete className="text-xl" />
                        <span className="truncate">Delete account</span>
                    </li>
                }
            </ul>
        </div>
    )
}
