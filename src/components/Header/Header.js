import React from 'react'
import Link from 'next/link'
import { BsFillChatRightTextFill } from "react-icons/bs";
import { PiChatsCircleFill } from 'react-icons/pi'; // Better chat icon from Phosphor Icons
import { IoChatbubblesSharp } from "react-icons/io5";
export default function Header() {
    return (
        <header className='text-center py-1'>
            {/* <Link href={"/chat"} className='text-zinc-900 text-xs'>Curious to know more? Say hi to my personal AI!</Link> */}
            <nav className='floating__navbar'>
                <Link href='/chat' className='floating__menu--chat'>
                    <IoChatbubblesSharp />
                </Link>
            </nav>
        </header>

    )
}
