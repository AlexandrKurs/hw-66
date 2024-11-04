export interface ToolbarProps {
  totalCalories: number;
  onToggleForm: () => void;
  isFormVisible: boolean;
}

export interface MealItemProps {
  meal: string;
  description: string;
  calories: number;
  onEdit: () => void;
  onDelete: () => void;
  loading: boolean;
}

export interface Meal {
  id?: string;
  meal: string;
  description: string;
  calories: number;
}

interface MealFormProps {
  onAddMeal: (meal: Meal) => void;
  onEditMeal?: (meal: Meal, id: string) => void;
  mealToEdit?: Meal | null;
  onClose: () => void;
  loading?: boolean;
}
