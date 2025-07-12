'use client';
import { useState, useEffect } from 'react';

const SUGGESTIONS = [
    "What's your most recent project?",
    'Which technologies do you specialize in?',
    'Can you describe your work experience?',
    'What education background do you have?',
];

export default function Suggestions({
    onSelect,
    disabled,
}: {
    onSelect: (s: string) => void;
    disabled: boolean;
}) {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        if (disabled) setVisible(false);
    }, [disabled]);

    if (!visible) return null;

    return (
        <div className="py-2 md:p-4 rounded-b-lg">
            <h4 className="text-sm font-semibold text-zinc-950 mb-4 tracking-wide">
                Try asking:
            </h4>
            <div className="flex flex-nowrap overflow-x-auto gap-3 mb-0 md:grid md:grid-cols-2 lg:grid-cols-2 md:gap-6 md:mb-6 items-start">
                {SUGGESTIONS?.map((suggestion, index) => (
                    <div
                        key={index}
                        className="w-[13rem] md:w-full shrink-0 relative group overflow-hidden rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow duration-300"
                    >
                        <button
                            type="button"
                            onClick={() => onSelect(suggestion)}
                            disabled={disabled}
                            className="w-full h-full px-3 py-3 md:py-5 md:px-4 text-sm text-zinc-950 font-medium text-left group-hover:bg-gray-100 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {suggestion}
                        </button>
                    </div>
                ))}
            </div>


        </div>
    );
}
