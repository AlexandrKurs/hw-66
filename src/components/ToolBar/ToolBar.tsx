import React from "react";
import { ToolbarProps } from "../../type";

const Toolbar: React.FC<ToolbarProps> = ({
  totalCalories,
  onToggleForm,
  isFormVisible,
}) => {
  return (
    <div className="toolbar">
      <span>Total Calories: {totalCalories} kcal</span>
      <button className="btn btn-primary" onClick={onToggleForm}>
        {isFormVisible ? "Cancel" : "Add new meal"}
      </button>
    </div>
  );
};

export default Toolbar;
