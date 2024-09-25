import React from "react";

const ReviewSection = () => {
  const reviews = [
    {
      id: 1,
      quote: "❝",
      title: "Awesome tool!",
      description:
        "Lorem ipsum praesent ac massa at ligula reet est iaculis. Vivamus est mist aliquet elit ac nisl.",
      rating: "★★★★★",
      reviewerImage: "https://picsum.photos/50",
      reviewerName: "Olivia Wilson",
      reviewerTitle: "Founder of Borcelle",
    },
    {
      id: 2,
      quote: "❝",
      title: "Super cool!",
      description:
        "Lorem ipsum praesent ac massa at ligula reet est iaculis. Vivamus est mist aliquet elit ac nisl.",
      rating: "★★★★★",
      reviewerImage: "https://picsum.photos/50",
      reviewerName: "Matt Zhang",
      reviewerTitle: "CEO at Borcelle",
    },
    {
      id: 3,
      quote: "❝",
      title: "Awesome tool!",
      description:
        "Lorem ipsum praesent ac massa at ligula reet est iaculis. Vivamus est mist aliquet elit ac nisl.",
      rating: "★★★★★",
      reviewerImage: "https://picsum.photos/50",
      reviewerName: "Hannah Morales",
      reviewerTitle: "CFO at Borcelle",
    },
  ];

  return (
    <section className="py-16 bg-gray-50 text-center">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-10">
          Why others choose us?
        </h2>
        <div className="flex flex-wrap justify-center gap-8">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-white border border-gray-200 rounded-lg p-6 shadow-md transition-transform duration-300 transform hover:translate-y-1 hover:shadow-lg w-full max-w-xs text-left relative"
            >
              <div className="absolute top-4 left-4 text-5xl text-orange-200">
                {review.quote}
              </div>
              <div className="ml-12">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  {review.title}
                </h3>
                <p className="text-sm text-gray-600 mb-4">{review.description}</p>
                <div className="text-orange-500 text-lg mb-4">
                  {review.rating}
                </div>
                <div className="flex items-center mt-4">
                  <img
                    src={review.reviewerImage}
                    alt="Reviewer"
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="text-gray-800 text-base font-medium">
                      {review.reviewerName}
                    </h4>
                    <p className="text-gray-500 text-sm">
                      {review.reviewerTitle}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewSection;
