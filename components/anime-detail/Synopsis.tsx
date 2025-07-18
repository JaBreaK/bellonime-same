'use client';

import { useState } from 'react';

export default function Synopsis({ text }: { text: string }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div>
      <p
        className={`text-gray-300 leading-relaxed whitespace-pre-line transition-all duration-300 ${
          isExpanded ? 'line-clamp-none' : 'line-clamp-5'
        }`}
      >
        {text}
      </p>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="text-pink-500 font-semibold mt-2 text-sm hover:underline"
      >
        {isExpanded ? 'Lebih Sedikit' : 'Selengkapnya'}
      </button>
    </div>
  );
}