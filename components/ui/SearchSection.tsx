// components/ui/SearchSection.tsx
'use client';

import { SearchBar } from './SearchBar';
import { FilterChips, type FilterChip } from './FilterChips';

const defaultFilterChips: FilterChip[] = [
  { id: 'dalkddok', label: '달떡볶이 공릉점' },
  { id: 'chogalbi', label: '처갓집양념치킨 공릉점' },
  { id: 'chunli', label: '춘리마라탕 묵동점' }
];

interface SearchSectionProps {
  filterChips?: FilterChip[];
  onSearch?: (query: string) => void;
  onFilterChange?: (selectedIds: string[]) => void;
}

export function SearchSection({ 
  filterChips = defaultFilterChips, 
  onSearch, 
  onFilterChange 
}: SearchSectionProps) {
  return (
    <section className="container py-10">
      {/* White Card Wrapper */}
      <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
        {/* Section Header */}
        <div className="mb-4">
          <h2 className="text-xl font-bold text-gray-900">
            가게 검색
          </h2>
        </div>

        {/* Search Bar */}
        <div className="mb-4">
          <SearchBar placeholder="가게 이름을 입력하세요" onSearch={onSearch} />
        </div>

        {/* Filter Chips */}
        <FilterChips chips={filterChips} onFilterChange={onFilterChange} />
      </div>
    </section>
  );
}
