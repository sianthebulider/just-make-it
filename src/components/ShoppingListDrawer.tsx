import React, { useState } from 'react';
import { ShoppingItem } from '../types.ts';
import { guessCategory, formatAmount } from '../utils/formatters.ts';
import {
  X,
  Plus,
  CheckCircle2,
  Circle,
  Trash2,
  Copy,
  Check,
  ShoppingBag,
  Sparkles
} from 'lucide-react';

interface ShoppingListDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: ShoppingItem[];
  onToggleItem: (id: string) => void;
  onRemoveItem: (id: string) => void;
  onAddItem: (item: Omit<ShoppingItem, 'id' | 'checked'>) => void;
  onClearCompleted: () => void;
  onClearAll: () => void;
}

const CATEGORY_ORDER: ShoppingItem['category'][] = [
  'Produce',
  'Dairy & Eggs',
  'Meat & Seafood',
  'Pantry',
  'Bakery',
  'Spices',
  'Other',
];

export const ShoppingListDrawer: React.FC<ShoppingListDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onToggleItem,
  onRemoveItem,
  onAddItem,
  onClearCompleted,
  onClearAll,
}) => {
  const [quickInput, setQuickInput] = useState('');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleQuickAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = quickInput.trim();
    if (!trimmed) return;

    // Detect if starts with number e.g. "3 limes" or "200g flour"
    const match = trimmed.match(/^(\d+(\.\d+)?|\d+\/\d+)\s*([a-zA-Z]+)?\s+(.+)$/);
    let amount: number | null = null;
    let unit = '';
    let name = trimmed;

    if (match) {
      if (match[1].includes('/')) {
        const [num, den] = match[1].split('/');
        amount = parseFloat(num) / parseFloat(den);
      } else {
        amount = parseFloat(match[1]);
      }
      unit = match[3] || '';
      name = match[4];
    }

    onAddItem({
      name,
      amount,
      unit,
      category: guessCategory(name),
    });

    setQuickInput('');
  };

  const handleCopyList = () => {
    if (items.length === 0) return;
    const lines = items.map((it) => {
      const status = it.checked ? '[x]' : '[ ]';
      const qty = it.amount !== null ? `${formatAmount(it.amount)} ${it.unit} ` : '';
      return `${status} ${qty}${it.name}${it.recipeTitle ? ` (${it.recipeTitle})` : ''}`;
    });
    navigator.clipboard.writeText(`Grocery List:\n${lines.join('\n')}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Group items by category
  const groupedItems = CATEGORY_ORDER.reduce((acc, cat) => {
    const list = items.filter((it) => it.category === cat);
    if (list.length > 0) {
      acc[cat] = list;
    }
    return acc;
  }, {} as Record<ShoppingItem['category'], ShoppingItem[]>);

  const completedCount = items.filter((i) => i.checked).length;

  return (
    <div
      id="shopping-list-drawer-backdrop"
      className="fixed inset-0 z-50 overflow-hidden bg-stone-900/50 backdrop-blur-xs flex justify-end animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        id="shopping-list-drawer-panel"
        className="w-full max-w-md bg-[#fcfbf9] h-full shadow-2xl border-l border-stone-200 flex flex-col animate-in slide-in-from-right duration-250"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-stone-200 bg-white">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-700 flex items-center justify-center">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-stone-900 font-serif">Grocery List</h2>
              <p className="text-xs text-stone-500">
                {items.length} items total ({completedCount} purchased)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            {items.length > 0 && (
              <button
                type="button"
                onClick={handleCopyList}
                className="p-2 rounded-xl text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition-colors"
                title="Copy shopping list to clipboard"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl text-stone-500 hover:text-stone-900 hover:bg-stone-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Quick Add Bar */}
        <div className="p-4 bg-white border-b border-stone-200">
          <form onSubmit={handleQuickAdd} className="flex gap-2">
            <input
              type="text"
              value={quickInput}
              onChange={(e) => setQuickInput(e.target.value)}
              placeholder="Add item (e.g. 2 lemons, olive oil)..."
              className="flex-1 px-3.5 py-2 text-sm bg-stone-100 rounded-xl border border-stone-200 focus:bg-white focus:border-amber-500 focus:outline-hidden focus:ring-2 focus:ring-amber-500/20"
            />
            <button
              type="submit"
              className="px-3.5 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-sm font-medium flex items-center gap-1 shadow-2xs"
            >
              <Plus className="w-4 h-4" />
              <span>Add</span>
            </button>
          </form>
        </div>

        {/* List Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          {items.length === 0 ? (
            <div className="text-center py-16 px-4">
              <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <Sparkles className="w-7 h-7" />
              </div>
              <h3 className="text-base font-bold text-stone-800 font-serif">Your cart is empty</h3>
              <p className="text-xs text-stone-500 mt-1 max-w-xs mx-auto">
                Open any recipe and click &quot;Add All to Shopping List&quot; or type items in the field above!
              </p>
            </div>
          ) : (
            Object.entries(groupedItems).map(([category, catItems]) => (
              <div key={category} className="space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold text-stone-400 uppercase tracking-wider px-1">
                  <span>{category}</span>
                  <span>{catItems.length}</span>
                </div>

                <div className="bg-white rounded-2xl border border-stone-200 divide-y divide-stone-100 overflow-hidden shadow-2xs">
                  {catItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between p-3 hover:bg-stone-50/80 transition-colors"
                    >
                      <button
                        type="button"
                        onClick={() => onToggleItem(item.id)}
                        className="flex items-center gap-3 flex-1 text-left"
                      >
                        {item.checked ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        ) : (
                          <Circle className="w-4 h-4 text-stone-300 hover:text-amber-500 shrink-0" />
                        )}

                        <div className="text-sm">
                          <span
                            className={
                              item.checked ? 'line-through text-stone-400' : 'text-stone-800'
                            }
                          >
                            {item.amount !== null && (
                              <strong className="font-semibold text-stone-900 font-mono mr-1">
                                {formatAmount(item.amount)} {item.unit}
                              </strong>
                            )}
                            {item.name}
                          </span>
                          {item.recipeTitle && (
                            <span className="block text-[10px] text-stone-400">
                              for {item.recipeTitle}
                            </span>
                          )}
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => onRemoveItem(item.id)}
                        className="text-stone-300 hover:text-rose-500 p-1.5 rounded-lg transition-colors ml-2"
                        title="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer Actions */}
        {items.length > 0 && (
          <div className="p-4 bg-white border-t border-stone-200 flex items-center justify-between gap-3 text-xs">
            {completedCount > 0 && (
              <button
                type="button"
                onClick={onClearCompleted}
                className="text-stone-600 hover:text-stone-900 font-medium py-2 px-3 rounded-lg hover:bg-stone-100 transition-colors"
              >
                Clear completed ({completedCount})
              </button>
            )}

            <button
              type="button"
              onClick={onClearAll}
              className="text-rose-600 hover:text-rose-800 font-medium py-2 px-3 rounded-lg hover:bg-rose-50 transition-colors ml-auto"
            >
              Clear all
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
