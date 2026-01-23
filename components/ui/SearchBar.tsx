// components/ui/SearchBar.tsx
'use client';

import { useState } from 'react';

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
}

export function SearchBar({ 
  placeholder = '가게 이름 검색', 
  onSearch 
}: SearchBarProps) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(query);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
      <div className="
        flex items-center gap-3 
        bg-gray-100 hover:bg-gray-50
        border border-gray-200 hover:border-gray-300
        rounded-2xl px-4 py-3
        transition-all duration-200
        focus-within:bg-white focus-within:border-blue-400 focus-within:shadow-lg focus-within:shadow-blue-100
      ">
        {/* R 아이콘 (브랜드 심볼) */}
        <div className="
          w-8 h-8 rounded-full 
          bg-gradient-to-br from-blue-500 to-blue-600 
          flex items-center justify-center 
          text-white font-bold text-sm
          flex-shrink-0
          shadow-sm
        ">
          R
        </div>

        {/* 검색 입력 */}
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="
            flex-1 bg-transparent 
            text-gray-900 placeholder:text-gray-400
            outline-none
            text-base
          "
        />

        {/* 돋보기 아이콘 */}
        <button
          type="submit"
          className="
            w-8 h-8 rounded-full
            flex items-center justify-center
            text-gray-400 hover:text-blue-500
            hover:bg-blue-50
            transition-colors duration-200
            flex-shrink-0
          "
          aria-label="검색"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            strokeWidth={2} 
            stroke="currentColor" 
            className="w-5 h-5"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" 
            />
          </svg>
        </button>
      </div>
    </form>
  );
}
