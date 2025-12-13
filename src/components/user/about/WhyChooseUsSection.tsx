import { motion } from "framer-motion";
import {
  ShieldCheck,
  Truck,
  Star,
  Sofa,
  TrendingUp,
  Wrench,
} from "lucide-react";
import { Card, CardContent } from "./card";

const features = [
  {
    title: "Premium Quality Craftsmanship",
    description:
      "Every piece is crafted with precision using premium materials, ensuring durability, comfort, and timeless elegance.",
    icon: <Star className="w-6 h-6 text-indigo-600" />,
  },
  {
    title: "Wide Selection of Styles",
    description:
      "From modern minimalist to classic traditional, we offer diverse furniture styles to match every taste and home aesthetic.",
    icon: <Sofa className="w-6 h-6 text-purple-600" />,
  },
  {
    title: "Secure & Fast Delivery",
    description:
      "Your furniture is carefully packaged and delivered safely to your doorstep with full tracking and insurance coverage.",
    icon: <Truck className="w-6 h-6 text-green-600" />,
  },
  {
    title: "Customization Options",
    description:
      "Personalize your furniture with custom fabrics, finishes, and configurations to perfectly suit your space and preferences.",
    icon: <Wrench className="w-6 h-6 text-yellow-500" />,
  },
  {
    title: "Best Value Guarantee",
    description:
      "We offer competitive pricing without compromising quality, ensuring you get the best value for premium furniture.",
    icon: <TrendingUp className="w-6 h-6 text-blue-500" />,
  },
  {
    title: "Certified & Eco-Friendly",
    description:
      "Our furniture meets international quality standards and is crafted using sustainable, eco-friendly materials and processes.",
    icon: <ShieldCheck className="w-6 h-6 text-red-500" />,
  },
];

const WhyChooseUsSection: React.FC = () => {
  return (
    <>
      <style>
        {`
          .animated-line-card {
            position: relative;
            overflow: hidden;
          }
          
          .animated-line-card::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 3px;
            background: linear-gradient(90deg, #4f46e5, #7c3aed, #2563eb);
            transform: translateX(-100%);
            transition: transform 0.6s ease;
          }
          
          .animated-line-card:hover::after {
            transform: translateX(0);
          }
        `}
      </style>
      <section className="isolate_container bg-indigo-50 ">
        <div className="mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="subheading font-semibold mb-8"
          >
            Why Choose <span className="text-indigo-600">Our Furniture Store?</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="minicontent max-w-3xl mx-auto mb-12"
          >
            We combine exceptional craftsmanship, contemporary design, and sustainable practices to deliver furniture that transforms your living spaces.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 paddingleft paddingright">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="animated-line-card relative overflow-hidden p-6 shadow-xl hover:shadow-2xl border-none flex flex-col h-full transition-transform transform hover:-translate-y-1">
                {/* Fixed height ensures all cards match */}
                <CardContent className="relative z-10 flex flex-col gap-4 h-full justify-between">
                  <div className="flex flex-col items-center gap-3">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-indigo-50">
                      {feature.icon}
                    </div>
                    <h3 className="subheading3 text-center">{feature.title}</h3>
                  </div>
                  <p className="minicontent text-gray-600 text-center">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
};

export default WhyChooseUsSection;
