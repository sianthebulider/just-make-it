import React, { useState, useEffect, useMemo } from 'react';
import { Recipe, ShoppingItem, FilterCategory, Ingredient } from './types.ts';
import { initialRecipes } from './data/initialRecipes.ts';
import { Header } from './components/Header.tsx';
import { CategoryFilter } from './components/CategoryFilter.tsx';
import { RecipeCard } from './components/RecipeCard.tsx';
import { RecipeDetailModal } from './components/RecipeDetailModal.tsx';
import { ShoppingListDrawer } from './components/ShoppingListDrawer.tsx';
import { CreateRecipeModal } from './components/CreateRecipeModal.tsx';
import { ActiveTimer } from './components/ActiveTimer.tsx';
import { guessCategory } from './utils/formatters.ts';
import { ChefHat, Sparkles, Plus, BookOpen, RotateCcw } from 'lucide-react';

const STORAGE_KEY_RECIPES = 'culinary_recipes_v1';
const STORAGE_KEY_GROCERY = 'culinary_grocery_v1';
const STORAGE_KEY_INDIAN_SEEDED = 'culinary_seeded_indian_v1';

const isIndianRecipe = (recipe: Recipe) =>
  recipe.cuisine?.toLowerCase() === 'indian' ||
  recipe.tags.some((t) => t.toLowerCase() === 'indian');

export default function App() {
  // 1. Recipes state
  const [recipes, setRecipes] = useState<Recipe[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_RECIPES);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const alreadySeeded = localStorage.getItem(STORAGE_KEY_INDIAN_SEEDED);
          if (!alreadySeeded) {
            const existingIds = new Set(parsed.map((r: Recipe) => r.id));
            const indianStarters = initialRecipes.filter(
              (r) => isIndianRecipe(r) && !existingIds.has(r.id)
            );
            localStorage.setItem(STORAGE_KEY_INDIAN_SEEDED, 'true');
            if (indianStarters.length > 0) {
              return [...indianStarters, ...parsed];
            }
          }
          return parsed;
        }
      }
      localStorage.setItem(STORAGE_KEY_INDIAN_SEEDED, 'true');
    } catch {
      // Fallback
    }
    return initialRecipes;
  });

  // 2. Shopping list state
  const [shoppingList, setShoppingList] = useState<ShoppingItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_GROCERY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {
      // Fallback
    }
    return [
      { id: 'gro-1', name: 'Fresh garlic bulb', amount: 1, unit: 'head', checked: false, category: 'Produce' },
      { id: 'gro-2', name: 'Extra virgin olive oil', amount: 1, unit: 'bottle', checked: false, category: 'Pantry' },
      { id: 'gro-3', name: 'Parmigiano Reggiano', amount: 200, unit: 'g', checked: true, category: 'Dairy & Eggs' },
    ];
  });

  // UI state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<FilterCategory>('All');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'default' | 'quickest' | 'calories' | 'name'>('default');

  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [isShoppingListOpen, setIsShoppingListOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingRecipe, setEditingRecipe] = useState<Recipe | null>(null);

  // Active kitchen timer state
  const [activeTimer, setActiveTimer] = useState<{
    id: number;
    minutes: number;
    label: string;
  } | null>(null);

  // Save recipes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_RECIPES, JSON.stringify(recipes));
    } catch {
      // Storage error ignored
    }
  }, [recipes]);

  // Save groceries to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_GROCERY, JSON.stringify(shoppingList));
    } catch {
      // Storage error ignored
    }
  }, [shoppingList]);

  // Available tags collection
  const availableTags = useMemo(() => {
    const counts = new Map<string, number>();
    recipes.forEach((r) =>
      r.tags.forEach((t) => counts.set(t, (counts.get(t) || 0) + 1))
    );
    return Array.from(counts.entries())
      .sort((a, b) => {
        if (a[0] === 'Indian') return -1;
        if (b[0] === 'Indian') return 1;
        return b[1] - a[1];
      })
      .map(([tag]) => tag)
      .slice(0, 12);
  }, [recipes]);

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<FilterCategory, number> = {
      All: recipes.length,
      Favorites: recipes.filter((r) => r.isFavorite).length,
      Indian: recipes.filter(isIndianRecipe).length,
      Breakfast: recipes.filter((r) => r.category === 'Breakfast').length,
      Mains: recipes.filter((r) => r.category === 'Mains').length,
      Pasta: recipes.filter((r) => r.category === 'Pasta').length,
      'Salads & Bowls': recipes.filter((r) => r.category === 'Salads & Bowls').length,
      Soups: recipes.filter((r) => r.category === 'Soups').length,
      Dessert: recipes.filter((r) => r.category === 'Dessert').length,
      'Quick Bites': recipes.filter((r) => r.category === 'Quick Bites').length,
    };
    return counts;
  }, [recipes]);

  // Filter & Sort recipes
  const filteredRecipes = useMemo(() => {
    let result = [...recipes];

    // Category filter
    if (selectedCategory === 'Favorites') {
      result = result.filter((r) => r.isFavorite);
    } else if (selectedCategory === 'Indian') {
      result = result.filter(isIndianRecipe);
    } else if (selectedCategory !== 'All') {
      result = result.filter((r) => r.category === selectedCategory);
    }

    // Dietary / Tag filter
    if (selectedTag) {
      result = result.filter((r) => r.tags.includes(selectedTag));
    }

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter((r) => {
        const titleMatch = r.title.toLowerCase().includes(q);
        const descMatch = r.description.toLowerCase().includes(q);
        const tagMatch = r.tags.some((t) => t.toLowerCase().includes(q));
        const ingredientMatch = r.ingredients.some((i) =>
          i.name.toLowerCase().includes(q)
        );
        return titleMatch || descMatch || tagMatch || ingredientMatch;
      });
    }

    // Sorting
    if (sortBy === 'quickest') {
      result.sort(
        (a, b) => a.prepTime + a.cookTime - (b.prepTime + b.cookTime)
      );
    } else if (sortBy === 'calories') {
      result.sort((a, b) => (a.calories || 9999) - (b.calories || 9999));
    } else if (sortBy === 'name') {
      result.sort((a, b) => a.title.localeCompare(b.title));
    }

    return result;
  }, [recipes, selectedCategory, selectedTag, searchQuery, sortBy]);

  // Handlers
  const handleToggleFavorite = (recipeId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setRecipes((prev) =>
      prev.map((r) =>
        r.id === recipeId ? { ...r, isFavorite: !r.isFavorite } : r
      )
    );
    if (selectedRecipe && selectedRecipe.id === recipeId) {
      setSelectedRecipe((prev) =>
        prev ? { ...prev, isFavorite: !prev.isFavorite } : null
      );
    }
  };

  const handleSaveRecipe = (recipeData: Recipe) => {
    setRecipes((prev) => {
      const exists = prev.some((r) => r.id === recipeData.id);
      if (exists) {
        return prev.map((r) => (r.id === recipeData.id ? recipeData : r));
      }
      return [recipeData, ...prev];
    });
    setEditingRecipe(null);
    setSelectedRecipe(recipeData);
  };

  const handleDeleteRecipe = (recipeId: string) => {
    setRecipes((prev) => prev.filter((r) => r.id !== recipeId));
    if (selectedRecipe?.id === recipeId) {
      setSelectedRecipe(null);
    }
  };

  const handleEditRecipe = (recipeToEdit: Recipe) => {
    setEditingRecipe(recipeToEdit);
    setSelectedRecipe(null);
    setIsCreateModalOpen(true);
  };

  const handleAddIngredientsToShoppingList = (
    ingredientsToAdd: Ingredient[],
    recipeTitle: string
  ) => {
    const newItems: ShoppingItem[] = ingredientsToAdd.map((ing) => ({
      id: `shop-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      name: ing.name,
      amount: ing.amount,
      unit: ing.unit,
      checked: false,
      category: guessCategory(ing.name),
      recipeTitle,
    }));

    setShoppingList((prev) => [...newItems, ...prev]);
  };

  const handleToggleShoppingItem = (id: string) => {
    setShoppingList((prev) =>
      prev.map((it) => (it.id === id ? { ...it, checked: !it.checked } : it))
    );
  };

  const handleRemoveShoppingItem = (id: string) => {
    setShoppingList((prev) => prev.filter((it) => it.id !== id));
  };

  const handleAddManualShoppingItem = (
    item: Omit<ShoppingItem, 'id' | 'checked'>
  ) => {
    setShoppingList((prev) => [
      {
        ...item,
        id: `shop-${Date.now()}`,
        checked: false,
      },
      ...prev,
    ]);
  };

  const handleClearCompletedShopping = () => {
    setShoppingList((prev) => prev.filter((it) => !it.checked));
  };

  const handleClearAllShopping = () => {
    if (confirm('Clear your entire grocery list?')) {
      setShoppingList([]);
    }
  };

  const handleResetToDefaults = () => {
    if (confirm('Reset to standard starter recipes collection?')) {
      setRecipes(initialRecipes);
      localStorage.removeItem(STORAGE_KEY_RECIPES);
    }
  };

  return (
    <div className="min-h-screen bg-[#fcfbf9] text-stone-800 flex flex-col font-sans">
      {/* Header */}
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        shoppingListCount={shoppingList.filter((it) => !it.checked).length}
        onOpenShoppingList={() => setIsShoppingListOpen(true)}
        onOpenAddRecipe={() => {
          setEditingRecipe(null);
          setIsCreateModalOpen(true);
        }}
        selectedTag={selectedTag}
        onSelectTag={setSelectedTag}
        availableTags={availableTags}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Category & Sorting Controls */}
        <CategoryFilter
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          categoryCounts={categoryCounts}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />

        {/* Recipe Grid Header Info */}
        <div className="flex items-center justify-between mt-6 mb-5">
          <div className="flex items-baseline gap-2">
            <h2 className="text-xl font-bold font-serif text-stone-900">
              {selectedCategory === 'All'
                ? 'All Recipes'
                : selectedCategory === 'Indian'
                ? 'Indian Cuisine'
                : selectedCategory}
            </h2>
            <span className="text-xs font-semibold text-stone-500">
              ({filteredRecipes.length} {filteredRecipes.length === 1 ? 'dish' : 'dishes'})
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleResetToDefaults}
              className="text-xs text-stone-400 hover:text-stone-700 flex items-center gap-1 transition-colors"
              title="Reset starter recipes"
            >
              <RotateCcw className="w-3 h-3" />
              <span className="hidden sm:inline">Reset Defaults</span>
            </button>
          </div>
        </div>

        {/* Recipe Cards Grid */}
        {filteredRecipes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredRecipes.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                onSelectRecipe={setSelectedRecipe}
                onToggleFavorite={handleToggleFavorite}
              />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-20 px-4 bg-stone-50/60 rounded-3xl border border-dashed border-stone-200 mt-4">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center">
              <ChefHat className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold font-serif text-stone-900 mb-1">
              No matching recipes found
            </h3>
            <p className="text-sm text-stone-500 max-w-sm mx-auto mb-6">
              Try adjusting your search terms, clearing dietary tags, or adding your own original recipe.
            </p>
            <div className="flex items-center justify-center gap-3">
              {(searchQuery || selectedTag || selectedCategory !== 'All') && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedTag(null);
                    setSelectedCategory('All');
                  }}
                  className="px-4 py-2 rounded-xl border border-stone-300 bg-white text-stone-700 text-sm font-medium hover:bg-stone-50"
                >
                  Clear Filters
                </button>
              )}
              <button
                type="button"
                onClick={() => {
                  setEditingRecipe(null);
                  setIsCreateModalOpen(true);
                }}
                className="px-4 py-2 rounded-xl bg-amber-600 text-white text-sm font-semibold hover:bg-amber-700 flex items-center gap-1.5 shadow-2xs"
              >
                <Plus className="w-4 h-4" />
                <span>Create Recipe</span>
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-stone-200/80 mt-12 py-8 bg-white/50 text-xs text-stone-500 text-center">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="flex items-center gap-1.5 justify-center">
            <BookOpen className="w-3.5 h-3.5 text-amber-600" />
            <span>Recipe App • Cook with precision, portion scaling & organized shopping.</span>
          </p>
          <div className="flex items-center gap-4 text-stone-400">
            <span>{recipes.length} recipes in your collection</span>
            <span>•</span>
            <span>{shoppingList.length} items in grocery list</span>
          </div>
        </div>
      </footer>

      {/* Modals & Drawers */}
      {selectedRecipe && (
        <RecipeDetailModal
          recipe={selectedRecipe}
          onClose={() => setSelectedRecipe(null)}
          onToggleFavorite={(id) => handleToggleFavorite(id)}
          onAddIngredientsToShoppingList={handleAddIngredientsToShoppingList}
          onStartTimer={(minutes, label) =>
            setActiveTimer({ id: Date.now(), minutes, label })
          }
          onDeleteRecipe={handleDeleteRecipe}
          onEditRecipe={handleEditRecipe}
        />
      )}

      <ShoppingListDrawer
        isOpen={isShoppingListOpen}
        onClose={() => setIsShoppingListOpen(false)}
        items={shoppingList}
        onToggleItem={handleToggleShoppingItem}
        onRemoveItem={handleRemoveShoppingItem}
        onAddItem={handleAddManualShoppingItem}
        onClearCompleted={handleClearCompletedShopping}
        onClearAll={handleClearAllShopping}
      />

      <CreateRecipeModal
        isOpen={isCreateModalOpen}
        onClose={() => {
          setIsCreateModalOpen(false);
          setEditingRecipe(null);
        }}
        onSaveRecipe={handleSaveRecipe}
        initialRecipe={editingRecipe}
      />

      {/* Active Floating Cooking Timer */}
      {activeTimer && (
        <ActiveTimer
          key={activeTimer.id}
          initialMinutes={activeTimer.minutes}
          label={activeTimer.label}
          onClose={() => setActiveTimer(null)}
        />
      )}
    </div>
  );
}
