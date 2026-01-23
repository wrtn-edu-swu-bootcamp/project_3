// components/ui/TossSearchBar.tsx
'use client';

import { useState } from 'react';

export function TossSearchBar() {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    if (query.trim()) {
      alert(`데모입니다. 검색어: "${query}"`);
    } else {
      alert('가게 이름을 입력해주세요');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="flex gap-2">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="가게 이름을 입력하세요"
        className="flex-1 px-4 py-3 bg-gray-100 border-0 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
      />
      <button
        onClick={handleSearch}
        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors flex items-center gap-2"
        aria-label="검색"
      >
        <span>🔎</span>
        <span>찾기</span>
      </button>
    </div>
  );
}
