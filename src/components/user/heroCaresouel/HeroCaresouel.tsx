import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function HeroCarousel({
  slides,
  autoPlay = false,
  interval = 0,
}: {
  slides: {
    image: string;
    title: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
  }[];
  autoPlay?: boolean;
  interval?: number;
}) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!autoPlay) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, interval);
    return () => clearInterval(timer);
  }, [slides.length, autoPlay, interval]);

  return (
    <section className="relative w-screen overflow-hidden h-[calc(100vh-64px)]">

      <div
        className="absolute inset-0 flex h-full transition-transform duration-700"
        style={{
          transform: `translateX(-${current * 100}vw)`,
          width: `${slides.length * 100}vw`,
        }}
      >
        {slides.map((slide, idx) => (
          <div
            key={idx}
            className="w-screen h-full shrink-0"
            style={{
              backgroundImage: `url(${slide.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-linear-to-r from-black/60 via-black/30 to-transparent" />
          </div>
        ))}
      </div>

      <div className="relative z-10 h-full flex items-center max-w-4xl mx-auto px-6 md:px-12">
        <div className="text-white space-y-6">
          <h1 className="text-4xl md:text-6xl font-urbanist leading-tight drop-shadow-lg">
            {slides[current].title}
          </h1>

          <p className="text-lg md:text-xl max-w-2xl drop-shadow-md">
            {slides[current].subtitle}
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              to="/category/Readymade"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors bg-white text-blue-700 shadow-lg hover:bg-gray-100 h-11 px-6"
            >
              {slides[current].ctaPrimary}
            </Link>

            <Link
              to="/category/Unpolished"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors border border-white/70 text-white hover:bg-white hover:text-blue-700 h-11 px-6"
            >
              {slides[current].ctaSecondary}
            </Link>
          </div>
        </div>
      </div>

      <button
        aria-label="Previous"
        className="absolute button left-20 top-1/2 -translate-y-1/2 h-14 w-14 rounded-full hover:bg-white/50 shadow-md flex items-center justify-center z-20"
        onClick={() =>
          setCurrent((prev) => (prev - 1 + slides.length) % slides.length)
        }
      >
        <ChevronLeft className="h-9 w-9 text-gray-300" />
      </button>

      <button
        aria-label="Next"
        className="absolute right-20 top-1/2 -translate-y-1/2 h-14 w-14 rounded-full hover:bg-white/50 shadow-md flex items-center justify-center z-20"
        onClick={() => setCurrent((prev) => (prev + 1) % slides.length)}
      >
        <ChevronRight className="h-9 w-9 text-gray-300" />
      </button>
    </section>
  );
}
