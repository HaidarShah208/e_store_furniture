import { Link } from 'react-router-dom';
import { 
  Car, 
  Archive, 
  Sofa, 
  Bed, 
  Table, 
  Sparkles,
  Layers
} from 'lucide-react';

interface Category {
  id: string;
  name: string;
  icon: React.ReactNode;
  productType: string; // Maps to product.type in products.json
}

const categories: Category[] = [
  {
    id: 'chairs',
    name: 'Chairs',
    icon: <Car className="h-5 w-5" />,
    productType: 'Chair'
  },
  {
    id: 'storage',
    name: 'Storage',
    icon: <Archive className="h-5 w-5" />,
    productType: 'Storage'
  },
  {
    id: 'armchairs',
    name: 'Armchairs',
    icon: <Layers className="h-5 w-5" />,
    productType: 'Armchair'
  },
  {
    id: 'sofas',
    name: 'Sofas',
    icon: <Sofa className="h-5 w-5" />,
    productType: 'Sofa'
  },
  {
    id: 'beds',
    name: 'Beds',
    icon: <Bed className="h-5 w-5" />,
    productType: 'Bed'
  },
  {
    id: 'tables',
    name: 'Tables',
    icon: <Table className="h-5 w-5" />,
    productType: 'Table'
  },
  {
    id: 'decor',
    name: 'Decor',
    icon: <Sparkles className="h-5 w-5" />,
    productType: 'Decor'
  }
];

export default function CategoryNav() {
  return (
    <section className="container isolate_bars category-nav">
      <div className="flex items-start gap-4 sm:gap-6 md:gap-8 lg:gap-10 xl:gap-12 flex-wrap">
        {categories.map((category) => (
          <Link
            key={category.id}
            to={`/product-category/${category.id}`}
            className="flex items-center gap-2 group cursor-pointer transition-all duration-300 hover:opacity-50"
          >
            <div className="text-slate-600 group-hover:text-slate-800 transition-colors">
              {category.icon}
            </div>
            <span className="text-sm md:text-base font-medium text-slate-600 group-hover:text-slate-800 whitespace-nowrap transition-colors">
              {category.name}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

