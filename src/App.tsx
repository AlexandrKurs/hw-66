import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App = () => {
  return (
    <div className="container mt-5">
      <div className="text-center mb-4 custom-header">
        <h1 className="title">Calorie Tracker</h1>
      </div>
      <div className="toolbar d-flex justify-content-between align-items-center mb-4">
        <p>Total calories: 900 kcal</p>
        <button className="btn btn-primary">Add new meal</button>
      </div>
      <div className="meal-list">
        <ul className="list-group">
          <li className="list-group-item">
            <div className="d-flex justify-content-between">
              <div>
                <strong>Breakfast</strong>: Pancakes, Bacon, Fruit
              </div>
              <span>300 kcal</span>
            </div>
          </li>
          <li className="list-group-item">
            <div className="d-flex justify-content-between">
              <div>
                <strong>Lunch</strong>: Salad, Chicken
              </div>
              <span>400 kcal</span>
            </div>
          </li>
          <li className="list-group-item">
            <div className="d-flex justify-content-between">
              <div>
                <strong>Dinner</strong>: Pasta, Vegetables
              </div>
              <span>200 kcal</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default App;