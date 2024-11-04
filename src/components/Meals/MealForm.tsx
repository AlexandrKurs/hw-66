import React, { useState } from 'react';

interface MealFormProps {
  onAddMeal: (meal: { meal: string; description: string; calories: number }) => void;
  onClose: () => void; // New prop to handle closing the form
}

const MealForm: React.FC<MealFormProps> = ({ onAddMeal, onClose }) => {
  const [mealType, setMealType] = useState('Breakfast');
  const [description, setDescription] = useState('');
  const [calories, setCalories] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newMeal = { meal: mealType, description, calories: Number(calories) };

    onAddMeal(newMeal);
    onClose();
    setDescription('');
    setCalories('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="mealType">Meal Type:</label>
        <select
          id="mealType"
          value={mealType}
          onChange={(e) => setMealType(e.target.value)}
        >
          <option value="Breakfast">Breakfast</option>
          <option value="Snack">Snack</option>
          <option value="Lunch">Lunch</option>
          <option value="Dinner">Dinner</option>
        </select>
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <input
          type="text"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="calories">Calories (kcal):</label>
        <input
          type="number"
          id="calories"
          value={calories}
          onChange={(e) => setCalories(e.target.value)}
          required
        />
      </div>
      <button type="submit">Save</button>
    </form>
  );
};

export default MealForm;