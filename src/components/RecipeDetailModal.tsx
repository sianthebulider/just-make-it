import React, { useState } from 'react';
import { Recipe, Ingredient } from '../types.ts';
import { formatAmount } from '../utils/formatters.ts';
import {
  X,
  Clock,
  Users,
  Flame,
  Heart,
  Plus,
  Minus,
  CheckCircle2,
  Circle,
  Play,
  ShoppingCart,
  Printer,
  Sparkles,
  ChefHat,
  Trash2,
  Edit3
} from 'lucide-react';

interface RecipeDetailModalProps {
  recipe: Recipe | null;
  onClose: () => void;
  onToggleFavorite: (recipeId: string) => void;
  onAddIngredientsToShoppingList: (ingredients: Ingredient[], recipeTitle: string) => void;
  onStartTimer: (minutes: number, label: string) => void;
  onDeleteRecipe?: (recipeId: string) => void;
  onEditRecipe?: (recipe: Recipe) => void;
}

export const RecipeDetailModal: React.FC<RecipeDetailModalProps> = ({
  recipe,
  onClose,
  onToggleFavorite,
  onAddIngredientsToShoppingList,
  onStartTimer,
  onDeleteRecipe,
  onEditRecipe,
}) => {
  if (!recipe) return null;

  const [currentServings, setCurrentServings] = useState<number>(recipe.servings);
  const [checkedIngredients, setCheckedIngredients] = useState<Record<string, boolean>>({});
  const [completedSteps, setCompletedSteps] = useState<Record<number, boolean>>({});
  const [activeTab, setActiveTab] = useState<'ingredients' | 'steps'>('ingredients');
  const [addedToCartToast, setAddedToCartToast] = useState(false);

  // Calculate serving multiplier
  const scale = currentServings / recipe.servings;

  const toggleIngredientCheck = (id: string) => {
    setCheckedIngredients((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const toggleStepComplete = (stepNum: number) => {
    setCompletedSteps((prev) => ({
      ...prev,
      [stepNum]: !prev[stepNum],
    }));
  };

  const handleServingChange = (delta: number) => {
    setCurrentServings((prev) => Math.max(1, Math.min(24, prev + delta)));
  };

  const handleAddAllToShoppingList = () => {
    // Scale ingredients based on currently selected servings
    const scaledIngredients: Ingredient[] = recipe.ingredients.map((ing) => ({
      ...ing,
      amount: ing.amount !== null ? ing.amount * scale : null,
    }));
    onAddIngredientsToShoppingList(scaledIngredients, recipe.title);
    setAddedToCartToast(true);
    setTimeout(() => setAddedToCartToast(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  const checkedIngCount = Object.values(checkedIngredients).filter(Boolean).length;
  const completedStepCount = Object.values(completedSteps).filter(Boolean).length;

  return (
    <div
      id="recipe-detail-modal-backdrop"
      className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 md:p-6 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        id="recipe-detail-card"
        className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-stone-200/90 overflow-hidden my-auto max-h-[92vh] flex flex-col animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Header Bar with Actions */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-100 bg-white/90 backdrop-blur-md z-10">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200/60">
              {recipe.category}
            </span>
            <span className="text-xs text-stone-400 font-medium">• {recipe.difficulty}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onToggleFavorite(recipe.id)}
              className={`p-2 rounded-xl border transition-colors ${
                recipe.isFavorite
                  ? 'bg-rose-50 border-rose-200 text-rose-600'
                  : 'bg-white border-stone-200 text-stone-600 hover:bg-stone-50'
              }`}
              title={recipe.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              <Heart className={`w-4 h-4 ${recipe.isFavorite ? 'fill-current' : ''}`} />
            </button>

            <button
              type="button"
              onClick={handlePrint}
              className="p-2 rounded-xl border border-stone-200 bg-white text-stone-600 hover:bg-stone-50 transition-colors"
              title="Print recipe"
            >
              <Printer className="w-4 h-4" />
            </button>

            {onEditRecipe && (
              <button
                type="button"
                onClick={() => onEditRecipe(recipe)}
                className="p-2 rounded-xl border border-stone-200 bg-white text-stone-600 hover:bg-stone-50 transition-colors"
                title="Edit recipe"
              >
                <Edit3 className="w-4 h-4" />
              </button>
            )}

            {onDeleteRecipe && (
              <button
                type="button"
                onClick={() => {
                  if (confirm(`Delete "${recipe.title}"?`)) {
                    onDeleteRecipe(recipe.id);
                    onClose();
                  }
                }}
                className="p-2 rounded-xl border border-stone-200 bg-white text-rose-600 hover:bg-rose-50 transition-colors"
                title="Delete recipe"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}

            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl text-stone-500 hover:text-stone-800 hover:bg-stone-100 transition-colors ml-1"
              title="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto flex-1 divide-y divide-stone-100">
          {/* Hero Banner & Title */}
          <div className="relative">
            <div className="h-64 sm:h-80 w-full overflow-hidden bg-stone-100 relative">
              <img
                src={recipe.image}
                alt={recipe.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

              <div className="absolute bottom-6 left-6 right-6 text-white">
                <div className="flex flex-wrap gap-2 mb-2">
                  {recipe.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-white/95"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-serif leading-tight">
                  {recipe.title}
                </h2>
                {recipe.author && (
                  <p className="text-xs text-stone-300 mt-1 flex items-center gap-1.5">
                    <ChefHat className="w-3.5 h-3.5" /> Recipe by {recipe.author}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Quick Metrics & Serving Scaler Bar */}
          <div className="bg-stone-50/80 p-5 sm:p-6 grid grid-cols-2 sm:grid-cols-4 gap-4 items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-700 flex items-center justify-center">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] text-stone-400 font-semibold uppercase tracking-wider block">
                  Total Time
                </span>
                <span className="text-sm font-bold text-stone-800">
                  {recipe.prepTime + recipe.cookTime} mins
                </span>
                <span className="text-[11px] text-stone-500 block">
                  ({recipe.prepTime}m prep + {recipe.cookTime}m cook)
                </span>
              </div>
            </div>

            {/* Serving Scaler */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-700 flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] text-stone-400 font-semibold uppercase tracking-wider block">
                  Portions
                </span>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <button
                    type="button"
                    onClick={() => handleServingChange(-1)}
                    disabled={currentServings <= 1}
                    className="w-6 h-6 rounded-md bg-white border border-stone-300 flex items-center justify-center text-stone-700 hover:bg-stone-100 disabled:opacity-30 disabled:cursor-not-allowed"
                    title="Decrease servings"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="text-sm font-bold text-stone-900 w-7 text-center font-mono">
                    {currentServings}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleServingChange(1)}
                    disabled={currentServings >= 24}
                    className="w-6 h-6 rounded-md bg-white border border-stone-300 flex items-center justify-center text-stone-700 hover:bg-stone-100 disabled:opacity-30 disabled:cursor-not-allowed"
                    title="Increase servings"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-orange-500/10 text-orange-700 flex items-center justify-center">
                <Flame className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] text-stone-400 font-semibold uppercase tracking-wider block">
                  Nutrition
                </span>
                <span className="text-sm font-bold text-stone-800">
                  {recipe.calories ? `${recipe.calories} kcal` : 'Nutrient dense'}
                </span>
                <span className="text-[11px] text-stone-500 block">per portion</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-700 flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] text-stone-400 font-semibold uppercase tracking-wider block">
                  Difficulty
                </span>
                <span className="text-sm font-bold text-stone-800">{recipe.difficulty}</span>
                <span className="text-[11px] text-stone-500 block">Home kitchen</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="px-6 py-4">
            <p className="text-stone-600 text-sm leading-relaxed">{recipe.description}</p>
          </div>

          {/* Tab Selection for Mobile/Desktop */}
          <div className="flex border-b border-stone-200 px-6 bg-stone-50/40">
            <button
              type="button"
              onClick={() => setActiveTab('ingredients')}
              className={`py-3 px-4 font-semibold text-sm border-b-2 transition-all flex items-center gap-2 ${
                activeTab === 'ingredients'
                  ? 'border-amber-600 text-amber-700'
                  : 'border-transparent text-stone-500 hover:text-stone-800'
              }`}
            >
              <span>Ingredients</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-stone-200/70 text-stone-700">
                {checkedIngCount}/{recipe.ingredients.length}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('steps')}
              className={`py-3 px-4 font-semibold text-sm border-b-2 transition-all flex items-center gap-2 ${
                activeTab === 'steps'
                  ? 'border-amber-600 text-amber-700'
                  : 'border-transparent text-stone-500 hover:text-stone-800'
              }`}
            >
              <span>Cooking Steps</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-stone-200/70 text-stone-700">
                {completedStepCount}/{recipe.instructions.length}
              </span>
            </button>
          </div>

          {/* Tab 1: Ingredients & Scaler */}
          {activeTab === 'ingredients' && (
            <div className="p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                <div>
                  <h3 className="text-base font-bold text-stone-900 font-serif">
                    Recipe Ingredients
                  </h3>
                  <p className="text-xs text-stone-500">
                    Scaled for <strong className="text-stone-800">{currentServings} servings</strong>{' '}
                    {scale !== 1 && `(${scale}x base recipe)`}. Click to check off as you prepare.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleAddAllToShoppingList}
                  className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 text-xs font-semibold border border-amber-200 transition-colors shadow-2xs self-start sm:self-auto"
                >
                  <ShoppingCart className="w-3.5 h-3.5 text-amber-700" />
                  <span>{addedToCartToast ? 'Added to Groceries!' : 'Add All to Shopping List'}</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                {recipe.ingredients.map((ing) => {
                  const isChecked = !!checkedIngredients[ing.id];
                  const scaledAmount = ing.amount !== null ? ing.amount * scale : null;
                  const formattedQuantity = formatAmount(scaledAmount);

                  return (
                    <div
                      key={ing.id}
                      onClick={() => toggleIngredientCheck(ing.id)}
                      className={`flex items-start gap-3 p-3 rounded-xl border transition-all cursor-pointer ${
                        isChecked
                          ? 'bg-stone-50/80 border-stone-200 text-stone-400'
                          : 'bg-white border-stone-200 hover:border-amber-300 text-stone-800 shadow-2xs'
                      }`}
                    >
                      <button
                        type="button"
                        className="mt-0.5 text-amber-600 focus:outline-hidden"
                      >
                        {isChecked ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        ) : (
                          <Circle className="w-4 h-4 text-stone-300 hover:text-amber-500" />
                        )}
                      </button>

                      <div className="flex-1 text-sm">
                        <div className="flex items-baseline gap-1.5">
                          {formattedQuantity && (
                            <span
                              className={`font-semibold ${
                                isChecked ? 'line-through text-stone-400' : 'text-stone-900 font-mono'
                              }`}
                            >
                              {formattedQuantity} {ing.unit}
                            </span>
                          )}
                          {!formattedQuantity && ing.unit && (
                            <span className="font-semibold text-stone-800">{ing.unit}</span>
                          )}
                          <span
                            className={`${
                              isChecked ? 'line-through text-stone-400' : 'text-stone-800'
                            }`}
                          >
                            {ing.name}
                          </span>
                        </div>
                        {ing.notes && (
                          <p className="text-xs text-stone-400 italic mt-0.5">{ing.notes}</p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Tab 2: Cooking Steps & Timers */}
          {activeTab === 'steps' && (
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h3 className="text-base font-bold text-stone-900 font-serif">
                    Step-by-Step Instructions
                  </h3>
                  <p className="text-xs text-stone-500">
                    Follow along and check off steps. Click the timer buttons to start guided cooking timers.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {recipe.instructions.map((stepItem) => {
                  const isDone = !!completedSteps[stepItem.step];

                  return (
                    <div
                      key={stepItem.step}
                      className={`p-4 rounded-2xl border transition-all ${
                        isDone
                          ? 'bg-stone-50/70 border-stone-200'
                          : 'bg-white border-stone-200 hover:border-amber-300 shadow-2xs'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <button
                          type="button"
                          onClick={() => toggleStepComplete(stepItem.step)}
                          className="mt-1 text-amber-600 focus:outline-hidden"
                          title={isDone ? 'Mark step incomplete' : 'Mark step complete'}
                        >
                          {isDone ? (
                            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                          ) : (
                            <div className="w-5 h-5 rounded-full border-2 border-stone-300 flex items-center justify-center text-[10px] font-bold text-stone-600 hover:border-amber-600 hover:text-amber-700">
                              {stepItem.step}
                            </div>
                          )}
                        </button>

                        <div className="flex-1">
                          <p
                            className={`text-sm leading-relaxed ${
                              isDone ? 'line-through text-stone-400' : 'text-stone-800'
                            }`}
                          >
                            {stepItem.instruction}
                          </p>

                          {stepItem.tip && (
                            <div className="mt-2.5 p-2.5 rounded-lg bg-amber-50/70 border border-amber-200/50 text-xs text-amber-900 flex items-start gap-2">
                              <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                              <span>
                                <strong>Chef Tip:</strong> {stepItem.tip}
                              </span>
                            </div>
                          )}

                          {stepItem.timerMinutes && (
                            <div className="mt-3 flex items-center gap-2">
                              <button
                                type="button"
                                onClick={() =>
                                  onStartTimer(
                                    stepItem.timerMinutes!,
                                    `Step ${stepItem.step} (${recipe.title.slice(0, 18)}...)`
                                  )
                                }
                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-900 hover:bg-stone-800 text-white text-xs font-medium transition-colors shadow-2xs"
                              >
                                <Play className="w-3 h-3 text-amber-400 fill-amber-400" />
                                <span>Start {stepItem.timerMinutes} min timer</span>
                              </button>
                              <span className="text-xs text-stone-400">
                                Built-in countdown alert
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Modal Bottom Footer */}
        <div className="px-6 py-4 border-t border-stone-100 bg-stone-50 flex items-center justify-between text-xs text-stone-500">
          <span>
            {completedStepCount === recipe.instructions.length
              ? '🎉 All steps finished! Enjoy your meal!'
              : `Step ${completedStepCount + 1} of ${recipe.instructions.length}`}
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-stone-200 hover:bg-stone-300 text-stone-800 font-medium transition-colors"
          >
            Done Viewing
          </button>
        </div>
      </div>
    </div>
  );
};
