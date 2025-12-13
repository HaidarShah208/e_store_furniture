import { motion } from "framer-motion";

const AboutHeroSection: React.FC = () => {
  return (
    <section className="relative w-full min-h-[80vh] flex items-center justify-center px-6 md:px-12 py-12 bg-linear-to-b from-indigo-50 to-blue-50 overflow-hidden">
      <div className="absolute top-4 left-2 w-72 h-72 bg-linear-to-br from-blue-300 via-indigo-200 to-transparent rounded-full opacity-50 blur-3xl -translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-4 right-2 w-100 h-100 bg-linear-to-tr from-blue-300 via-indigo-200 to-transparent rounded-full opacity-50 blur-3xl translate-x-1/3 translate-y-1/3" />

      <div className="relative max-w-5xl text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight mb-6"
        >
          Transforming Spaces with <br />
          <span className="bg-linear-to-r from-indigo-600 via-blue-500 to-purple-600 text-transparent bg-clip-text">
            Premium Quality Furniture
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-lg text-gray-600 max-w-2xl mx-auto"
        >
          At our furniture e-store, we don't just sell furniture — we craft experiences that
          transform houses into homes, enhance your living spaces, and reflect your unique style. Our story
          is driven by passion, quality craftsmanship, and customer satisfaction.
        </motion.p>
      </div>
    </section>
  );
};

export default AboutHeroSection;
