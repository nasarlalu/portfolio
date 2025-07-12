'use client';
import { useState, useRef, useEffect } from 'react';
import Suggestions from './Suggestions';
import ChatMessage from './ChatMessage';
import { useSession } from "next-auth/react"
import Loading from '@/src/components/authInfo/Loading';
import NotFound from '@/src/components/authInfo/NotFound';
import { BsArrowUpCircleFill } from "react-icons/bs";
import { ChatLoaderIcon } from "@/public/icon-pack";
const MAX_INPUT_CHARS = 300;

export default function Chatbox() {

  const { data: session, status } = useSession();

  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [prevConversation, setPrevConversation] = useState({
    id: null,
    messages: []
  });


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    if (input.length > MAX_INPUT_CHARS) {
      setMessages(prev => [
        ...prev,
        { role: 'system', content: `Please keep questions under ${MAX_INPUT_CHARS} characters` },
      ]);
      return;
    }

    setIsLoading(true);
    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        body: JSON.stringify({
          message: userMessage.content,
          conversationId: prevConversation?.id
        })
      })
      const data = await response.json();
      setMessages(prev => [...prev, { role: 'model', content: data?.message?.content }]);

    } catch (error) {
      setMessages(prev => [
        ...prev,
        { role: 'model', content: 'Unable to process your request. Please try again.' },
      ]);

      console.error("Error sending chat data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadHistory = async () => {
    const res = await fetch(`/api/conversations/${session?.user?.id}`);
    const response = await res.json();
    setPrevConversation({
      id: response.data?._id,
      messages: response.data?.messages
    })
    setMessages(response.data?.messages || []);
  };

  useEffect(() => {
    if (session) {
      loadHistory();
    }
  }, [session?.user?.id]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (status === "loading") {
    return <Loading />;
  }

  if (!session) {
    return <NotFound />;
  }

  return (
    <div className='mt-8'>
      <div className="chat__scrollContainer max-h-[76dvh] overflow-y-scroll overflow-x-hidden rounded-xl">
        {messages && messages.length === 0 ? (
          <div className="text-center py-0 text-gray-600">
            <div className="mb-3">
              <span className="text-xl md:text-4xl">💬</span>
            </div>
            <h3 className="text-lg font-semibold mb-2">Ask me anything about my work</h3>
            <p className="max-w-xs mx-auto">Try asking about my projects, skills, or experience.</p>
          </div>
        ) : (
          messages?.map((msg, i) => <ChatMessage key={i} role={msg?.role} content={msg?.content} />)
        )}
        <div ref={messagesEndRef} />
      </div>
      
      {messages.length === 0 && <Suggestions onSelect={(s) => setInput(s)} disabled={isLoading} />}

      <form onSubmit={handleSubmit} className="mt-4">
        <div className="flex gap-2">
          <div className='w-full text-white flex gap-1 border border-zinc-400 rounded-2xl'>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value.slice(0, MAX_INPUT_CHARS))}
              disabled={isLoading}
              placeholder="Ask about my professional background..."
              className="
              w-full text-base ps-4 py-3 bg-transparent text-gray-800 
              focus:outline-none"
              aria-label="Ask about my professional background"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="p-3 py-2 text-white text-sm transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? <ChatLoaderIcon className='w-10' /> : <BsArrowUpCircleFill color='#222' className='w-full h-full' />}
            </button>
          </div>
        </div>

        <div className="flex justify-between mt-2 text-xs text-gray-500">
          <span>Max {MAX_INPUT_CHARS} characters</span>
          <span>{input.length}/{MAX_INPUT_CHARS}</span>
        </div>
      </form>
    </div>

  );
}
