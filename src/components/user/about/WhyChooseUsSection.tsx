import { motion } from "framer-motion";
import {
  ShieldCheck,
  Rocket,
  Users,
  Brain,
  TrendingUp,
  Activity,
} from "lucide-react";
import { Card, CardContent } from "./card";

const features = [
  {
    title: "Client-First Approach",
    description:
      "We prioritize transparency, feedback, and tailored solutions that match your exact business goals.",
    icon: <Users className="w-6 h-6 text-indigo-600" />,
  },
  {
    title: "Innovative Development",
    description:
      "We embrace modern tools like AI, automation, and cloud to keep your solutions future-ready.",
    icon: <Rocket className="w-6 h-6 text-purple-600" />,
  },
  {
    title: "Secure & Scalable",
    description:
      "Our code is clean, secure, and built for scale — whether you're serving 10 users or 10 million.",
    icon: <ShieldCheck className="w-6 h-6 text-green-600" />,
  },
  {
    title: "AI & Automation Ready",
    description:
      "We seamlessly integrate AI, NLP, and automation into digital systems for smart performance.",
    icon: <Brain className="w-6 h-6 text-yellow-500" />,
  },
  {
    title: "Results-Driven Teams",
    description:
      "We don't just build — we measure. Our strategies aim to reduce cost, improve UX, and grow engagement.",
    icon: <TrendingUp className="w-6 h-6 text-blue-500" />,
  },
  {
    title: "Agile & Responsive",
    description:
      "We follow modern Agile and DevOps practices to deliver fast and adapt to your changing needs.",
    icon: <Activity className="w-6 h-6 text-red-500" />,
  },
];

const WhyChooseUsSection: React.FC = () => {
  return (
    <section className="isolate_container bg-indigo-50 ">
      <div className="mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="subheading font-semibold mb-8"
        >
          Why Choose <span className="text-indigo-600">Devstive?</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="minicontent max-w-3xl mx-auto mb-12"
        >
          We combine creativity, modern technology, and agile methodology to deliver solutions that are scalable, secure, and visually stunning.
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
            <Card className="relative overflow-hidden p-6 shadow-xl hover:shadow-2xl border-none flex flex-col h-full transition-transform transform hover:-translate-y-1">
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
  );
};

export default WhyChooseUsSection;
