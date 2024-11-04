import React from 'react';

interface ToolbarProps {
  totalCalories: number;
  onToggleForm: () => void;
  isFormVisible: boolean;
}

const Toolbar: React.FC<ToolbarProps> = ({ totalCalories, onToggleForm, isFormVisible }) => {
  return (
    <div className="toolbar">
      <span>Total Calories: {totalCalories} kcal</span>
      <button onClick={onToggleForm}>
        {isFormVisible ? 'Cancel' : 'Add new meal'}
      </button>
    </div>
  );
};

export default Toolbar;