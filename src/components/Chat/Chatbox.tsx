'use client';
import { useState, useRef, useEffect } from 'react';
import Suggestions from './Suggestions';
import ChatMessage from './ChatMessage';
import { useSession } from "next-auth/react"
import Loading from '@/src/components/authInfo/Loading';
import NotFound from '@/src/components/authInfo/NotFound';

const MAX_INPUT_CHARS = 300;

export default function Chatbox() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [prevConversation, setPrevConversation] = useState({
    id: null,
    messages: []
  });

  const { data: session, status } = useSession();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

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
      console.log("Chat__response:", data?.message?.content);
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
    console.log("Conversation loaded:", response);
    setPrevConversation({
      id: response.data?._id,
      messages: response.data?.messages
    })
    setMessages(response?.data?.messages)
  };
  useEffect(() => {
    if (session) {
      loadHistory();
    }
  }, [session?.user?.id]);

  if (status === "loading") {
    return <Loading />;
  }

  if (!session) {
    return <NotFound />;
  }

  return (
    <div>
      <div className="max-w-3xl mx-auto px-4 py-6 bg-gray-50 shadow-md rounded-xl border border-gray-200">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">My Professional Assistant</h2>
        </div>

        <div className="max-h-[250px] overflow-y-scroll overflow-x-hidden bg-white p-4 rounded-md space-y-4 border border-gray-200">
          {messages.length === 0 ? (
            <div className="text-center py-0 text-gray-600">
              <div className="mb-3">
                <span className="text-4xl">💬</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Ask me anything about my work</h3>
              <p className="max-w-xs mx-auto">Try asking about my projects, skills, or experience.</p>
            </div>
          ) : (
            messages?.map((msg, i) => <ChatMessage key={i} role={msg?.role} content={msg?.content} />)
          )}
          <div ref={messagesEndRef} />
        </div>

      </div>

      <Suggestions onSelect={(s) => setInput(s)} disabled={isLoading} />

      <form onSubmit={handleSubmit} className="mt-4">
        <div className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value.slice(0, MAX_INPUT_CHARS))}
            disabled={isLoading}
            placeholder="Ask about my professional background..."
            className="bg-zinc-700 text-white flex-1 border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-zinc-200 focus:border-transparent disabled:bg-gray-100"
            aria-label="Ask about my professional background"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="bg-zinc-800 hover:bg-gray-700 text-white rounded-lg px-4 py-3 text-sm transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Sending...' : 'Send'}
          </button>
        </div>

        <div className="flex justify-between mt-2 text-xs text-gray-500">
          <span>Max {MAX_INPUT_CHARS} characters</span>
          <span>{input.length}/{MAX_INPUT_CHARS}</span>
        </div>
      </form>
    </div>

  );
}
