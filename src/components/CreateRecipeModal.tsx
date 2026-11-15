import React, { useState } from 'react';
import { Recipe, Ingredient, InstructionStep } from '../types.ts';
import { X, Plus, Trash2, Image as ImageIcon, Sparkles } from 'lucide-react';
import butterChickenImg from '../assets/images/indian_butter_chicken_1794710226108.jpg';
import palakPaneerImg from '../assets/images/indian_palak_paneer_1794710226253.jpg';
import dalTadkaImg from '../assets/images/indian_dal_tadka_1794710227342.jpg';
import masalaDosaImg from '../assets/images/indian_masala_dosa_1794710227211.jpg';
import samosasImg from '../assets/images/indian_samosas_1794710228289.jpg';

interface CreateRecipeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveRecipe: (recipe: Recipe) => void;
  initialRecipe?: Recipe | null;
}

const PHOTO_PRESETS = [
  { label: 'Indian Curry', url: butterChickenImg },
  { label: 'Palak Paneer', url: palakPaneerImg },
  { label: 'Dal Tadka', url: dalTadkaImg },
  { label: 'Masala Dosa', url: masalaDosaImg },
  { label: 'Samosas', url: samosasImg },
  { label: 'Pasta', url: 'https://images.unsplash.com/photo-1621996346565-e3d5d6281515?auto=format&fit=crop&w=1000&q=80' },
  { label: 'Salad / Healthy Bowl', url: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1000&q=80' },
  { label: 'Breakfast / Eggs', url: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=1000&q=80' },
  { label: 'Meat / Steak', url: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1000&q=80' },
  { label: 'Warm Soup / Stew', url: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=1000&q=80' },
  { label: 'Dessert / Pastry', url: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1000&q=80' },
  { label: 'Seafood', url: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=1000&q=80' },
];

export const CreateRecipeModal: React.FC<CreateRecipeModalProps> = ({
  isOpen,
  onClose,
  onSaveRecipe,
  initialRecipe,
}) => {
  if (!isOpen) return null;

  const [title, setTitle] = useState(initialRecipe?.title || '');
  const [description, setDescription] = useState(initialRecipe?.description || '');
  const [image, setImage] = useState(
    initialRecipe?.image || PHOTO_PRESETS[0].url
  );
  const [category, setCategory] = useState<Recipe['category']>(
    initialRecipe?.category || 'Mains'
  );
  const [prepTime, setPrepTime] = useState(initialRecipe?.prepTime || 15);
  const [cookTime, setCookTime] = useState(initialRecipe?.cookTime || 20);
  const [servings, setServings] = useState(initialRecipe?.servings || 4);
  const [difficulty, setDifficulty] = useState<Recipe['difficulty']>(
    initialRecipe?.difficulty || 'Medium'
  );
  const [calories, setCalories] = useState<number | ''>(
    initialRecipe?.calories || ''
  );
  const [tagsInput, setTagsInput] = useState(
    initialRecipe?.tags.join(', ') || 'Homemade, Delicious'
  );
  const [author, setAuthor] = useState(initialRecipe?.author || 'You');

  const [ingredients, setIngredients] = useState<Ingredient[]>(
    initialRecipe?.ingredients && initialRecipe.ingredients.length > 0
      ? initialRecipe.ingredients
      : [
          { id: 'ing-1', name: '', amount: 1, unit: 'cup' },
          { id: 'ing-2', name: '', amount: 2, unit: 'tbsp' },
        ]
  );

  const [instructions, setInstructions] = useState<InstructionStep[]>(
    initialRecipe?.instructions && initialRecipe.instructions.length > 0
      ? initialRecipe.instructions
      : [
          { step: 1, instruction: '' },
          { step: 2, instruction: '' },
        ]
  );

  const handleAddIngredient = () => {
    setIngredients((prev) => [
      ...prev,
      { id: `ing-${Date.now()}-${prev.length}`, name: '', amount: null, unit: '' },
    ]);
  };

  const handleRemoveIngredient = (id: string) => {
    setIngredients((prev) => prev.filter((item) => item.id !== id));
  };

  const handleUpdateIngredient = (
    id: string,
    field: keyof Ingredient,
    val: any
  ) => {
    setIngredients((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: val } : item))
    );
  };

  const handleAddStep = () => {
    setInstructions((prev) => [
      ...prev,
      { step: prev.length + 1, instruction: '' },
    ]);
  };

  const handleRemoveStep = (index: number) => {
    setInstructions((prev) => {
      const filtered = prev.filter((_, i) => i !== index);
      return filtered.map((st, i) => ({ ...st, step: i + 1 }));
    });
  };

  const handleUpdateStep = (
    index: number,
    field: keyof InstructionStep,
    val: any
  ) => {
    setInstructions((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: val } : item))
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      alert('Please provide a recipe title');
      return;
    }

    const cleanIngredients = ingredients.filter((ing) => ing.name.trim() !== '');
    if (cleanIngredients.length === 0) {
      alert('Please add at least one ingredient');
      return;
    }

    const cleanSteps = instructions.filter((st) => st.instruction.trim() !== '');
    if (cleanSteps.length === 0) {
      alert('Please add at least one instruction step');
      return;
    }

    const parsedTags = tagsInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const savedRecipe: Recipe = {
      id: initialRecipe?.id || `recipe-${Date.now()}`,
      title: title.trim(),
      description: description.trim() || 'A flavorful homemade dish.',
      image: image.trim() || PHOTO_PRESETS[0].url,
      category,
      prepTime: Number(prepTime) || 10,
      cookTime: Number(cookTime) || 15,
      servings: Number(servings) || 2,
      difficulty,
      calories: calories ? Number(calories) : undefined,
      tags: parsedTags.length > 0 ? parsedTags : ['Homemade'],
      cuisine:
        parsedTags.some((t) => t.toLowerCase() === 'indian')
          ? 'Indian'
          : initialRecipe?.cuisine,
      ingredients: cleanIngredients,
      instructions: cleanSteps.map((st, i) => ({ ...st, step: i + 1 })),
      author: author.trim() || 'You',
      createdAt: initialRecipe?.createdAt || new Date().toISOString(),
      isFavorite: initialRecipe?.isFavorite || false,
    };

    onSaveRecipe(savedRecipe);
    onClose();
  };

  return (
    <div
      id="create-recipe-modal-backdrop"
      className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        id="create-recipe-modal-card"
        className="w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden my-auto max-h-[92vh] flex flex-col animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 bg-white">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-700 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-bold text-stone-900 font-serif">
              {initialRecipe ? 'Edit Recipe' : 'Add New Recipe'}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-stone-400 hover:text-stone-800 hover:bg-stone-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form */}
        <form onSubmit={handleSubmit} className="overflow-y-auto flex-1 p-6 space-y-6">
          {/* Basics */}
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1">
                Recipe Title *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Crispy Lemon Herb Roast Chicken"
                className="w-full px-4 py-2.5 text-sm bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:border-amber-500 focus:outline-hidden focus:ring-2 focus:ring-amber-500/20"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1">
                Description
              </label>
              <textarea
                rows={2}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="A short, enticing summary of this recipe..."
                className="w-full px-4 py-2 text-sm bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:border-amber-500 focus:outline-hidden focus:ring-2 focus:ring-amber-500/20"
              />
            </div>

            {/* Photo Selection */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1.5 flex items-center gap-1.5">
                <ImageIcon className="w-3.5 h-3.5 text-stone-500" />
                Recipe Photo URL or Quick Presets
              </label>
              <input
                type="url"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="https://images.unsplash.com/..."
                className="w-full px-4 py-2 text-sm bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:border-amber-500 focus:outline-hidden mb-2"
              />

              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
                <span className="text-stone-400 shrink-0 mr-1">Presets:</span>
                {PHOTO_PRESETS.map((preset) => (
                  <button
                    key={preset.label}
                    type="button"
                    onClick={() => setImage(preset.url)}
                    className={`shrink-0 px-2.5 py-1 rounded-lg border transition-colors ${
                      image === preset.url
                        ? 'bg-amber-100 border-amber-300 text-amber-900 font-medium'
                        : 'bg-stone-100 border-stone-200 text-stone-600 hover:bg-stone-200'
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Grid for Category, Servings, Times */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full px-3 py-2 text-sm bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:border-amber-500"
                >
                  <option value="Breakfast">Breakfast</option>
                  <option value="Mains">Mains</option>
                  <option value="Pasta">Pasta</option>
                  <option value="Salads & Bowls">Salads & Bowls</option>
                  <option value="Soups">Soups</option>
                  <option value="Dessert">Dessert</option>
                  <option value="Quick Bites">Quick Bites</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1">
                  Servings
                </label>
                <input
                  type="number"
                  min="1"
                  max="50"
                  value={servings}
                  onChange={(e) => setServings(parseInt(e.target.value) || 1)}
                  className="w-full px-3 py-2 text-sm bg-stone-50 border border-stone-200 rounded-xl focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1">
                  Prep (mins)
                </label>
                <input
                  type="number"
                  min="0"
                  value={prepTime}
                  onChange={(e) => setPrepTime(parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-2 text-sm bg-stone-50 border border-stone-200 rounded-xl focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1">
                  Cook (mins)
                </label>
                <input
                  type="number"
                  min="0"
                  value={cookTime}
                  onChange={(e) => setCookTime(parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-2 text-sm bg-stone-50 border border-stone-200 rounded-xl focus:bg-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1">
                  Difficulty
                </label>
                <select
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value as any)}
                  className="w-full px-3 py-2 text-sm bg-stone-50 border border-stone-200 rounded-xl focus:bg-white"
                >
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1">
                  Calories (optional)
                </label>
                <input
                  type="number"
                  placeholder="e.g. 450"
                  value={calories}
                  onChange={(e) =>
                    setCalories(e.target.value ? parseInt(e.target.value) : '')
                  }
                  className="w-full px-3 py-2 text-sm bg-stone-50 border border-stone-200 rounded-xl focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1">
                  Author / Chef
                </label>
                <input
                  type="text"
                  placeholder="e.g. Grandma, Chef Alex"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-stone-50 border border-stone-200 rounded-xl focus:bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1">
                Tags (comma-separated)
              </label>
              <input
                type="text"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                placeholder="Vegetarian, Gluten-Free, Quick 20m, Comfort Food"
                className="w-full px-4 py-2 text-sm bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:border-amber-500"
              />
            </div>
          </div>

          {/* Ingredients Builder */}
          <div className="pt-4 border-t border-stone-200">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-stone-900">
                  Ingredients
                </h3>
                <p className="text-xs text-stone-500">
                  Specify amount and unit to allow dynamic portion scaling.
                </p>
              </div>
              <button
                type="button"
                onClick={handleAddIngredient}
                className="flex items-center gap-1 text-xs font-semibold text-amber-700 bg-amber-50 hover:bg-amber-100 px-3 py-1.5 rounded-lg border border-amber-200 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Ingredient</span>
              </button>
            </div>

            <div className="space-y-2">
              {ingredients.map((ing) => (
                <div key={ing.id} className="flex items-center gap-2">
                  <input
                    type="number"
                    step="0.1"
                    placeholder="Qty"
                    value={ing.amount !== null ? ing.amount : ''}
                    onChange={(e) =>
                      handleUpdateIngredient(
                        ing.id,
                        'amount',
                        e.target.value ? parseFloat(e.target.value) : null
                      )
                    }
                    className="w-18 px-2.5 py-1.5 text-sm bg-stone-50 border border-stone-200 rounded-lg text-center"
                  />
                  <input
                    type="text"
                    placeholder="Unit (cup, tbsp, g)"
                    value={ing.unit}
                    onChange={(e) =>
                      handleUpdateIngredient(ing.id, 'unit', e.target.value)
                    }
                    className="w-28 px-2.5 py-1.5 text-sm bg-stone-50 border border-stone-200 rounded-lg"
                  />
                  <input
                    type="text"
                    placeholder="Ingredient name (e.g. Fresh rosemary)"
                    value={ing.name}
                    onChange={(e) =>
                      handleUpdateIngredient(ing.id, 'name', e.target.value)
                    }
                    className="flex-1 px-3 py-1.5 text-sm bg-stone-50 border border-stone-200 rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveIngredient(ing.id)}
                    disabled={ingredients.length <= 1}
                    className="p-1.5 text-stone-400 hover:text-rose-500 rounded-lg disabled:opacity-30"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Instructions Builder */}
          <div className="pt-4 border-t border-stone-200">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-stone-900">
                  Instruction Steps
                </h3>
                <p className="text-xs text-stone-500">
                  Step-by-step directions with optional timers and chef tips.
                </p>
              </div>
              <button
                type="button"
                onClick={handleAddStep}
                className="flex items-center gap-1 text-xs font-semibold text-amber-700 bg-amber-50 hover:bg-amber-100 px-3 py-1.5 rounded-lg border border-amber-200 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Step</span>
              </button>
            </div>

            <div className="space-y-3">
              {instructions.map((step, index) => (
                <div
                  key={index}
                  className="p-3 bg-stone-50 border border-stone-200 rounded-xl space-y-2"
                >
                  <div className="flex items-start gap-2">
                    <span className="w-6 h-6 rounded-full bg-stone-200 text-stone-700 font-bold text-xs flex items-center justify-center shrink-0 mt-1">
                      {index + 1}
                    </span>
                    <textarea
                      rows={2}
                      placeholder={`Instruction for step ${index + 1}...`}
                      value={step.instruction}
                      onChange={(e) =>
                        handleUpdateStep(index, 'instruction', e.target.value)
                      }
                      className="flex-1 px-3 py-1.5 text-sm bg-white border border-stone-200 rounded-lg focus:border-amber-500 focus:outline-hidden"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveStep(index)}
                      disabled={instructions.length <= 1}
                      className="p-1.5 text-stone-400 hover:text-rose-500 rounded-lg disabled:opacity-30"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 pl-8 text-xs">
                    <div className="flex items-center gap-1.5">
                      <span className="text-stone-500">Timer (mins):</span>
                      <input
                        type="number"
                        min="1"
                        placeholder="e.g. 5"
                        value={step.timerMinutes || ''}
                        onChange={(e) =>
                          handleUpdateStep(
                            index,
                            'timerMinutes',
                            e.target.value ? parseInt(e.target.value) : undefined
                          )
                        }
                        className="w-16 px-2 py-1 bg-white border border-stone-200 rounded-md text-center"
                      />
                    </div>

                    <div className="flex items-center gap-1.5 flex-1">
                      <span className="text-stone-500 shrink-0">Chef Tip:</span>
                      <input
                        type="text"
                        placeholder="Optional handy advice..."
                        value={step.tip || ''}
                        onChange={(e) =>
                          handleUpdateStep(index, 'tip', e.target.value)
                        }
                        className="w-full px-2 py-1 bg-white border border-stone-200 rounded-md"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form Actions */}
          <div className="pt-4 border-t border-stone-200 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 text-sm font-medium text-stone-600 hover:text-stone-800 hover:bg-stone-100 rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 text-sm font-semibold text-white bg-amber-600 hover:bg-amber-700 rounded-xl transition-colors shadow-xs"
            >
              {initialRecipe ? 'Save Changes' : 'Create Recipe'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
