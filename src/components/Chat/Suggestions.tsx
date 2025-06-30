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
        <div className="bg-indigo-50 border-y border-indigo-100 p-4 rounded-b-lg">
            <h4 className="text-sm font-semibold text-indigo-700 mb-4 tracking-wide">
                Try asking:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 mb-6 items-start">
                {SUGGESTIONS.map((suggestion, index) => (
                    <div
                        key={index}
                        className="relative group overflow-hidden rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow duration-300"
                    >
                        <button
                            type="button"
                            onClick={() => onSelect(suggestion)}
                            disabled={disabled}
                            className="w-full h-full px-4 py-5 text-sm text-indigo-700 font-medium text-left group-hover:bg-indigo-100 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {suggestion}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
