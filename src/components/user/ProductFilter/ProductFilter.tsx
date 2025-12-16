import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Sliders, Palette } from 'lucide-react';

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
  const { t } = useTranslation();
  
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
    <>
      <style>
        {`
          .price-slider {
            -webkit-appearance: none;
            appearance: none;
            width: 100%;
            height: 6px;
            background: linear-gradient(to right, #DDB892, #B08968);
            border-radius: 999px;
            outline: none;
          }

          .price-slider::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            width: 20px;
            height: 20px;
            background: linear-gradient(135deg, #9C6644, #7F5539);
            border-radius: 50%;
            cursor: pointer;
            box-shadow: 0 2px 8px rgba(156, 102, 68, 0.4);
            transition: all 0.2s ease;
          }

          .price-slider::-webkit-slider-thumb:hover {
            transform: scale(1.15);
            box-shadow: 0 4px 12px rgba(156, 102, 68, 0.6);
          }

          .price-slider::-moz-range-thumb {
            width: 20px;
            height: 20px;
            background: linear-gradient(135deg, #9C6644, #7F5539);
            border-radius: 50%;
            cursor: pointer;
            border: none;
            box-shadow: 0 2px 8px rgba(156, 102, 68, 0.4);
            transition: all 0.2s ease;
          }

          .price-slider::-moz-range-thumb:hover {
            transform: scale(1.15);
            box-shadow: 0 4px 12px rgba(156, 102, 68, 0.6);
          }
        `}
      </style>
      <aside className="w-80 shrink-0">
        <div className="relative">
          {/* Glow effect */}
          <div className="absolute -inset-1 bg-linear-to-br from-rustic_bronze/20 to-clay_brown/10 rounded-3xl blur-xl opacity-70" />
          
          {/* Main card */}
          <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-7 border-2 border-warm_caramel/30 sticky top-24">
            {/* Header */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b-2 border-warm_caramel/20">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-linear-to-br from-rustic_bronze/20 to-clay_brown/10 rounded-xl">
                  <Sliders className="w-5 h-5 text-rustic_bronze" />
                </div>
                <h3 className="subheading3 font-bold text-dark_wood">{t('filters.title') || 'Filters'}</h3>
              </div>
              {hasActiveFilters && (
                <button
                  onClick={clearAllFilters}
                  className="microcontent font-semi-bold text-rustic_bronze hover:text-deep_walnut transition-colors duration-200 hover:underline"
                >
                  {t('filters.clearAll') || 'Clear All'}
                </button>
              )}
            </div>

            {/* Price Range Section */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-1 h-5 bg-linear-to-b from-rustic_bronze to-clay_brown rounded-full" />
                <h4 className="minicontent font-bold text-dark_wood">{t('filters.priceRange') || 'Price Range'}</h4>
              </div>
              <div className="space-y-4">
                {/* Price Display */}
                <div className="flex items-center justify-between gap-3">
                  <div className="flex-1 bg-linear-to-br from-ivory_sand to-soft_latte rounded-xl p-3 border border-warm_caramel/30">
                    <div className="text-xs text-deep_walnut/60 mb-1">{t('filters.min') || 'Min'}</div>
                    <div className="font-bold text-rustic_bronze">${priceRange[0]}</div>
                  </div>
                  <div className="w-8 h-0.5 bg-linear-to-r from-warm_caramel to-clay_brown rounded-full" />
                  <div className="flex-1 bg-linear-to-br from-ivory_sand to-soft_latte rounded-xl p-3 border border-warm_caramel/30">
                    <div className="text-xs text-deep_walnut/60 mb-1">{t('filters.max') || 'Max'}</div>
                    <div className="font-bold text-rustic_bronze">${priceRange[1]}</div>
                  </div>
                </div>
                
                {/* Slider */}
                <div className="relative pt-2 pb-1">
                  <input
                    type="range"
                    min={priceMinMax.min}
                    max={priceMinMax.max}
                    value={priceRange[1]}
                    onChange={(e) => onPriceChange([priceRange[0], parseInt(e.target.value)])}
                    className="price-slider"
                  />
                </div>
              </div>
            </div>

            {/* Colors Section */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-1 h-5 bg-linear-to-b from-rustic_bronze to-clay_brown rounded-full" />
                <div className="flex items-center gap-2">
                  <Palette className="w-4 h-4 text-rustic_bronze" />
                  <h4 className="minicontent font-bold text-dark_wood">{t('filters.colors') || 'Colors'}</h4>
                </div>
              </div>
              {availableColors.length > 0 ? (
                <div className="grid grid-cols-5 gap-3">
                  {availableColors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => onColorChange(selectedColor === color.name ? '' : color.name)}
                      className={`relative w-12 h-12 rounded-full border-3 transition-all duration-300 group ${
                        selectedColor === color.name
                          ? 'border-rustic_bronze scale-110 shadow-lg ring-4 ring-rustic_bronze/30'
                          : 'border-warm_caramel/40 hover:scale-105 hover:border-clay_brown'
                      }`}
                      style={{ backgroundColor: getColorHex(color.name) }}
                      title={`${color.name} (${color.count})`}
                    >
                      {selectedColor === color.name && (
                        <span className="absolute inset-0 flex items-center justify-center">
                          <svg className="w-6 h-6 text-white drop-shadow-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </span>
                      )}
                      {/* Hover glow */}
                      <div className="absolute -inset-1 bg-linear-to-br from-rustic_bronze/30 to-clay_brown/20 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
                    </button>
                  ))}
                </div>
              ) : (
                  <div className="flex flex-col items-center justify-center py-8 px-4 bg-linear-to-br from-ivory_sand to-soft_latte rounded-2xl border-2 border-warm_caramel/30">
                <div className="w-16 h-16 mb-3 rounded-full bg-white shadow-md flex items-center justify-center ring-4 ring-warm_caramel/20">
                  <Palette className="w-8 h-8 text-rustic_bronze" />
                </div>
                <p className="text-deep_walnut/80 font-semi-bold text-sm text-center">{t('filters.noColorsAvailable') || 'No colors available'}</p>
              </div>
              )}
            </div>

            {/* Decorative corner accent */}
            <div className="absolute top-0 right-0 w-20 h-20 bg-linear-to-bl from-warm_caramel/15 to-transparent rounded-tr-3xl pointer-events-none" />
          </div>
        </div>
      </aside>
    </>
  );
}
