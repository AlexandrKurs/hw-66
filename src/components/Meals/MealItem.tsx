import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

interface MealItemProps {
  meal: string;
  description: string;
  calories: number;
  onEdit: () => void;
  onDelete: () => void;
  loading?: boolean;
}

const MealItem: React.FC<MealItemProps> = ({
  meal,
  description,
  calories,
  onEdit,
  onDelete,
  loading,
}) => {
  return (
    <li className="list-group-item d-flex justify-content-between align-items-center">
      <div>
        <h5>{meal}</h5>
        <p>{description}</p>
      </div>
      <div className="d-flex align-items-center">
        <span className="me-3">{calories} kcal</span>
        <button
          onClick={onEdit}
          disabled={loading}
          className="btn btn-light me-2"
          title="Edit"
        >
          <FontAwesomeIcon icon={faEdit} />
        </button>
        {loading ? (
          <span
            className="spinner-border spinner-border-sm"
            role="status"
            aria-hidden="true"
          ></span>
        ) : (
          <button
            onClick={onDelete}
            disabled={loading}
            className="btn btn-light"
            title="Delete"
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
        )}
      </div>
    </li>
  );
};

export default MealItem;
