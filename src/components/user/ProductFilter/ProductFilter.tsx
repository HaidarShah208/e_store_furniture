import { useMemo } from 'react';

// Color name to hex code mapping
const colorMap: Record<string, string> = {
  'Beige': '#F5F5DC',
  'Black': '#000000',
  'Brown': '#8B4513',
  'Blue': '#0000FF',
  'Green': '#008000',
  'Grey': '#808080',
  'Gray': '#808080',
  'Yellow': '#FFFF00',
  'Natural Wood': '#D2B48C',
  'Natural Pine': '#D2B48C',
  'Natural': '#D2B48C',
  'White': '#FFFFFF',
  'Red': '#FF0000',
  'Orange': '#FFA500',
  'Purple': '#800080',
  'Pink': '#FFC0CB',
  'Navy': '#000080',
  'Teal': '#008080',
  'Cream': '#FFFDD0',
  'Tan': '#D2B48C',
  'Charcoal': '#36454F',
  'Ivory': '#FFFFF0',
  'Burgundy': '#800020',
  'Maroon': '#800000',
  'Olive': '#808000',
  'Lime': '#00FF00',
  'Cyan': '#00FFFF',
  'Magenta': '#FF00FF',
  'Silver': '#C0C0C0',
  'Gold': '#FFD700',
  'Bronze': '#CD7F32',
  'Copper': '#B87333'
};

type PriceRange = [number, number];

interface ColorOption {
  name: string;
  count: number;
}

interface ProductFilterProps {
  priceRange: PriceRange;
  priceMinMax: { min: number; max: number };
  onPriceChange: (range: PriceRange) => void;
  selectedColor: string;
  onColorChange: (color: string) => void;
  availableColors: ColorOption[];
}

export default function ProductFilter({
  priceRange,
  priceMinMax,
  onPriceChange,
  selectedColor,
  onColorChange,
  availableColors
}: ProductFilterProps) {
  
  const getColorHex = (colorName: string): string => {
    return colorMap[colorName] || '#CCCCCC';
  };

  // Check if filters are active
  const hasActiveFilters = useMemo(() => {
    const isPriceChanged = priceRange[0] !== priceMinMax.min || priceRange[1] !== priceMinMax.max;
    return isPriceChanged || selectedColor !== '';
  }, [priceRange, priceMinMax, selectedColor]);

  const clearAllFilters = () => {
    onPriceChange([priceMinMax.min, priceMinMax.max]);
    onColorChange('');
  };

  return (
    <aside className="w-80 shrink-0">
      <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
        <div className="flex items-center justify-between mb-6">
          <h3 className="subtitle font-petit text-primary5">Filters</h3>
          {hasActiveFilters && (
            <button
              onClick={clearAllFilters}
              className="microcontent font-seraphine text-primary4 hover:text-primary5 transition-colors"
            >
              Clear All
            </button>
          )}
        </div>

        {/* Price Range */}
        <div className="mb-8">
          <h4 className="minicontent font-seraphine font-semibold text-primary5 mb-4">Price Range</h4>
          <div className="space-y-4">
            <div className="relative">
              <input
                type="range"
                min={priceMinMax.min}
                max={priceMinMax.max}
                value={priceRange[1]}
                onChange={(e) => onPriceChange([priceRange[0], parseInt(e.target.value)])}
                className="w-full"
              />
            </div>
            <div className="flex items-center justify-between font-seraphine microcontent text-primary5">
              <span>${priceRange[0]}</span>
              <span>${priceRange[1]}</span>
            </div>
          </div>
        </div>

        {/* Colors */}
        <div className="mb-8">
          <h4 className="minicontent font-seraphine font-semibold text-primary5 mb-4">Colors</h4>
          {availableColors.length > 0 ? (
            <div className="grid grid-cols-5 gap-3">
              {availableColors.map((color) => (
                <button
                  key={color.name}
                  onClick={() => onColorChange(selectedColor === color.name ? '' : color.name)}
                  className={`w-12 h-12 rounded-full border-2 transition-all duration-300 ${
                    selectedColor === color.name
                      ? 'border-primary5 scale-110 shadow-lg'
                      : 'border-primary2 hover:scale-105'
                  }`}
                  style={{ backgroundColor: getColorHex(color.name) }}
                  title={`${color.name} (${color.count})`}
                >
                  {selectedColor === color.name && (
                    <span className="text-white text-xs">✓</span>
                  )}
                </button>
              ))}
            </div>
          ) : (
              <div className="flex flex-col items-center justify-center py-8 px-4">
            <div className="w-16 h-16 mb-3 rounded-full bg-primary1 flex items-center justify-center">
              <svg className="w-8 h-8 text-primary3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
              </svg>
            </div>
            <p className="text-primary4 font-medium mb-1">No Colors Available</p>
          </div>
          )}
        </div>
      </div>
    </aside>
  );
}
