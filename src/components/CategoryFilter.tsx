import React from 'react';
import { FilterCategory } from '../types.ts';
import { Heart, ArrowUpDown } from 'lucide-react';

interface CategoryFilterProps {
  selectedCategory: FilterCategory;
  onSelectCategory: (cat: FilterCategory) => void;
  categoryCounts: Record<FilterCategory, number>;
  sortBy: 'default' | 'quickest' | 'calories' | 'name';
  onSortChange: (sort: 'default' | 'quickest' | 'calories' | 'name') => void;
}

const CATEGORIES: { id: FilterCategory; label: string }[] = [
  { id: 'All', label: 'All Recipes' },
  { id: 'Favorites', label: 'Favorites' },
  { id: 'Indian', label: 'Indian' },
  { id: 'Breakfast', label: 'Breakfast' },
  { id: 'Mains', label: 'Mains' },
  { id: 'Pasta', label: 'Pasta' },
  { id: 'Salads & Bowls', label: 'Salads & Bowls' },
  { id: 'Soups', label: 'Soups' },
  { id: 'Dessert', label: 'Dessert' },
  { id: 'Quick Bites', label: 'Quick Bites' },
];

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory,
  onSelectCategory,
  categoryCounts,
  sortBy,
  onSortChange,
}) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-4 border-b border-stone-200/60">
      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 sm:pb-0">
        {CATEGORIES.map(({ id, label }) => {
          const isSelected = selectedCategory === id;
          const count = categoryCounts[id] || 0;

          return (
            <button
              key={id}
              type="button"
              onClick={() => onSelectCategory(id)}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                isSelected
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200/80 hover:text-stone-900'
              }`}
            >
              {id === 'Favorites' && (
                <Heart
                  className={`w-3.5 h-3.5 ${
                    isSelected ? 'fill-white text-white' : 'fill-stone-400 text-stone-400'
                  }`}
                />
              )}
              <span>{label}</span>
              <span
                className={`text-xs px-1.5 py-0.5 rounded-md ${
                  isSelected ? 'bg-amber-700/60 text-white' : 'bg-stone-200/70 text-stone-500'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Sort Select */}
      <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto text-sm text-stone-600">
        <ArrowUpDown className="w-3.5 h-3.5 text-stone-400" />
        <span className="text-xs uppercase tracking-wider font-semibold text-stone-400">Sort:</span>
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value as any)}
          className="bg-transparent text-stone-800 text-sm font-medium border-0 focus:ring-0 cursor-pointer pr-4 hover:text-amber-700 transition-colors"
        >
          <option value="default">Featured</option>
          <option value="quickest">Quickest Total Time</option>
          <option value="calories">Lowest Calories</option>
          <option value="name">Alphabetical</option>
        </select>
      </div>
    </div>
  );
};
