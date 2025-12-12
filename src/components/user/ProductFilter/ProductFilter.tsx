import { useMemo } from 'react';
import './ProductFilter.css';

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

  const handleMinPriceChange = (value: number) => {
    const newMin = Math.min(value, priceRange[1] - 1);
    onPriceChange([newMin, priceRange[1]]);
  };

  const handleMaxPriceChange = (value: number) => {
    const newMax = Math.max(value, priceRange[0] + 1);
    onPriceChange([priceRange[0], newMax]);
  };

  // Calculate percentage positions for the range slider
  const minPercent = useMemo(() => {
    if (priceMinMax.max === priceMinMax.min) return 0;
    return ((priceRange[0] - priceMinMax.min) / (priceMinMax.max - priceMinMax.min)) * 100;
  }, [priceRange, priceMinMax]);

  const maxPercent = useMemo(() => {
    if (priceMinMax.max === priceMinMax.min) return 100;
    return ((priceRange[1] - priceMinMax.min) / (priceMinMax.max - priceMinMax.min)) * 100;
  }, [priceRange, priceMinMax]);

  return (
    <aside className="product-filter">
      {/* Price Filter Section */}
      <div className="filter-section">
        <h3 className="filter-title">Price Range</h3>
        
        <div className="price-range-container">
          <div className="price-slider-track">
            <div 
              className="price-slider-range"
              style={{
                left: `${minPercent}%`,
                width: `${maxPercent - minPercent}%`
              }}
            />
          </div>
          
          {/* Min Range Input */}
          <input
            type="range"
            min={priceMinMax.min}
            max={priceMinMax.max}
            value={priceRange[0]}
            onChange={(e) => handleMinPriceChange(Number(e.target.value))}
            className="range-input range-min"
          />
          
          {/* Max Range Input */}
          <input
            type="range"
            min={priceMinMax.min}
            max={priceMinMax.max}
            value={priceRange[1]}
            onChange={(e) => handleMaxPriceChange(Number(e.target.value))}
            className="range-input range-max"
          />
        </div>

        <div className="price-display">
          <div>
            <span className="price-label">Min: </span>
            <span className="price-value">${priceRange[0].toFixed(0)}</span>
          </div>
          <div>
            <span className="price-label">Max: </span>
            <span className="price-value">${priceRange[1].toFixed(0)}</span>
          </div>
        </div>
      </div>

      {/* Color Filter Section */}
      <div className="filter-section">
        <h3 className="filter-title">Filter by Color</h3>
        
        {availableColors.length > 0 ? (
          <>
            <div className="color-list">
              {availableColors.map((color) => (
                <div
                  key={color.name}
                  className={`color-option ${selectedColor === color.name ? 'active' : ''}`}
                  onClick={() => onColorChange(selectedColor === color.name ? '' : color.name)}
                >
                  <div className="color-info">
                    <div
                      className="color-swatch"
                      style={{ backgroundColor: getColorHex(color.name) }}
                    />
                    <span className="color-name">{color.name}</span>
                  </div>
                  <span className="color-count">{color.count}</span>
                </div>
              ))}
            </div>
            
            {selectedColor && (
              <button
                onClick={() => onColorChange('')}
                className="clear-filter-btn"
              >
                Clear Color Filter
              </button>
            )}
          </>
        ) : (
          <p className="no-colors">No colors available</p>
        )}
      </div>
    </aside>
  );
}
