import React, { useState } from 'react';
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';
import { CiStar } from 'react-icons/ci';

const Rating = ({ initialRating, onRate }) => {
    const [rating, setRating] = useState(initialRating);

    const handleClick = (newRating) => {
        setRating(newRating); // Update state
        if (onRate) onRate(newRating); // Call parent function if provided
    };

    return (
        <div className="flex cursor-pointer">
            {[1, 2, 3, 4, 5].map((star) => (
                <span
                    key={star}
                    onClick={() => handleClick(star)}
                    className="text-xl transition-all duration-300"
                >
                    {rating >= star ? (
                        <FaStar className="text-[#EDBB0E]" />
                    ) : rating >= star - 0.5 ? (
                        <FaStarHalfAlt className="text-[#EDBB0E]" />
                    ) : (
                        <CiStar className="text-slate-600" />
                    )}
                </span>
            ))}
        </div>
    );
};

export default Rating;
