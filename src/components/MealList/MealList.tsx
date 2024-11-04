import React, { useState, useEffect } from "react";
import MealForm from "../Meals/MealForm";
import Toolbar from "../ToolBar/ToolBar";
import MealItem from "../Meals/MealItem";
import axiosApi from "../../axiosApi";
import { Meal } from "../../type";

const MealList: React.FC = () => {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [isFormVisible, setFormVisible] = useState<boolean>(false);
  const [currentMeal, setCurrentMeal] = useState<Meal | null>(null);
  const [loadingAction, setLoadingAction] = useState<string | null>(null);
  const [loadingActionId, setLoadingActionId] = useState<string | null>(null);

  const fetchMeals = async () => {
    setLoadingAction("fetch");
    try {
      const response = await axiosApi.get("/meals.json");
      const fetchedMeals = Object.keys(response.data || {}).map((key) => ({
        ...response.data[key],
        id: key,
      })) as Meal[];
      setMeals(fetchedMeals);
    } catch (error) {
      console.error("Error fetching meals:", error);
    } finally {
      setLoadingAction(null);
    }
  };

  useEffect(() => {
    fetchMeals();
  }, []);

  const handleAddMeal = async (newMeal: Meal) => {
    setLoadingAction("add");
    try {
      const response = await axiosApi.post("/meals.json", newMeal);
      setMeals((prevMeals) => [
        ...prevMeals,
        { ...newMeal, id: response.data.name },
      ]);
      setFormVisible(false);
    } catch (error) {
      console.error("Error adding meal:", error);
    } finally {
      setLoadingAction(null);
    }
  };

  const handleEditMeal = async (updatedMeal: Meal, id: string) => {
    setLoadingAction("update");
    try {
      await axiosApi.put(`/meals/${id}.json`, updatedMeal);
      setMeals((prevMeals) =>
        prevMeals.map((meal) =>
          meal.id === id ? { ...meal, ...updatedMeal } : meal,
        ),
      );
    } catch (error) {
      console.error("Error updating meal:", error);
    } finally {
      setLoadingAction(null);
    }
  };

  const handleDeleteMeal = async (id: string) => {
    setLoadingAction("delete");
    setLoadingActionId(id); // Установите id для отслеживания
    try {
      await axiosApi.delete(`/meals/${id}.json`);
      setMeals((prevMeals) => prevMeals.filter((meal) => meal.id !== id));
    } catch (error) {
      console.error("Error deleting meal:", error);
    } finally {
      setLoadingAction(null);
      setLoadingActionId(null);
    }
  };

  const toggleFormVisibility = () => {
    setFormVisible((prev) => !prev);
    setCurrentMeal(null);
  };

  const totalCalories = meals.reduce((total, meal) => total + meal.calories, 0);

  return (
    <div className="meal-list">
      {isFormVisible ? (
        <MealForm
          onAddMeal={handleAddMeal}
          onEditMeal={handleEditMeal}
          mealToEdit={currentMeal}
          onClose={() => setFormVisible(false)}
          loading={loadingAction === "add" || loadingAction === "update"}
        />
      ) : (
        <>
          <Toolbar
            totalCalories={totalCalories}
            onToggleForm={toggleFormVisibility}
            isFormVisible={isFormVisible}
          />
          <ul className="list-group">
            {meals.map((item) => (
              <MealItem
                key={item.id}
                meal={item.meal}
                description={item.description}
                calories={item.calories}
                onEdit={() => {
                  setCurrentMeal(item);
                  setFormVisible(true);
                }}
                onDelete={() => handleDeleteMeal(item.id!)}
                loading={
                  loadingAction === "delete" && loadingActionId === item.id
                }
              />
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default MealList;
