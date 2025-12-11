import "swiper/swiper-bundle.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useState } from "react";

export function CustomCarousel({ slides }:any) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="flex flex-col justify-center items-center w-full">
      <Swiper
        modules={[Pagination, Autoplay]}
        autoplay={{ delay: 2500 }}
        loop={true}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        pagination={{
          clickable: true,
          el: "#custom-pagination",
          bulletClass: "swiper-custom-bullet",
          bulletActiveClass: "swiper-custom-bullet-active",
        }}
        className="w-[90%] h-[60%] rounded-xl  shadow-[0_0_12px_rgba(0,0,0,0.15),0_30px_20px_rgba(0,0,0,0.25)]"
      >
        {slides.map((slide: { content: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; }, index: Key | null | undefined) => (
          <SwiperSlide key={index}>
            <div className="w-full h-[85vh]  rounded-xl flex items-center justify-center">
              {slide.content}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="text-center mt-10">
        <h2 className="text-xl font-semibold">
          {slides[activeIndex]?.title}
        </h2>
        <p className="text-gray-600 text-sm mt-2 w-full px-10">
          {slides[activeIndex]?.description}
        </p>
      </div>

      <div id="custom-pagination" className="mt-6 flex justify-center gap-2"></div>
    </div>
  );
}