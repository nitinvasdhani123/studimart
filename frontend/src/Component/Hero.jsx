import React from 'react';

const Hero = ({ videoSrc, heading, description, buttonText, buttonLink }) => {
  return (
    <section className="relative h-screen flex flex-col justify-center items-center overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        className="absolute inset-0 object-cover w-full h-full"
        src={videoSrc} // Use the video URL passed via props
      />

      {/* Overlay for Better Text Visibility */}
      <div className="absolute inset-0 bg-black bg-opacity-70 z-10"></div>

      {/* Content */}
      <div className="relative z-20 flex flex-col justify-center items-center text-center px-6 md:px-12">
        {/* Heading */}
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
          {heading} {/* Use the heading text passed via props */}
        </h1>

        {/* Description */}
        <p className="text-lg md:text-xl text-white max-w-4xl mb-8">
          {description} {/* Use the description text passed via props */}
        </p>

        {/* Action Button */}
        <a
          href={buttonLink} // Use the link passed via props
          className="bg-orange-500 text-black rounded-full py-3 px-6 text-lg font-semibold hover:bg-white transition-colors duration-300"
        >
          {buttonText} {/* Use the button text passed via props */}
        </a>
      </div>
    </section>
  );
};

export default Hero;
