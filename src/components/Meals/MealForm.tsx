import React, { useEffect, useState } from "react";
import { Meal, MealFormProps } from "../../type";

const MealForm: React.FC<MealFormProps> = ({
  onAddMeal,
  onEditMeal,
  mealToEdit,
  onClose,
}) => {
  const [mealType, setMealType] = useState("Breakfast");
  const [description, setDescription] = useState("");
  const [calories, setCalories] = useState("");

  useEffect(() => {
    if (mealToEdit) {
      setMealType(mealToEdit.meal);
      setDescription(mealToEdit.description);
      setCalories(mealToEdit.calories.toString());
    }
  }, [mealToEdit]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const mealData: Meal = {
      meal: mealType,
      description,
      calories: Number(calories),
    };

    if (mealToEdit) {
      const updatedMeal: Meal = { ...mealData, id: mealToEdit.id! };
      onEditMeal(updatedMeal, mealToEdit.id!);
      setDescription("");
      setCalories("");
    } else {
      onAddMeal(mealData);
      onClose();
      setDescription("");
      setCalories("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded bg-light">
      <h3 className="mb-3">{mealToEdit ? "Edit Meal" : "Add Meal"}</h3>
      <div className="mb-3">
        <label htmlFor="mealType" className="form-label">
          Meal Type:
        </label>
        <select
          id="mealType"
          className="form-select"
          value={mealType}
          onChange={(e) => setMealType(e.target.value)}
        >
          <option value="Breakfast">Breakfast</option>
          <option value="Snack">Snack</option>
          <option value="Lunch">Lunch</option>
          <option value="Dinner">Dinner</option>
        </select>
      </div>
      <div className="mb-3">
        <label htmlFor="description" className="form-label">
          Description:
        </label>
        <input
          type="text"
          id="description"
          className="form-control"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="calories" className="form-label">
          Calories (kcal):
        </label>
        <input
          type="number"
          id="calories"
          className="form-control"
          value={calories}
          onChange={(e) => setCalories(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">
        {mealToEdit ? "Update" : "Save"}
      </button>
    </form>
  );
};

export default MealForm;
