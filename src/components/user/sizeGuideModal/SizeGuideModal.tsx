import { X, Ruler } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: {
    title: string;
    type: string;
    sizes: string[];
  } | null;
}

export default function SizeGuideModal({ isOpen, onClose, product }: SizeGuideModalProps) {
  const { t } = useTranslation();
  if (!isOpen || !product) return null;

  // Get dimensions based on product type and size
  const getDimensions = (productType: string, size: string) => {
    const dimensions: Record<string, Record<string, { width: string; height: string; depth?: string }>> = {
      'Chair': {
        'Standard': { width: '24"', height: '32"', depth: '22"' },
        'Large': { width: '26"', height: '34"', depth: '24"' }
      },
      'Sofa': {
        '2-Seater': { width: '60"', height: '32"', depth: '36"' },
        '3-Seater': { width: '84"', height: '32"', depth: '36"' },
        '4-Seater': { width: '108"', height: '32"', depth: '36"' }
      },
      'Table': {
        '4-Person': { width: '48"', height: '30"', depth: '30"' },
        '6-Person': { width: '72"', height: '30"', depth: '36"' },
        '8-Person': { width: '96"', height: '30"', depth: '42"' }
      },
      'Bed': {
        'Queen': { width: '60"', height: '80"', depth: '20"' },
        'King': { width: '76"', height: '80"', depth: '20"' },
        'Full': { width: '54"', height: '75"', depth: '20"' }
      },
      'Storage': {
        '3-Tier': { width: '30"', height: '60"', depth: '12"' },
        '5-Tier': { width: '30"', height: '72"', depth: '12"' }
      }
    };

    return dimensions[productType]?.[size] || { width: 'N/A', height: 'N/A', depth: 'N/A' };
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Ruler className="w-5 h-5 text-gray-700" />
            <h2 className="text-2xl font-bold text-gray-800">{t('product.sizeGuideModal.title')}</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <div className="p-6">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">{product.title}</h3>
            <p className="text-gray-600">
              {t('product.sizeGuideModal.subtitle')}
            </p>
          </div>

          <div className="space-y-6">
            {product.sizes.length > 0 ? (
              product.sizes.map((size) => {
                const dims = getDimensions(product.type, size);
                return (
                  <div key={size} className="border rounded-lg p-4">
                    <h4 className="font-semibold text-gray-800 mb-3">{size}</h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      <div>
                        <p className="text-sm text-gray-500 mb-1">{t('product.sizeGuideModal.dimensions.width')}</p>
                        <p className="text-lg font-semibold text-gray-800">{dims.width}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">{t('product.sizeGuideModal.dimensions.height')}</p>
                        <p className="text-lg font-semibold text-gray-800">{dims.height}</p>
                      </div>
                      {dims.depth && (
                        <div>
                          <p className="text-sm text-gray-500 mb-1">{t('product.sizeGuideModal.dimensions.depth')}</p>
                          <p className="text-lg font-semibold text-gray-800">{dims.depth}</p>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="border rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-3">{t('product.sizeGuideModal.standardDimensions')}</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Width</p>
                    <p className="text-lg font-semibold text-gray-800">{t('product.sizeGuideModal.dimensions.varies')}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Height</p>
                    <p className="text-lg font-semibold text-gray-800">{t('product.sizeGuideModal.dimensions.varies')}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Depth</p>
                    <p className="text-lg font-semibold text-gray-800">{t('product.sizeGuideModal.dimensions.varies')}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-gray-700">
              <strong>{t('product.sizeGuideModal.note')}</strong> {t('product.sizeGuideModal.noteText')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
