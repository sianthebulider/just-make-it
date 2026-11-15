import { Recipe } from '../types.ts';
import butterChickenImg from '../assets/images/indian_butter_chicken_1794710226108.jpg';
import palakPaneerImg from '../assets/images/indian_palak_paneer_1794710226253.jpg';
import dalTadkaImg from '../assets/images/indian_dal_tadka_1794710227342.jpg';
import masalaDosaImg from '../assets/images/indian_masala_dosa_1794710227211.jpg';
import samosasImg from '../assets/images/indian_samosas_1794710228289.jpg';

export const initialRecipes: Recipe[] = [
  {
    id: 'recipe-indian-1',
    title: 'Butter Chicken (Murgh Makhani)',
    description: 'Succulent charred tandoori-spiced chicken thighs simmered in a velvety, aromatic tomato-butter gravy finished with kasuri methi and cream.',
    image: butterChickenImg,
    category: 'Mains',
    cuisine: 'Indian',
    prepTime: 20,
    cookTime: 25,
    servings: 4,
    difficulty: 'Medium',
    calories: 540,
    tags: ['Indian', 'High Protein', 'Comfort Food', 'Gluten-Free'],
    author: 'Chef Aarav',
    createdAt: '2026-03-16T12:00:00Z',
    isFavorite: true,
    ingredients: [
      { id: 'i-ind1-1', name: 'Boneless skinless chicken thighs', amount: 700, unit: 'g', notes: 'cut into bite-sized pieces' },
      { id: 'i-ind1-2', name: 'Full-fat Greek yogurt (dahi)', amount: 0.5, unit: 'cup', notes: 'for marinade' },
      { id: 'i-ind1-3', name: 'Ginger-garlic paste', amount: 2, unit: 'tbsp' },
      { id: 'i-ind1-4', name: 'Kashmiri red chili powder', amount: 1.5, unit: 'tsp' },
      { id: 'i-ind1-5', name: 'Garam masala', amount: 1.5, unit: 'tsp' },
      { id: 'i-ind1-6', name: 'Ground turmeric', amount: 0.5, unit: 'tsp' },
      { id: 'i-ind1-7', name: 'Unsalted butter', amount: 3, unit: 'tbsp', notes: 'divided' },
      { id: 'i-ind1-8', name: 'Ripe tomatoes or tomato puree', amount: 500, unit: 'g', notes: 'finely pureed' },
      { id: 'i-ind1-9', name: 'Heavy cream', amount: 0.33, unit: 'cup' },
      { id: 'i-ind1-10', name: 'Kasuri methi (dried fenugreek leaves)', amount: 1, unit: 'tbsp', notes: 'crushed between palms' },
      { id: 'i-ind1-11', name: 'Honey or sugar', amount: 1, unit: 'tsp', notes: 'balances tomato acidity' },
      { id: 'i-ind1-12', name: 'Fresh cilantro leaves', amount: 2, unit: 'tbsp', notes: 'chopped for garnish' },
    ],
    instructions: [
      {
        step: 1,
        instruction: 'Whisk yogurt, half the ginger-garlic paste, 1 tsp Kashmiri chili powder, turmeric, half the garam masala, and 1 tsp salt in a bowl. Toss chicken pieces to coat and marinate for at least 20 minutes.',
        timerMinutes: 20,
        tip: 'Marinating with yogurt tenderizes the chicken while locking in moisture.'
      },
      {
        step: 2,
        instruction: 'Melt 1 tbsp butter in a heavy skillet or kadai over high heat. Sear marinated chicken in a single layer for 3 to 4 minutes per side until lightly charred at the edges. Transfer to a plate.',
        timerMinutes: 7
      },
      {
        step: 3,
        instruction: 'Lower heat to medium and melt remaining 2 tbsp butter in the same pan. Add remaining ginger-garlic paste and sauté for 1 minute until fragrant without browning.',
        timerMinutes: 1
      },
      {
        step: 4,
        instruction: 'Pour in tomato puree, remaining Kashmiri chili powder, and a pinch of salt. Simmer gently for 10 to 12 minutes, stirring often, until the sauce thickens and butter begins to glisten on the surface.',
        timerMinutes: 11,
        tip: 'Cooking the tomatoes until the fat separates removes any raw tang.'
      },
      {
        step: 5,
        instruction: 'Return seared chicken and any resting juices to the pan. Stir in heavy cream, honey, remaining garam masala, and crushed kasuri methi. Simmer on low for 5 minutes until silky and tender.',
        timerMinutes: 5
      },
      {
        step: 6,
        instruction: 'Finish with a delicate swirl of cream, julienned ginger, and fresh cilantro. Serve piping hot with charred garlic naan or steamed basmati rice.'
      }
    ]
  },
  {
    id: 'recipe-indian-2',
    title: 'Creamy Palak Paneer',
    description: 'Vibrant emerald spiced spinach puree studded with golden pan-seared cubes of fresh paneer cheese, tempered with roasted cumin and garlic.',
    image: palakPaneerImg,
    category: 'Mains',
    cuisine: 'Indian',
    prepTime: 15,
    cookTime: 20,
    servings: 4,
    difficulty: 'Easy',
    calories: 380,
    tags: ['Indian', 'Vegetarian', 'Gluten-Free', 'High Protein'],
    author: 'Chef Priya',
    createdAt: '2026-03-16T11:30:00Z',
    isFavorite: true,
    ingredients: [
      { id: 'i-ind2-1', name: 'Fresh baby spinach', amount: 450, unit: 'g', notes: 'washed thoroughly' },
      { id: 'i-ind2-2', name: 'Paneer (Indian cottage cheese)', amount: 250, unit: 'g', notes: 'cut into 1-inch cubes' },
      { id: 'i-ind2-3', name: 'Ghee or unsalted butter', amount: 2, unit: 'tbsp' },
      { id: 'i-ind2-4', name: 'Cumin seeds', amount: 1, unit: 'tsp' },
      { id: 'i-ind2-5', name: 'Yellow onion', amount: 1, unit: 'medium', notes: 'finely diced' },
      { id: 'i-ind2-6', name: 'Garlic cloves', amount: 4, unit: 'cloves', notes: 'minced' },
      { id: 'i-ind2-7', name: 'Fresh ginger', amount: 1, unit: 'tbsp', notes: 'finely grated' },
      { id: 'i-ind2-8', name: 'Green chili', amount: 1, unit: 'whole', notes: 'halved' },
      { id: 'i-ind2-9', name: 'Ripe tomato', amount: 1, unit: 'medium', notes: 'finely chopped' },
      { id: 'i-ind2-10', name: 'Ground coriander & garam masala', amount: 1.5, unit: 'tsp' },
      { id: 'i-ind2-11', name: 'Heavy cream', amount: 3, unit: 'tbsp' },
    ],
    instructions: [
      {
        step: 1,
        instruction: 'Bring a pot of water to a boil. Blanch spinach leaves for 2 minutes until bright green, then plunge immediately into ice water to lock in the vibrant emerald color. Drain and blend with the green chili into a smooth puree.',
        timerMinutes: 2,
        tip: 'Shocking spinach in ice water prevents the gravy from turning dull olive.'
      },
      {
        step: 2,
        instruction: 'Heat 1 tbsp ghee in a wide skillet over medium heat. Sear paneer cubes for 2 minutes per side until golden brown, then transfer to a bowl of warm water to keep them pillowy soft.',
        timerMinutes: 4
      },
      {
        step: 3,
        instruction: 'In the same skillet, add remaining ghee and cumin seeds. Once they crackle, sauté diced onions for 5 minutes until translucent and golden.',
        timerMinutes: 5
      },
      {
        step: 4,
        instruction: 'Stir in garlic, grated ginger, chopped tomato, coriander, garam masala, and salt. Cook for 4 minutes until tomatoes soften into a thick masala base.',
        timerMinutes: 4
      },
      {
        step: 5,
        instruction: 'Pour in the emerald spinach puree and 1/4 cup water. Simmer gently for 4 minutes, then fold in drained paneer cubes and heavy cream. Cook 2 minutes more and serve warm.'
      }
    ]
  },
  {
    id: 'recipe-indian-3',
    title: 'Smoky Dal Tadka (Tempered Yellow Lentils)',
    description: 'Comforting slow-simmered yellow split lentils finished with a sizzling aromatic ghee tempering of toasted cumin, crispy garlic, and whole dried red chilies.',
    image: dalTadkaImg,
    category: 'Soups',
    cuisine: 'Indian',
    prepTime: 10,
    cookTime: 25,
    servings: 4,
    difficulty: 'Easy',
    calories: 310,
    tags: ['Indian', 'Vegetarian', 'High Fiber', 'Gluten-Free'],
    author: 'Chef Vikram',
    createdAt: '2026-03-16T11:00:00Z',
    isFavorite: false,
    ingredients: [
      { id: 'i-ind3-1', name: 'Toor dal or yellow split moong dal', amount: 1, unit: 'cup', notes: 'rinsed until water runs clear' },
      { id: 'i-ind3-2', name: 'Ground turmeric', amount: 0.5, unit: 'tsp' },
      { id: 'i-ind3-3', name: 'Ripe tomatoes', amount: 2, unit: 'medium', notes: 'finely chopped' },
      { id: 'i-ind3-4', name: 'Yellow onion', amount: 1, unit: 'small', notes: 'finely chopped' },
      { id: 'i-ind3-5', name: 'Ghee (or coconut oil for vegan)', amount: 2.5, unit: 'tbsp' },
      { id: 'i-ind3-6', name: 'Cumin seeds', amount: 1, unit: 'tsp' },
      { id: 'i-ind3-7', name: 'Garlic cloves', amount: 5, unit: 'cloves', notes: 'thinly sliced' },
      { id: 'i-ind3-8', name: 'Dried whole red chilies', amount: 2, unit: 'chilies' },
      { id: 'i-ind3-9', name: 'Asafoetida (hing)', amount: 0.25, unit: 'tsp', notes: 'optional, adds savory depth' },
      { id: 'i-ind3-10', name: 'Fresh cilantro & lemon juice', amount: 0.25, unit: 'cup', notes: 'for finishing' },
    ],
    instructions: [
      {
        step: 1,
        instruction: 'Combine rinsed lentils, 3.5 cups water, turmeric, and 1 tsp salt in a pot. Bring to a boil, skim any foam, then cover partially and simmer on medium-low for 18 to 20 minutes until lentils are creamy and tender.',
        timerMinutes: 19,
        tip: 'Whisk the cooked lentils lightly with the back of a ladle for a silky texture.'
      },
      {
        step: 2,
        instruction: 'Stir chopped onion and tomatoes into the simmering lentils and cook for 5 minutes until softened.',
        timerMinutes: 5
      },
      {
        step: 3,
        instruction: 'In a small tempering pan (tadka pan), heat ghee over medium heat. Add cumin seeds and dried red chilies; let them sizzle for 15 seconds.',
      },
      {
        step: 4,
        instruction: 'Add thinly sliced garlic and asafoetida to the hot ghee. Cook for 45 seconds until the garlic turns crisp and golden brown.',
        timerMinutes: 1,
        tip: 'Watch the garlic closely—pull it off the heat right as edges turn golden.'
      },
      {
        step: 5,
        instruction: 'Immediately pour the sizzling aromatic ghee tempering over the bowl of warm lentils. Garnish with fresh cilantro and a squeeze of lemon juice; serve with basmati rice.'
      }
    ]
  },
  {
    id: 'recipe-indian-4',
    title: 'Crispy Masala Dosa with Coconut Chutney',
    description: 'Golden, paper-thin fermented rice and lentil crepes wrapped around turmeric-spiced potato masala, served with creamy tempered coconut chutney.',
    image: masalaDosaImg,
    category: 'Breakfast',
    cuisine: 'Indian',
    prepTime: 20,
    cookTime: 15,
    servings: 4,
    difficulty: 'Medium',
    calories: 360,
    tags: ['Indian', 'Vegetarian', 'Vegan', 'Gluten-Free'],
    author: 'Chef Meera',
    createdAt: '2026-03-16T10:30:00Z',
    isFavorite: false,
    ingredients: [
      { id: 'i-ind4-1', name: 'Fermented dosa batter', amount: 3, unit: 'cups', notes: 'rice & urad dal batter' },
      { id: 'i-ind4-2', name: 'Yukon gold potatoes', amount: 4, unit: 'medium', notes: 'boiled, peeled, and roughly mashed' },
      { id: 'i-ind4-3', name: 'Yellow onion', amount: 1, unit: 'medium', notes: 'thinly sliced' },
      { id: 'i-ind4-4', name: 'Black mustard seeds', amount: 1.5, unit: 'tsp', notes: 'divided' },
      { id: 'i-ind4-5', name: 'Fresh curry leaves', amount: 12, unit: 'leaves' },
      { id: 'i-ind4-6', name: 'Ground turmeric', amount: 0.5, unit: 'tsp' },
      { id: 'i-ind4-7', name: 'Fresh grated coconut', amount: 1, unit: 'cup', notes: 'for chutney' },
      { id: 'i-ind4-8', name: 'Roasted chana dal (split chickpeas)', amount: 2, unit: 'tbsp', notes: 'for chutney' },
      { id: 'i-ind4-9', name: 'Green chilies', amount: 2, unit: 'whole' },
      { id: 'i-ind4-10', name: 'Neutral oil or ghee', amount: 3, unit: 'tbsp' },
    ],
    instructions: [
      {
        step: 1,
        instruction: 'For the coconut chutney, blend grated coconut, roasted chana dal, 1 green chili, a pinch of salt, and 1/3 cup water until smooth. Temper with 1/2 tsp mustard seeds and half the curry leaves in 1 tsp hot oil.',
      },
      {
        step: 2,
        instruction: 'Heat 1 tbsp oil in a skillet for the potato filling. Pop 1 tsp mustard seeds, then add remaining curry leaves, sliced onion, and 1 sliced green chili. Sauté for 4 minutes until onions soften.',
        timerMinutes: 4
      },
      {
        step: 3,
        instruction: 'Stir turmeric and salt into the skillet, then fold in mashed potatoes with 2 tbsp water. Mash lightly so the filling stays moist and golden. Keep warm.',
      },
      {
        step: 4,
        instruction: 'Heat a flat cast-iron tawa or nonstick griddle over medium heat. Pour a ladleful of dosa batter in the center and spiral outward in thin circular motions to form a crisp 9-inch crepe.',
        tip: 'If the pan is too hot, sprinkle a splash of water and wipe dry before spreading batter.'
      },
      {
        step: 5,
        instruction: 'Drizzle 1 tsp oil or ghee around edges and cook for 2 minutes until golden brown and lacy. Spoon potato masala down the center, fold into a crisp cylinder, and serve hot with coconut chutney.',
        timerMinutes: 2
      }
    ]
  },
  {
    id: 'recipe-indian-5',
    title: 'Crispy Punjabi Aloo Samosas',
    description: 'Flaky, golden-brown pastry triangles spiced with ajwain seeds and stuffed with savory roasted cumin potatoes and sweet green peas, served with mint chutney.',
    image: samosasImg,
    category: 'Quick Bites',
    cuisine: 'Indian',
    prepTime: 25,
    cookTime: 20,
    servings: 6,
    difficulty: 'Medium',
    calories: 290,
    tags: ['Indian', 'Vegetarian', 'Vegan', 'Street Food'],
    author: 'Chef Kabir',
    createdAt: '2026-03-16T10:00:00Z',
    isFavorite: false,
    ingredients: [
      { id: 'i-ind5-1', name: 'All-purpose flour', amount: 2, unit: 'cups' },
      { id: 'i-ind5-2', name: 'Ajwain (carom seeds)', amount: 0.75, unit: 'tsp' },
      { id: 'i-ind5-3', name: 'Neutral oil or melted ghee', amount: 4, unit: 'tbsp', notes: 'plus oil for frying' },
      { id: 'i-ind5-4', name: 'Russet or Yukon potatoes', amount: 3, unit: 'medium', notes: 'boiled, peeled, and coarsely crumbled' },
      { id: 'i-ind5-5', name: 'Green peas', amount: 0.5, unit: 'cup' },
      { id: 'i-ind5-6', name: 'Whole coriander seeds', amount: 1, unit: 'tsp', notes: 'coarsely crushed' },
      { id: 'i-ind5-7', name: 'Cumin seeds & garam masala', amount: 1.5, unit: 'tsp' },
      { id: 'i-ind5-8', name: 'Amchur (dried mango powder)', amount: 0.75, unit: 'tsp' },
      { id: 'i-ind5-9', name: 'Fresh mint & cilantro leaves', amount: 1, unit: 'cup', notes: 'for green chutney' },
      { id: 'i-ind5-10', name: 'Fresh ginger & green chili', amount: 1, unit: 'tbsp', notes: 'finely minced' },
    ],
    instructions: [
      {
        step: 1,
        instruction: 'Rub flour, 1/2 tsp salt, ajwain seeds, and 4 tbsp oil together with fingertips until it resembles damp breadcrumbs. Gradually add cold water (about 1/3 cup) to knead a stiff, smooth dough. Cover and rest 20 minutes.',
        timerMinutes: 20,
        tip: 'A stiff dough with rubbed-in fat creates the signature blister-free flaky crust.'
      },
      {
        step: 2,
        instruction: 'Heat 1 tbsp oil in a pan. Sizzle cumin seeds and crushed coriander seeds, then sauté ginger and green chili for 30 seconds. Toss in peas, crumbled potatoes, garam masala, amchur, and salt; cook 3 minutes and cool completely.',
        timerMinutes: 3
      },
      {
        step: 3,
        instruction: 'Divide dough into 6 balls. Roll each into an oval, cut in half, and form each semicircle into a cone sealing the seam with water. Fill with potato masala and crimp top edge shut.',
      },
      {
        step: 4,
        instruction: 'Fry samosas in medium-low oil (320°F / 160°C) in small batches for 10 to 12 minutes, turning occasionally, until crisp and deep golden brown.',
        timerMinutes: 11,
        tip: 'Low-and-slow frying cooks the pastry through without blistering.'
      },
      {
        step: 5,
        instruction: 'Blend fresh mint, cilantro, a squeeze of lemon, salt, and a splash of water for bright green chutney. Serve crisp samosas warm alongside mint and tamarind chutneys.'
      }
    ]
  },
  {
    id: 'recipe-1',
    title: 'Creamy Tuscan Garlic Butter Salmon',
    description: 'Crispy pan-seared salmon fillets bathed in a rich garlic butter cream sauce with sun-dried tomatoes and baby spinach.',
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=1200&q=80',
    category: 'Mains',
    prepTime: 10,
    cookTime: 15,
    servings: 4,
    difficulty: 'Medium',
    calories: 490,
    tags: ['High Protein', 'Gluten-Free', 'Keto', 'Quick 30m'],
    author: 'Chef Lorenzo',
    createdAt: '2026-01-10T12:00:00Z',
    isFavorite: true,
    ingredients: [
      { id: 'i-1-1', name: 'Salmon fillets', amount: 4, unit: 'fillets', notes: 'skin on or off, ~150g each' },
      { id: 'i-1-2', name: 'Olive oil', amount: 2, unit: 'tbsp' },
      { id: 'i-1-3', name: 'Unsalted butter', amount: 2, unit: 'tbsp' },
      { id: 'i-1-4', name: 'Garlic cloves', amount: 4, unit: 'cloves', notes: 'finely minced' },
      { id: 'i-1-5', name: 'Heavy cream', amount: 1, unit: 'cup' },
      { id: 'i-1-6', name: 'Sun-dried tomatoes', amount: 0.5, unit: 'cup', notes: 'drained and sliced' },
      { id: 'i-1-7', name: 'Baby spinach', amount: 3, unit: 'cups', notes: 'fresh' },
      { id: 'i-1-8', name: 'Grated parmesan', amount: 0.5, unit: 'cup' },
      { id: 'i-1-9', name: 'Fresh parsley', amount: 2, unit: 'tbsp', notes: 'chopped' },
      { id: 'i-1-10', name: 'Sea salt & black pepper', amount: 1, unit: 'tsp', notes: 'to taste' },
    ],
    instructions: [
      {
        step: 1,
        instruction: 'Pat salmon fillets dry with paper towels. Season generously on both sides with salt and freshly cracked black pepper.',
        tip: 'Drying the surface thoroughly ensures a crisp, golden sear.'
      },
      {
        step: 2,
        instruction: 'Heat olive oil in a large skillet over medium-high heat until shimmering. Add salmon fillets skin-side up and sear undisturbed for 4 minutes until golden crust forms.',
        timerMinutes: 4,
        tip: 'Do not crowd the skillet; give each fillet space.'
      },
      {
        step: 3,
        instruction: 'Flip salmon carefully and cook the other side for another 3 to 4 minutes until just cooked through. Transfer to a warm plate and set aside.',
        timerMinutes: 3
      },
      {
        step: 4,
        instruction: 'Reduce heat to medium. Melt butter in the same pan, then add minced garlic. Sauté for about 1 minute until fragrant.',
        timerMinutes: 1
      },
      {
        step: 5,
        instruction: 'Pour in heavy cream and chicken broth (or water). Bring to a gentle simmer for 3 minutes, then stir in sun-dried tomatoes and parmesan until melted and silky.',
        timerMinutes: 3
      },
      {
        step: 6,
        instruction: 'Add fresh baby spinach leaves and simmer until wilted, about 2 minutes. Nest the seared salmon fillets back into the velvety sauce, spoon sauce over, and garnish with fresh parsley.',
        timerMinutes: 2
      }
    ]
  },
  {
    id: 'recipe-2',
    title: 'Authentic Roman Spaghetti Carbonara',
    description: 'The timeless classic made the traditional Italian way with crispy guanciale, pecorino romano, egg yolks, and coarse black pepper—no cream required.',
    image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?auto=format&fit=crop&w=1200&q=80',
    category: 'Pasta',
    prepTime: 10,
    cookTime: 15,
    servings: 2,
    difficulty: 'Medium',
    calories: 620,
    tags: ['Italian Classic', 'Quick 30m', 'Comfort Food'],
    author: 'Nonna Beatrice',
    createdAt: '2026-02-01T12:00:00Z',
    isFavorite: false,
    ingredients: [
      { id: 'i-2-1', name: 'Spaghetti (bronze-die cut)', amount: 250, unit: 'g' },
      { id: 'i-2-2', name: 'Guanciale or thick pancetta', amount: 120, unit: 'g', notes: 'cut into 1/4-inch lardons' },
      { id: 'i-2-3', name: 'Fresh egg yolks', amount: 3, unit: 'large yolks' },
      { id: 'i-2-4', name: 'Whole egg', amount: 1, unit: 'large' },
      { id: 'i-2-5', name: 'Pecorino Romano cheese', amount: 60, unit: 'g', notes: 'finely grated' },
      { id: 'i-2-6', name: 'Black peppercorns', amount: 1.5, unit: 'tsp', notes: 'freshly crushed' },
      { id: 'i-2-7', name: 'Kosher salt', amount: 1, unit: 'tbsp', notes: 'for pasta water' },
    ],
    instructions: [
      {
        step: 1,
        instruction: 'Bring a large pot of water to a boil. Season with salt (less than usual as guanciale and pecorino are salty). Cook spaghetti 2 minutes shy of al dente.',
        timerMinutes: 8,
        tip: 'Always reserve at least 1 cup of starchy pasta water before draining.'
      },
      {
        step: 2,
        instruction: 'In a mixing bowl, whisk egg yolks, whole egg, grated Pecorino Romano, and a generous heap of freshly cracked black pepper into a smooth, thick paste.',
      },
      {
        step: 3,
        instruction: 'In a cold skillet, add the guanciale pieces. Turn heat to medium-low and cook slowly for 7 to 9 minutes until the fat renders out and meat becomes golden and crispy.',
        timerMinutes: 8
      },
      {
        step: 4,
        instruction: 'Turn off skillet heat. Transfer hot drained spaghetti directly into the guanciale pan, tossing vigorously in the rendered savory fat for 1 minute.',
      },
      {
        step: 5,
        instruction: 'Allow pan to cool slightly for 30 seconds (to avoid scrambling eggs). Pour in egg and cheese mixture along with 3-4 tablespoons of hot pasta water, tossing swiftly to form a glossy, emulsified cream.',
        tip: 'The residual heat of the pasta thickens the egg sauce safely into a mirror-like glaze.'
      },
      {
        step: 6,
        instruction: 'Serve immediately onto warm bowls with additional Pecorino Romano and cracked black pepper.'
      }
    ]
  },
  {
    id: 'recipe-3',
    title: 'Avocado Tartine with Soft Poached Egg',
    description: 'Crispy artisanal sourdough rubbed with garlic, topped with creamy citrus avocado mash, soft poached eggs, everything seasoning, and microgreens.',
    image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=1200&q=80',
    category: 'Breakfast',
    prepTime: 8,
    cookTime: 7,
    servings: 2,
    difficulty: 'Easy',
    calories: 340,
    tags: ['Vegetarian', 'Quick 15m', 'Breakfast', 'High Fiber'],
    author: 'Chef Chloe',
    createdAt: '2026-02-14T10:00:00Z',
    isFavorite: true,
    ingredients: [
      { id: 'i-3-1', name: 'Sourdough bread slices', amount: 2, unit: 'thick slices' },
      { id: 'i-3-2', name: 'Ripe Hass avocados', amount: 2, unit: 'whole' },
      { id: 'i-3-3', name: 'Fresh free-range eggs', amount: 2, unit: 'eggs' },
      { id: 'i-3-4', name: 'Fresh lime or lemon juice', amount: 1, unit: 'tbsp' },
      { id: 'i-3-5', name: 'Garlic clove', amount: 1, unit: 'clove', notes: 'peeled and halved' },
      { id: 'i-3-6', name: 'Extra virgin olive oil', amount: 1, unit: 'tbsp' },
      { id: 'i-3-7', name: 'Red pepper flakes & Everything bagel seasoning', amount: 1, unit: 'tsp' },
      { id: 'i-3-8', name: 'Flaky sea salt (Maldon)', amount: 0.5, unit: 'tsp' },
    ],
    instructions: [
      {
        step: 1,
        instruction: 'In a shallow bowl, scoop out avocado flesh. Mash with lime juice, a drizzle of olive oil, salt, and pepper until creamy yet slightly rustic.',
      },
      {
        step: 2,
        instruction: 'Bring a saucepan with 3 inches of water and 1 tsp white vinegar to a gentle simmer. Create a gentle whirlpool in center and slide in cracked egg. Poach for 3 minutes for a runny golden yolk.',
        timerMinutes: 3,
        tip: 'Vinegar helps the egg white coagulate quickly around the yolk.'
      },
      {
        step: 3,
        instruction: 'Toast sourdough slices until deeply golden and crunchy. While piping hot, rub cut garlic clove across the crust for subtle aroma.',
      },
      {
        step: 4,
        instruction: 'Spread the generous avocado mash over both toasts. Carefully place drained poached egg on top. Finish with flaky salt, red chili flakes, and everything seasoning.'
      }
    ]
  },
  {
    id: 'recipe-4',
    title: 'Thai Basil Chicken (Pad Krapow Gai)',
    description: 'An explosive street-food staple featuring minced chicken stir-fried with fragrant holy basil, garlic, thai chilies, and a crispy fried sunny egg.',
    image: 'https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?auto=format&fit=crop&w=1200&q=80',
    category: 'Mains',
    prepTime: 10,
    cookTime: 10,
    servings: 2,
    difficulty: 'Easy',
    calories: 420,
    tags: ['Spicy', 'High Protein', 'Quick 20m', 'Asian'],
    author: 'Chef Somchai',
    createdAt: '2026-03-01T12:00:00Z',
    isFavorite: false,
    ingredients: [
      { id: 'i-4-1', name: 'Ground chicken thigh or breast', amount: 350, unit: 'g' },
      { id: 'i-4-2', name: 'Thai holy basil or sweet basil', amount: 2, unit: 'cups', notes: 'loosely packed leaves' },
      { id: 'i-4-3', name: 'Garlic cloves', amount: 6, unit: 'cloves', notes: 'smashed' },
      { id: 'i-4-4', name: 'Thai bird eye chilies', amount: 3, unit: 'chilies', notes: 'sliced (adjust to spice tolerance)' },
      { id: 'i-4-5', name: 'Oyster sauce', amount: 1.5, unit: 'tbsp' },
      { id: 'i-4-6', name: 'Light soy sauce', amount: 1, unit: 'tbsp' },
      { id: 'i-4-7', name: 'Dark sweet soy sauce', amount: 1, unit: 'tsp' },
      { id: 'i-4-8', name: 'Fish sauce', amount: 1, unit: 'tsp' },
      { id: 'i-4-9', name: 'Brown sugar', amount: 0.5, unit: 'tsp' },
      { id: 'i-4-10', name: 'Cooking oil', amount: 2, unit: 'tbsp' },
    ],
    instructions: [
      {
        step: 1,
        instruction: 'In a mortar and pestle, coarsely pound garlic and thai chilies together into a rustic aromatic paste.',
      },
      {
        step: 2,
        instruction: 'In a small bowl, whisk together oyster sauce, light soy sauce, dark sweet soy sauce, fish sauce, sugar, and 1 tbsp water for the stir-fry sauce.',
      },
      {
        step: 3,
        instruction: 'Heat a wok over high heat with oil until smoking hot. Add pounded chili and garlic paste; stir-fry for 30 seconds until intensely aromatic.',
        timerMinutes: 1
      },
      {
        step: 4,
        instruction: 'Toss in minced chicken. Break it apart rapidly with spatula, cooking for 3 to 4 minutes until no longer pink and beginning to brown.',
        timerMinutes: 4
      },
      {
        step: 5,
        instruction: 'Pour in the sauce mixture and toss everything on high heat for 1 minute until sauce glazes the chicken.',
        timerMinutes: 1
      },
      {
        step: 6,
        instruction: 'Turn off heat. Immediately fold in fresh basil leaves; allow residual wok heat to wilt the leaves into a vibrant green hue. Serve over warm jasmine rice with a crispy fried egg.'
      }
    ]
  },
  {
    id: 'recipe-5',
    title: 'Creamy Roasted Tomato Basil Soup',
    description: 'Slow-roasted vine tomatoes, sweet garlic, caramelized shallots, and fresh basil puréed into a comforting, velvety soup with melted grilled cheese dippers.',
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=1200&q=80',
    category: 'Soups',
    prepTime: 12,
    cookTime: 35,
    servings: 4,
    difficulty: 'Easy',
    calories: 280,
    tags: ['Comfort Food', 'Vegetarian', 'Gluten-Free', 'Soup'],
    author: 'Chef Elena',
    createdAt: '2026-03-05T09:00:00Z',
    isFavorite: true,
    ingredients: [
      { id: 'i-5-1', name: 'Ripe vine tomatoes', amount: 1, unit: 'kg', notes: 'halved' },
      { id: 'i-5-2', name: 'Whole head of garlic', amount: 1, unit: 'head', notes: 'top sliced off' },
      { id: 'i-5-3', name: 'Shallots', amount: 2, unit: 'whole', notes: 'peeled and halved' },
      { id: 'i-5-4', name: 'Olive oil', amount: 3, unit: 'tbsp' },
      { id: 'i-5-5', name: 'Vegetable broth', amount: 2.5, unit: 'cups' },
      { id: 'i-5-6', name: 'Fresh basil leaves', amount: 1, unit: 'cup', notes: 'packed' },
      { id: 'i-5-7', name: 'Heavy cream or coconut cream', amount: 0.5, unit: 'cup' },
      { id: 'i-5-8', name: 'Dried oregano & red pepper flakes', amount: 1, unit: 'tsp' },
      { id: 'i-5-9', name: 'Sea salt and black pepper', amount: 1, unit: 'tsp', notes: 'to taste' },
    ],
    instructions: [
      {
        step: 1,
        instruction: 'Preheat oven to 400°F (200°C). Arrange tomato halves and shallots on a parchment-lined baking sheet cut side up. Drizzle garlic head with olive oil and wrap in foil.',
      },
      {
        step: 2,
        instruction: 'Drizzle tomatoes with olive oil, sprinkle with oregano, red pepper flakes, salt, and black pepper. Roast in oven for 30 minutes until blistered and caramelized at edges.',
        timerMinutes: 30,
        tip: 'Caramelization intensifies the natural sweetness of tomatoes.'
      },
      {
        step: 3,
        instruction: 'Squeeze the roasted soft garlic cloves out of their paper skins. Transfer roasted tomatoes, juices, shallots, and garlic into a heavy-bottom soup pot.',
      },
      {
        step: 4,
        instruction: 'Add vegetable broth and fresh basil. Bring to a gentle simmer for 5 minutes, then use an immersion blender until velvety smooth.',
        timerMinutes: 5
      },
      {
        step: 5,
        instruction: 'Stir in heavy cream and adjust salt and pepper to taste. Serve hot with a swirl of cream, fresh basil chiffonade, and warm crusty bread.'
      }
    ]
  },
  {
    id: 'recipe-6',
    title: 'Mediterranean Crisp Chickpea & Feta Bowl',
    description: 'A vibrant, nutrient-dense lunch bowl with crunchy spiced chickpeas, Persian cucumbers, Kalamata olives, creamy feta, and lemon-herb vinaigrette.',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1200&q=80',
    category: 'Salads & Bowls',
    prepTime: 15,
    cookTime: 15,
    servings: 2,
    difficulty: 'Easy',
    calories: 390,
    tags: ['Vegetarian', 'High Fiber', 'Gluten-Free', 'Healthy'],
    author: 'Chef Maya',
    createdAt: '2026-03-10T11:00:00Z',
    isFavorite: false,
    ingredients: [
      { id: 'i-6-1', name: 'Canned chickpeas', amount: 1, unit: 'can (400g)', notes: 'rinsed and thoroughly dried' },
      { id: 'i-6-2', name: 'Persian cucumbers', amount: 2, unit: 'cucumbers', notes: 'diced' },
      { id: 'i-6-3', name: 'Cherry tomatoes', amount: 1, unit: 'cup', notes: 'halved' },
      { id: 'i-6-4', name: 'Kalamata olives', amount: 0.5, unit: 'cup', notes: 'pitted' },
      { id: 'i-6-5', name: 'Crumbled Greek feta cheese', amount: 80, unit: 'g' },
      { id: 'i-6-6', name: 'Ground cumin, smoked paprika & oregano', amount: 1.5, unit: 'tsp' },
      { id: 'i-6-7', name: 'Extra virgin olive oil', amount: 3, unit: 'tbsp' },
      { id: 'i-6-8', name: 'Lemon juice', amount: 2, unit: 'tbsp' },
      { id: 'i-6-9', name: 'Fresh mint and parsley', amount: 0.25, unit: 'cup', notes: 'chopped' },
    ],
    instructions: [
      {
        step: 1,
        instruction: 'Toss dry chickpeas with 1 tbsp olive oil, cumin, smoked paprika, salt, and pepper.',
      },
      {
        step: 2,
        instruction: 'Pan-fry chickpeas in a hot skillet for 10 to 12 minutes shaking frequently until golden and crunchy, or roast in an air fryer at 390°F.',
        timerMinutes: 12,
        tip: 'Drying chickpeas with a kitchen towel before cooking is key to crispiness.'
      },
      {
        step: 3,
        instruction: 'Whisk remaining olive oil, fresh lemon juice, oregano, salt, and pepper in a small mason jar to create the bright vinaigrette.',
      },
      {
        step: 4,
        instruction: 'In serving bowls, layer diced cucumbers, juicy cherry tomatoes, olives, and crispy warm chickpeas. Top with crumbled feta and fresh herbs, then drizzle with dressing.'
      }
    ]
  },
  {
    id: 'recipe-7',
    title: 'Molten Dark Chocolate Sea Salt Lava Cakes',
    description: 'Decadent individual chocolate cakes with delicate cake edges that give way to a warm, flowing center of melted dark chocolate, dusted with sea salt flakes.',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=1200&q=80',
    category: 'Dessert',
    prepTime: 15,
    cookTime: 12,
    servings: 2,
    difficulty: 'Medium',
    calories: 450,
    tags: ['Dessert', 'Baking', 'Chocolate', 'Indulgent'],
    author: 'Patissier Julien',
    createdAt: '2026-03-12T14:00:00Z',
    isFavorite: true,
    ingredients: [
      { id: 'i-7-1', name: 'Bittersweet dark chocolate (70%)', amount: 100, unit: 'g', notes: 'chopped' },
      { id: 'i-7-2', name: 'Unsalted butter', amount: 60, unit: 'g' },
      { id: 'i-7-3', name: 'Confectioners sugar or cane sugar', amount: 50, unit: 'g' },
      { id: 'i-7-4', name: 'Large eggs', amount: 1, unit: 'whole egg' },
      { id: 'i-7-5', name: 'Large egg yolk', amount: 1, unit: 'yolk' },
      { id: 'i-7-6', name: 'All-purpose flour', amount: 2, unit: 'tbsp' },
      { id: 'i-7-7', name: 'Pure vanilla extract', amount: 0.5, unit: 'tsp' },
      { id: 'i-7-8', name: 'Flaky Maldon sea salt', amount: 0.5, unit: 'tsp' },
      { id: 'i-7-9', name: 'Cocoa powder', amount: 1, unit: 'tbsp', notes: 'for dusting ramekins' },
    ],
    instructions: [
      {
        step: 1,
        instruction: 'Preheat oven to 425°F (220°C). Generously butter two 6-oz ceramic ramekins and dust inside with cocoa powder, tapping out any excess.',
        tip: 'Cocoa powder ensures cakes slide out cleanly without white flour residue.'
      },
      {
        step: 2,
        instruction: 'Melt chopped dark chocolate and butter together in a heatproof bowl set over simmering water (or microwave in 20-second bursts), stirring until silky smooth.',
        timerMinutes: 2
      },
      {
        step: 3,
        instruction: 'In another bowl, whisk egg, egg yolk, sugar, and vanilla until pale and slightly thick. Gently fold in melted chocolate mixture, followed by the flour until just combined.',
      },
      {
        step: 4,
        instruction: 'Divide batter evenly between prepared ramekins. Bake for exactly 11 to 12 minutes until sides are set and center is soft to the touch.',
        timerMinutes: 12,
        tip: 'Do not overbake! A toothpick in the center should come out wet with molten chocolate.'
      },
      {
        step: 5,
        instruction: 'Let rest for 1 minute. Run a thin knife around edges and invert onto dessert plates. Sprinkle with flaky sea salt and serve immediately with vanilla bean ice cream.'
      }
    ]
  },
  {
    id: 'recipe-8',
    title: '15-Minute Garlic Butter Shrimp Scampi',
    description: 'Plump succulent shrimp sauteed with garlic, white wine, lemon juice, and red pepper flakes, tossed with fresh herbs over buttered noodles or crusty bread.',
    image: 'https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=1200&q=80',
    category: 'Quick Bites',
    prepTime: 5,
    cookTime: 10,
    servings: 3,
    difficulty: 'Easy',
    calories: 310,
    tags: ['Quick 15m', 'Seafood', 'Keto Friendly', 'High Protein'],
    author: 'Chef Marco',
    createdAt: '2026-03-14T15:00:00Z',
    isFavorite: false,
    ingredients: [
      { id: 'i-8-1', name: 'Large raw shrimp', amount: 450, unit: 'g', notes: 'peeled and deveined' },
      { id: 'i-8-2', name: 'Garlic cloves', amount: 5, unit: 'cloves', notes: 'thinly sliced' },
      { id: 'i-8-3', name: 'Dry white wine or broth', amount: 0.33, unit: 'cup' },
      { id: 'i-8-4', name: 'Fresh lemon juice', amount: 2, unit: 'tbsp' },
      { id: 'i-8-5', name: 'Unsalted butter', amount: 3, unit: 'tbsp', notes: 'cut into cubes' },
      { id: 'i-8-6', name: 'Extra virgin olive oil', amount: 1, unit: 'tbsp' },
      { id: 'i-8-7', name: 'Crushed red pepper flakes', amount: 0.5, unit: 'tsp' },
      { id: 'i-8-8', name: 'Fresh flat-leaf parsley', amount: 0.25, unit: 'cup', notes: 'chopped' },
    ],
    instructions: [
      {
        step: 1,
        instruction: 'Season peeled shrimp lightly with sea salt and black pepper.',
      },
      {
        step: 2,
        instruction: 'Heat olive oil and 1 tbsp butter in a large skillet over medium-high heat. Add shrimp in a single layer and sear for 1.5 minutes per side until pink and opaque.',
        timerMinutes: 3,
        tip: 'Remove shrimp immediately once curled to maintain tender, juicy texture.'
      },
      {
        step: 3,
        instruction: 'Transfer shrimp to a plate. In same skillet, add sliced garlic and red pepper flakes; sauté for 30 seconds until fragrant.',
      },
      {
        step: 4,
        instruction: 'Pour in white wine and lemon juice, scraping up delicious browned bits from the pan. Simmer vigorously for 2 minutes until liquid reduces by half.',
        timerMinutes: 2
      },
      {
        step: 5,
        instruction: 'Turn heat down to low and whisk in remaining cold butter until sauce is glossy and emulsified. Return shrimp to pan, toss with fresh parsley, and serve immediately.'
      }
    ]
  }
];
