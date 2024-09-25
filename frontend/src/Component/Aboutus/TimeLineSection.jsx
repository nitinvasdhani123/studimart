import React from "react";

const TimelineSection = () => {
  const timelineEvents = [
    {
      year: "2020",
      description:
        "We started as a small team with a big vision to provide quality services in the industry.",
    },
    {
      year: "2021",
      description:
        "Our team grew, and we launched our first major product that was well-received in the market.",
    },
    {
      year: "2023",
      description:
        "We expanded globally and opened new offices in three major cities worldwide.",
    },
  ];

  return (
    <section className="px-6">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800">Our Journey</h2>
        </div>

        {/* Timeline */}
        <div className="relative max-w-3xl mx-auto pl-12 ">
          <div className="absolute top-0 left-2 h-full w-1 bg-orange-500 "></div>
          {timelineEvents.map((event, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-lg mb-8 relative border-2 border-orange-500"
            >
              <div className="absolute left-[-48px] top-10 w-5 h-5 bg-orange-500 rounded-full shadow-lg"></div>
              <h3 className="text-2xl font-semibold text-orange-500 mb-2">
                {event.year}
              </h3>
              <p className="text-gray-600">{event.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TimelineSection;
