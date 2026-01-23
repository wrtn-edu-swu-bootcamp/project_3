// components/ui/FilterChips.tsx
'use client';

import { useState } from 'react';

export interface FilterChip {
  id: string;
  label: string;
}

interface FilterChipsProps {
  chips: FilterChip[];
  onFilterChange?: (selectedIds: string[]) => void;
}

export function FilterChips({ chips, onFilterChange }: FilterChipsProps) {
  const [selectedChips, setSelectedChips] = useState<string[]>([]);

  const toggleChip = (chipId: string) => {
    const newSelected = selectedChips.includes(chipId)
      ? selectedChips.filter(id => id !== chipId)
      : [...selectedChips, chipId];
    
    setSelectedChips(newSelected);
    onFilterChange?.(newSelected);
  };

  return (
    <div className="w-full overflow-x-auto scrollbar-hide">
      <div className="flex gap-2 pb-2">
        {chips.map((chip) => {
          const isSelected = selectedChips.includes(chip.id);
          
          return (
            <button
              key={chip.id}
              onClick={() => toggleChip(chip.id)}
              role="button"
              aria-pressed={isSelected}
              className={`
                px-4 py-2
                rounded-full text-sm font-medium
                border transition-all duration-200
                whitespace-nowrap flex-shrink-0
                ${isSelected 
                  ? 'bg-blue-500 text-white border-blue-500 shadow-sm' 
                  : 'bg-white text-gray-700 border-gray-200 hover:border-blue-300 hover:text-blue-600'
                }
              `}
            >
              {chip.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
