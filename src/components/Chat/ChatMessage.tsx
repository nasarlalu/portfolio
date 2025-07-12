'use client';
import { useMemo } from 'react';
import ReactMarkdown from 'react-markdown';

export default function ChatMessage({
    role,
    content,
}: {
    role: string;
    content: string;
}) {
    const isUser = role === 'user';

    const avatar = useMemo(() => {
        return isUser ? (
            <div className="bg-zinc-900 rounded-full w-8 h-8 flex items-center justify-center text-white text-sm font-medium" aria-label="User" >
                U
            </div>
        ) : (
            <div className="bg-zinc-900 rounded-full w-8 h-8 flex items-center justify-center text-white text-sm font-medium" aria-label="Model" >
                AI
            </div>
        );
    }, [isUser]);

    return (
        <div className={`flex items-start gap-3 mb-4 ${isUser ? 'flex-row-reverse' : 'overflow-x-hidden'}`}>
            {/* {avatar} */}
            <div className={`text-left max-w-[80%] px-4 py-3 rounded-2xl text-sm whitespace-pre-wrap break-words ${isUser ? 'bg-neutral-300 text-black' : 'bg-zinc-100 text-white'}`} >
                <div className='markupText__wrapper'>
                    <ReactMarkdown>{content}</ReactMarkdown>
                </div>
            </div>
        </div>
    );
}
