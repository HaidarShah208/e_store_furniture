import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  }
};

export default function CategoryNav() {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className="container isolate_bars category-nav"
    >
      <motion.div
        variants={containerVariants}
        className="flex items-start gap-4 font-poppins sm:gap-5 md:gap-7 lg:gap-9 xl:gap-9 flex-wrap"
      >
        {categories.map((category) => (
          <motion.div key={category.id} variants={itemVariants}>
            <Link
              to={`/product-category/${category.id}`}
              className="flex items-center gap-2 group cursor-pointer hover:text-dark_wood transition-all duration-300 "
            >
              <div className="text-dark_wood transition-colors">
                {category.icon}
              </div>
              <span className="text-sm md:text-base text-deep_walnut hover:text-dark_wood whitespace-nowrap transition-colors">
                {category.name}
              </span>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
}

