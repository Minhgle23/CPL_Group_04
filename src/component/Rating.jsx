import React from 'react';

const Rating = ({ rating, onRatingChange, editable = false }) => {
  return (
    <div className="star-rating">
      {[...Array(5)].map((star, index) => {
        index += 1;
        return (
          <span
            key={index}
            className={index <= rating ? "on" : "off"}
            onClick={() => editable && onRatingChange(index)}
            style={{ cursor: editable ? 'pointer' : 'default' }}
          >
            &#9733;
          </span>
        );
      })}
    </div>
  );
};

export default Rating;