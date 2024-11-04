import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import MealList from "./components/MealList/MealList.tsx";

const App = () => {
  return (
    <div className="container mt-5">
      <div className="text-center mb-4 custom-header">
        <h2 className="title">Calorie Tracker</h2>
      </div>
      <MealList />
    </div>
  );
};

export default App;
