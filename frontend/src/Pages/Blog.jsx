import React from 'react'
import BlogSection from '../Component/Blog/BlogSection'
import Hero from '../Component/Hero'
import heroVideo from "../assets/BlogHero.mp4"
const Blog = () => {
  return (
    <div>
       <Hero
        videoSrc={heroVideo}
        heading="Welcome to Our Blog"
        description="We are committed to providing exceptional insights and updates on our industry. Stay tuned for more."
        buttonText="Explore Now"
        buttonLink="#explore-now"
      />
      <BlogSection />
    </div>
  )
}

export default Blog
