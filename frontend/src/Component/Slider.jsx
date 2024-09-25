import React from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/css";

const img = "https://images.pexels.com/photos/998591/pexels-photo-998591.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"

const slideData = [
  { id: 1, image: img, title: "Slide 1 Title" },
  { id: 2, image: img, title: "Slide 2 Title" },
  { id: 3, image: img, title: "Slide 3 Title" },
  { id: 4, image: img, title: "Slide 4 Title" },
  { id: 5, image: img, title: "Slide 5 Title" },
  { id: 6, image: img, title: "Slide 6 Title" },
];

const Slider = () => {
  return (

  <div className="slider sm:px-16 px-4">

    <Splide
      options={{
        type: "loop",
        perPage: 4,
        perMove: 1,
        focus: "center",
        gap: "0.8em",
        arrows: true,
        pagination: false,
        speed: 700,
        drag: true,
        dragAngleThreshold: 30,
        autoWidth: false,
        rewind: false,
        rewindSpeed: 400,
        waitForTransition: false,
        updateOnMove: true,
        trimSpace: true,
        easing: "ease",
        breakpoints: {
          991: {
            perPage: 3,
          },
          767: {
            perPage: 2,
          },
          479: {
            perPage: 1,
          },
        },
      }}

      
    >
      {slideData.map((slide) => (
        <SplideSlide key={slide.id}>
          <div className="relative">
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 py-2 px-4">
              <h2 className="text-white text-xl text-center font-bold">{slide.title}</h2>
            </div>
          </div>
        </SplideSlide>
      ))}
    </Splide>
  </div>
  );
};

export default Slider;
