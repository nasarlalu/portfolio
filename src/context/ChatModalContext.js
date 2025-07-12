"use client";
import { createContext, useContext, useState } from "react";

const ChatModalContext = createContext();

export function ChatModalProvider({ children }) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleModal = () => setIsOpen(prev => !prev);
    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    return (
        <ChatModalContext.Provider value={{ isOpen, toggleModal, openModal, closeModal }}>
            {children}
        </ChatModalContext.Provider>
    );
}

export const useChatModal = () => useContext(ChatModalContext);
