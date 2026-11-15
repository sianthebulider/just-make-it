import React from 'react';
import { Recipe } from '../types.ts';
import { Clock, Users, Flame, Heart, ChefHat } from 'lucide-react';

interface RecipeCardProps {
  recipe: Recipe;
  onSelectRecipe: (recipe: Recipe) => void;
  onToggleFavorite: (recipeId: string, e: React.MouseEvent) => void;
}

export const RecipeCard: React.FC<RecipeCardProps> = ({
  recipe,
  onSelectRecipe,
  onToggleFavorite,
}) => {
  const totalTime = recipe.prepTime + recipe.cookTime;

  const difficultyColor = {
    Easy: 'text-emerald-700 bg-emerald-50 border-emerald-200/80',
    Medium: 'text-amber-700 bg-amber-50 border-amber-200/80',
    Hard: 'text-rose-700 bg-rose-50 border-rose-200/80',
  }[recipe.difficulty];

  return (
    <article
      id={`recipe-card-${recipe.id}`}
      onClick={() => onSelectRecipe(recipe)}
      className="group relative flex flex-col bg-white rounded-2xl border border-stone-200/80 hover:border-amber-400/80 shadow-xs hover:shadow-md transition-all duration-300 overflow-hidden cursor-pointer"
    >
      {/* Recipe Photo */}
      <div className="relative aspect-4/3 overflow-hidden bg-stone-100">
        <img
          src={recipe.image}
          alt={recipe.title}
          loading="lazy"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10 opacity-70 group-hover:opacity-60 transition-opacity" />

        {/* Category tag */}
        <span className="absolute top-3 left-3 px-2.5 py-1 rounded-lg text-xs font-semibold tracking-wide bg-white/95 text-stone-800 backdrop-blur-xs shadow-xs">
          {recipe.category}
        </span>

        {/* Favorite button */}
        <button
          type="button"
          aria-label={recipe.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          onClick={(e) => onToggleFavorite(recipe.id, e)}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-transform hover:scale-110 active:scale-95 ${
            recipe.isFavorite
              ? 'bg-rose-500 text-white shadow-xs'
              : 'bg-black/30 hover:bg-black/50 text-white'
          }`}
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              recipe.isFavorite ? 'fill-current' : ''
            }`}
          />
        </button>

        {/* Quick stats floating bar */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white/95 font-medium">
          <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-xs px-2.5 py-1 rounded-md">
            <Clock className="w-3.5 h-3.5 text-amber-300" />
            <span>{totalTime}m</span>
          </div>

          <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-xs px-2.5 py-1 rounded-md">
            <Users className="w-3.5 h-3.5 text-amber-300" />
            <span>{recipe.servings} serv</span>
          </div>

          {recipe.calories && (
            <div className="flex items-center gap-1 bg-black/40 backdrop-blur-xs px-2.5 py-1 rounded-md">
              <Flame className="w-3.5 h-3.5 text-orange-400" />
              <span>{recipe.calories} kcal</span>
            </div>
          )}
        </div>
      </div>

      {/* Card Body */}
      <div className="flex flex-col flex-1 p-5">
        <div className="flex items-center justify-between gap-2 mb-2">
          <span
            className={`text-[11px] font-semibold tracking-wide uppercase px-2 py-0.5 rounded-md border ${difficultyColor}`}
          >
            {recipe.difficulty}
          </span>
          {recipe.author && (
            <span className="text-xs text-stone-400 flex items-center gap-1">
              <ChefHat className="w-3 h-3 text-stone-400" />
              {recipe.author}
            </span>
          )}
        </div>

        <h3 className="text-lg font-bold text-stone-900 group-hover:text-amber-700 font-serif leading-snug line-clamp-2 transition-colors mb-2">
          {recipe.title}
        </h3>

        <p className="text-stone-500 text-xs leading-relaxed line-clamp-2 mb-4 flex-1">
          {recipe.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 pt-2 border-t border-stone-100">
          {recipe.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-[11px] font-medium text-stone-600 bg-stone-100 px-2 py-0.5 rounded-md"
            >
              {tag}
            </span>
          ))}
          {recipe.tags.length > 3 && (
            <span className="text-[11px] text-stone-400 self-center">
              +{recipe.tags.length - 3}
            </span>
          )}
        </div>
      </div>
    </article>
  );
};
