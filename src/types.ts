export interface Ingredient {
  id: string;
  name: string;
  amount: number | null;
  unit: string;
  notes?: string;
}

export interface InstructionStep {
  step: number;
  instruction: string;
  timerMinutes?: number;
  tip?: string;
}

export interface Recipe {
  id: string;
  title: string;
  description: string;
  image: string;
  category: 'Breakfast' | 'Mains' | 'Pasta' | 'Salads & Bowls' | 'Soups' | 'Dessert' | 'Quick Bites';
  prepTime: number; // in minutes
  cookTime: number; // in minutes
  servings: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  calories?: number;
  tags: string[];
  ingredients: Ingredient[];
  instructions: InstructionStep[];
  isFavorite?: boolean;
  cuisine?: string;
  createdAt: string;
  author?: string;
}

export interface ShoppingItem {
  id: string;
  name: string;
  amount: number | null;
  unit: string;
  checked: boolean;
  category: 'Produce' | 'Pantry' | 'Dairy & Eggs' | 'Meat & Seafood' | 'Bakery' | 'Spices' | 'Other';
  recipeTitle?: string;
}

export type FilterCategory = 'All' | 'Indian' | 'Breakfast' | 'Mains' | 'Pasta' | 'Salads & Bowls' | 'Soups' | 'Dessert' | 'Quick Bites' | 'Favorites';
