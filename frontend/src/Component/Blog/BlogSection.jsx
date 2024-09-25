import React from 'react';

const BlogSection = () => {
    const blogPosts = [
        {
          id: 1,
          image: 'https://via.placeholder.com/400x250',
          title: '10 Tips to Improve Your Website\'s SEO',
          excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus lorem ipsum dolor sit amet...',
          author: 'John Doe',
          date: 'Aug 25, 2024',
          link: '#',
        },
        {
          id: 2,
          image: 'https://via.placeholder.com/400x250',
          title: 'The Future of Web Development in 2024',
          excerpt: 'Curabitur aliquet quam id dui posuere blandit. Cras ultricies ligula sed magna dictum porta...',
          author: 'Jane Smith',
          date: 'Sep 5, 2024',
          link: '#',
        },
        {
          id: 3,
          image: 'https://via.placeholder.com/400x250',
          title: 'How to Build a Successful E-Commerce Website',
          excerpt: 'Nulla quis lorem ut libero malesuada feugiat. Proin eget tortor risus. Vivamus suscipit tortor eget felis...',
          author: 'Michael Brown',
          date: 'Jul 12, 2024',
          link: '#',
        },
        {
          id: 4,
          image: 'https://via.placeholder.com/400x250',
          title: 'Understanding React Hooks',
          excerpt: 'React hooks are a new addition to React that lets you use state and other React features without writing a class...',
          author: 'Sarah Lee',
          date: 'Sep 15, 2024',
          link: '#',
        },
        {
          id: 5,
          image: 'https://via.placeholder.com/400x250',
          title: 'A Guide to Responsive Design',
          excerpt: 'Responsive design is crucial for modern web development. This guide covers best practices for designing responsive layouts...',
          author: 'David Wilson',
          date: 'Oct 1, 2024',
          link: '#',
        },
        {
          id: 6,
          image: 'https://via.placeholder.com/400x250',
          title: 'The Importance of Website Performance Optimization',
          excerpt: 'Website performance directly affects user experience. Learn about key strategies to optimize your website’s performance...',
          author: 'Emily Carter',
          date: 'Oct 10, 2024',
          link: '#',
        },
      ];
      

  return (
    <section className="py-14 bg-gray-100">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Blog</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Stay updated with the latest insights and stories from our team. Discover new trends and read about topics that interest you.
          </p>
        </div>
        
        {/* Blog Posts */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <div
              key={post.id}
              className="bg-white border border-orange-500 rounded-lg overflow-hidden shadow-lg transition-transform duration-300 transform hover:scale-105"
            >
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-orange-500 mb-2">
                  <a href={post.link} className="hover:underline">{post.title}</a>
                </h3>
                <p className="text-sm text-gray-600 mb-4">{post.excerpt}</p>
                <div className="text-sm text-gray-500">
                  <span>By <strong>{post.author}</strong></span> | <span>{post.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
