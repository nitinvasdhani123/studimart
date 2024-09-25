import React from "react";

const imgurl = "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

// Sample data for team members
const teamMembers = [
  {
    name: "Alice Johnson",
    title: "CEO",
    bio: "Alice is the visionary leader of our company, driving innovation and strategic growth.",
    photo: imgurl, // Replace with actual photo URL
    linkedin: "https://www.linkedin.com/in/alicejohnson",
  },
  {
    name: "Bob Smith",
    title: "CTO",
    bio: "Bob oversees our technology and product development, ensuring top-notch solutions.",
    photo: imgurl, // Replace with actual photo URL
    linkedin: "https://www.linkedin.com/in/bobsmith",
  },
  {
    name: "Carol Davis",
    title: "COO",
    bio: "Carol manages our day-to-day operations and ensures smooth execution of our strategies.",
    photo: imgurl, // Replace with actual photo URL
    linkedin: "https://www.linkedin.com/in/caroldavis",
  },
  // Add more team members as needed
  {
    name: "Alice Johnson",
    title: "CEO",
    bio: "Alice is the visionary leader of our company, driving innovation and strategic growth.",
    photo: imgurl, // Replace with actual photo URL
    linkedin: "https://www.linkedin.com/in/alicejohnson",
  },
  {
    name: "Bob Smith",
    title: "CTO",
    bio: "Bob oversees our technology and product development, ensuring top-notch solutions.",
    photo: imgurl, // Replace with actual photo URL
    linkedin: "https://www.linkedin.com/in/bobsmith",
  },
  {
    name: "Carol Davis",
    title: "COO",
    bio: "Carol manages our day-to-day operations and ensures smooth execution of our strategies.",
    photo: imgurl, // Replace with actual photo URL
    linkedin: "https://www.linkedin.com/in/caroldavis",
  },
  // Add more team members as needed
];

const TeamSection = () => {
  return (
    <section className="font-graphik py-20 px-6 bg-white">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">
            Meet Our Team
          </h2>
          <p className="text-lg md:text-xl text-gray-800 max-w-2xl mx-auto">
            Get to know the talented individuals behind our company.
          </p>
        </div>

        {/* Team Members */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="border-2 border-orange-500 p-6 rounded-lg shadow-lg text-center transform transition hover:scale-105 hover:shadow-2xl bg-white"
            >
              <img
                src={member.photo}
                alt={member.name}
                className="w-32 h-32 object-cover rounded-full mx-auto mb-4"
              />
              <h3 className="text-xl font-bold text-black mb-2">
                {member.name}
              </h3>
              <p className="text-black mb-2">
                {member.title}
              </p>
              <p className="text-black mb-4">
                {member.bio}
              </p>
              {member.linkedin && (
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-orange-500 hover:underline"
                >
                  LinkedIn Profile
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
