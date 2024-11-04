import React, { useState, useEffect } from 'react';
import './MealList.css';
import axios from 'axios';
import MealForm from '../Meals/MealForm.tsx';
import Toolbar from '../ToolBar/ToolBar.tsx';
import MealItem from '../Meals/MealItem.tsx';

const axiosApi = axios.create({
  baseURL: "https://alexandrk-server-default-rtdb.europe-west1.firebasedatabase.app/",
});

const MealList: React.FC = () => {
  const [meals, setMeals] = useState<any[]>([]);
  const [isFormVisible, setFormVisible] = useState(false);

  const fetchMeals = async () => {
    try {
      const response = await axiosApi.get('/meals.json');
      const fetchedMeals = Object.keys(response.data || {}).map((key) => ({
        ...response.data[key],
        id: key,
      }));
      setMeals(fetchedMeals);
    } catch (error) {
      console.error("Error fetching meals:", error);
    }
  };

  useEffect(() => {
    fetchMeals();
  }, []);

  const handleAddMeal = async (newMeal: { meal: string; description: string; calories: number }) => {
    try {
      const response = await axiosApi.post('/meals.json', newMeal);
      setMeals((prevMeals) => [
        ...prevMeals,
        { ...newMeal, id: response.data.name },
      ]);
      setFormVisible(false); // Hide the form after saving
    } catch (error) {
      console.error("Error adding meal:", error);
    }
  };

  const toggleFormVisibility = () => {
    setFormVisible(true); // Show the form
  };

  const totalCalories = meals.reduce((total, meal) => total + meal.calories, 0);

  return (
    <div className="meal-list">
      {isFormVisible ? (
        <MealForm onAddMeal={handleAddMeal} onClose={() => setFormVisible(false)} />
      ) : (
        <>
          <Toolbar totalCalories={totalCalories} onToggleForm={toggleFormVisibility} isFormVisible={isFormVisible} />
          <ul className="list-group">
            {meals.map((item) => (
              <MealItem
                key={item.id}
                meal={item.meal}
                description={item.description}
                calories={item.calories}
              />
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default MealList;