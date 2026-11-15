/**
 * Formats a scaled ingredient amount into culinary friendly fractions or rounded decimals.
 */
export function formatAmount(amount: number | null | undefined): string {
  if (amount === null || amount === undefined || isNaN(amount)) return '';
  if (amount === 0) return '0';

  // If very close to an integer
  const roundedInt = Math.round(amount);
  if (Math.abs(amount - roundedInt) < 0.04) {
    return roundedInt.toString();
  }

  const wholePart = Math.floor(amount);
  const fracPart = amount - wholePart;

  const fractions: [number, string][] = [
    [0.125, '1/8'],
    [0.25, '1/4'],
    [0.333, '1/3'],
    [0.375, '3/8'],
    [0.5, '1/2'],
    [0.625, '5/8'],
    [0.667, '2/3'],
    [0.75, '3/4'],
    [0.875, '7/8'],
  ];

  for (const [val, label] of fractions) {
    if (Math.abs(fracPart - val) < 0.05) {
      return wholePart > 0 ? `${wholePart} ${label}` : label;
    }
  }

  // Fallback to max 1 decimal place
  return (Math.round(amount * 10) / 10).toString();
}

/**
 * Guesses grocery department category from ingredient name
 */
export function guessCategory(name: string): 'Produce' | 'Pantry' | 'Dairy & Eggs' | 'Meat & Seafood' | 'Bakery' | 'Spices' | 'Other' {
  const lower = name.toLowerCase();

  if (
    lower.includes('tomato') || lower.includes('onion') || lower.includes('garlic') ||
    lower.includes('lemon') || lower.includes('lime') || lower.includes('avocado') ||
    lower.includes('spinach') || lower.includes('mushroom') || lower.includes('basil') ||
    lower.includes('cilantro') || lower.includes('coriander leaves') || lower.includes('mint') ||
    lower.includes('curry leaves') || lower.includes('chili') || lower.includes('chilli') ||
    (lower.includes('pepper') && !lower.includes('black pepper')) || lower.includes('kale') ||
    lower.includes('potato') || lower.includes('carrot') || lower.includes('ginger') ||
    lower.includes('pea') || lower.includes('berry') || lower.includes('apple') ||
    lower.includes('salad')
  ) {
    return 'Produce';
  }

  if (
    lower.includes('chicken') || lower.includes('salmon') || lower.includes('beef') ||
    lower.includes('pork') || lower.includes('shrimp') || lower.includes('turkey') ||
    lower.includes('fish') || lower.includes('bacon') || lower.includes('pancetta') ||
    lower.includes('lamb') || lower.includes('mutton')
  ) {
    return 'Meat & Seafood';
  }

  if (
    lower.includes('milk') || lower.includes('butter') || lower.includes('cheese') ||
    lower.includes('cream') || lower.includes('egg') || lower.includes('parmesan') ||
    lower.includes('yogurt') || lower.includes('feta') || lower.includes('mozzarella') ||
    lower.includes('paneer') || lower.includes('ghee') || lower.includes('curd')
  ) {
    return 'Dairy & Eggs';
  }

  if (
    lower.includes('bread') || lower.includes('sourdough') || lower.includes('bun') ||
    lower.includes('baguette') || lower.includes('pita') || lower.includes('tortilla') ||
    lower.includes('naan') || lower.includes('roti') || lower.includes('paratha')
  ) {
    return 'Bakery';
  }

  if (
    lower.includes('salt') || lower.includes('black pepper') || lower.includes('oregano') ||
    lower.includes('paprika') || lower.includes('cumin') || lower.includes('cinnamon') ||
    lower.includes('thyme') || lower.includes('rosemary') || lower.includes('spice') ||
    lower.includes('vanilla') || lower.includes('garam masala') || lower.includes('turmeric') ||
    lower.includes('cardamom') || lower.includes('coriander') || lower.includes('fenugreek') ||
    lower.includes('kasuri methi') || lower.includes('mustard seed') || lower.includes('asafoetida') ||
    lower.includes('hing') || lower.includes('clove') || lower.includes('bay lea') ||
    lower.includes('carom') || lower.includes('ajwain') || lower.includes('amchur') ||
    lower.includes('chaat masala') || lower.includes('kashmiri')
  ) {
    return 'Spices';
  }

  if (
    lower.includes('oil') || lower.includes('flour') || lower.includes('sugar') ||
    lower.includes('pasta') || lower.includes('spaghetti') || lower.includes('rice') ||
    lower.includes('stock') || lower.includes('broth') || lower.includes('soy sauce') ||
    lower.includes('vinegar') || lower.includes('honey') || lower.includes('chocolate') ||
    lower.includes('chickpea') || lower.includes('bean') || lower.includes('sauce') ||
    lower.includes('lentil') || lower.includes('dal') || lower.includes('basmati') ||
    lower.includes('cashew') || lower.includes('tamarind') || lower.includes('coconut') ||
    lower.includes('semolina')
  ) {
    return 'Pantry';
  }

  return 'Other';
}
