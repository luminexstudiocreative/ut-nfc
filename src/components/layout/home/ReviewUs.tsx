"use client";

import React from "react";
import { Star } from "lucide-react";
import reviewData from "@/data/review.json";

const ReviewUs = () => {
  const { review } = reviewData;

  const handleReviewClick = () => {
    window.open(review.googleReviewUrl, "_blank");
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${
          i < Math.floor(rating) 
            ? "fill-yellow-400 text-yellow-400" 
            : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-6">
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {review.title}
          </h2>
          <p className="text-gray-600 mb-4">{review.description}</p>
          
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="flex space-x-1">
              {renderStars(review.rating)}
            </div>
            <span className="text-lg font-semibold text-gray-700">
              {review.rating}
            </span>
            <span className="text-gray-500">
              ({review.totalReviews} reviews)
            </span>
          </div>

          <button
            onClick={handleReviewClick}
            className={`${review.bgColor} ${review.hoverColor} ${review.textColor} 
                       px-8 py-3 rounded-lg font-semibold transition-all duration-300 
                       hover:shadow-lg hover:scale-105 flex items-center space-x-2 mx-auto`}
          >
            <Star className="w-5 h-5" />
            <span>Write a Review</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewUs;
