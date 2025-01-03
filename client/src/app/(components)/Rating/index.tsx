import { Star } from "lucide-react";
import React from "react";

type RatingProps = {
  rating: number;
};

const Rating = ({ rating }: RatingProps) => {
  const roundedRating = Math.floor(rating); 
  return [1, 2, 3, 4, 5].map((index) => (
    <Star
      key={index}
      role="img" 
      fill={index <= roundedRating ? "#FFC107" : "#E4E5E9"} 
      className="w-4 h-4 "
    />
  ));
};

export default Rating;
