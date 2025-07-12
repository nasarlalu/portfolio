"use client"
import React from 'react'
import { useSession } from "next-auth/react";
import Image from 'next/image';
import { useChatModal } from "@/src/context/ChatModalContext"
import { VscAccount } from "react-icons/vsc";
import { ChatLoaderIcon } from "@/public/icon-pack";

export default function UserDetails() {
    const { data: session, status } = useSession();
    const { toggleModal } = useChatModal()

    if (status === "loading") {
        return <div className="absolute top-3 right-3 p-1 w-12 h-12 border rounded-full shadow-sm text-white cursor-pointer">
            <ChatLoaderIcon className='w-full rounded-full' />;
        </div>
    }

    const image = session?.user?.image;


    return (
        <div
            onClick={() => toggleModal()}
            className="relative ml-auto md:absolute top-3 right-3 p-1 w-12 h-12 border rounded-full shadow-sm text-white cursor-pointer">
            {image ?
                <Image
                    width={50}
                    height={50}
                    quality={100}
                    src={image}
                    alt="User Profile"
                    className="w-full rounded-full object-cover"
                /> :
                <VscAccount className="w-full h-full text-gray-400 p-1" fontWeight={300} />
            }
        </div>
    );
}
