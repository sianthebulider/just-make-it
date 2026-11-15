import React from 'react';
import { Search, ShoppingBag, Plus, Sparkles, UtensilsCrossed, X } from 'lucide-react';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  shoppingListCount: number;
  onOpenShoppingList: () => void;
  onOpenAddRecipe: () => void;
  selectedTag: string | null;
  onSelectTag: (tag: string | null) => void;
  availableTags: string[];
}

export const Header: React.FC<HeaderProps> = ({
  searchQuery,
  onSearchChange,
  shoppingListCount,
  onOpenShoppingList,
  onOpenAddRecipe,
  selectedTag,
  onSelectTag,
  availableTags,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-[#fcfbf9]/90 backdrop-blur-md border-b border-stone-200/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* Logo / Brand */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-11 h-11 rounded-2xl bg-amber-600/10 text-amber-700 flex items-center justify-center border border-amber-500/20 shadow-xs">
              <UtensilsCrossed className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-stone-900 font-serif flex items-center gap-2">
                Recipe App
              </h1>
              <p className="text-xs text-stone-500 hidden sm:block">
                Delicious recipes, scalable servings & grocery planner
              </p>
            </div>
          </div>

          {/* Search bar */}
          <div className="flex-1 max-w-md mx-2">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
              <input
                id="search-recipes-input"
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search recipes, ingredients, or tags..."
                className="w-full pl-10 pr-9 py-2.5 bg-stone-100/80 hover:bg-stone-100 focus:bg-white text-stone-900 placeholder:text-stone-400 text-sm rounded-xl border border-stone-200/90 focus:border-amber-500 focus:outline-hidden focus:ring-2 focus:ring-amber-500/20 transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => onSearchChange('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2.5 shrink-0">
            <button
              id="open-shopping-list-btn"
              type="button"
              onClick={onOpenShoppingList}
              className="relative flex items-center gap-2 px-3.5 py-2.5 rounded-xl border border-stone-200 bg-white text-stone-700 hover:bg-stone-50 hover:border-stone-300 font-medium text-sm transition-all shadow-xs"
              title="View grocery & shopping list"
            >
              <ShoppingBag className="w-4 h-4 text-amber-700" />
              <span className="hidden md:inline">Groceries</span>
              {shoppingListCount > 0 && (
                <span className="flex items-center justify-center min-w-[20px] h-5 px-1.5 text-xs font-bold text-white bg-amber-600 rounded-full">
                  {shoppingListCount}
                </span>
              )}
            </button>

            <button
              id="add-new-recipe-btn"
              type="button"
              onClick={onOpenAddRecipe}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-medium text-sm transition-all shadow-xs"
            >
              <Plus className="w-4 h-4 text-amber-400" />
              <span className="hidden sm:inline">Add Recipe</span>
            </button>
          </div>
        </div>

        {/* Tag Filters (Dietary & Quick filters) */}
        {availableTags.length > 0 && (
          <div className="flex items-center gap-1.5 pb-3 overflow-x-auto no-scrollbar pt-1 text-xs">
            <span className="text-stone-400 shrink-0 font-medium pr-1 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-500" /> Filter:
            </span>
            {selectedTag && (
              <button
                type="button"
                onClick={() => onSelectTag(null)}
                className="shrink-0 flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 font-medium hover:bg-amber-200 transition-colors"
              >
                Clear filter ({selectedTag})
                <X className="w-3 h-3" />
              </button>
            )}
            {availableTags.map((tag) => {
              const isSelected = selectedTag === tag;
              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => onSelectTag(isSelected ? null : tag)}
                  className={`shrink-0 px-3 py-1 rounded-full transition-all ${
                    isSelected
                      ? 'bg-stone-900 text-white font-medium shadow-xs'
                      : 'bg-stone-100 text-stone-600 hover:bg-stone-200/70 hover:text-stone-900'
                  }`}
                >
                  {tag}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </header>
  );
};
