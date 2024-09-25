// src/pages/About.jsx
import React from 'react';
import Hero from '../Component/Hero';
import TeamSection from '../Component/Aboutus/TeamSection';
import TimelineSection from '../Component/Aboutus/TimeLineSection';

import heroVideo from '../assets/aboutHero.mp4'

const About = () => {
  return <>
       <Hero
        videoSrc={heroVideo}
        heading="Welcome to Our Website"
        description="We are committed to providing exceptional services and products that exceed your expectations."
        buttonText="Get Started"
        buttonLink="#get-started"
      />
      <TeamSection/>
      <TimelineSection/>
  </>;
};

export default About;
