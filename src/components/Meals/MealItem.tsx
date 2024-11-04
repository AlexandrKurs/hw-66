import React from 'react';

interface MealItemProps {
  meal: string;
  description: string;
  calories: number;
}

const MealItem: React.FC<MealItemProps> = ({ meal, description, calories }) => {
  return (
    <li className="list-group-item rounded mb-3">
      <div className="d-flex justify-content-between">
        <div>
          <strong>{meal}</strong>: {description}
        </div>
        <span>{calories} kcal</span>
      </div>
    </li>
  );
};

export default MealItem;