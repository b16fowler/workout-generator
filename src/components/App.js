/**************************************************************************
 * App component
 *
 * Master TODO list:
 *
 * AddExercisePage
 * Use mins/maxs from input field to limit hard-coding
 * Add snackbar for better user alerts
 * Implement API/DB to store user info
 *
 *
 * MainMenuPage
 * Change router links to buttons
 *
 * ExerciseTable
 * Fix 'unique key prop' error during table render
 *
 * MainMenuPage
 * Change router links to buttons
 **************************************************************************/

import "../css/App.css";
import MainMenuPage from "./pages/MainMenuPage";
import GenerateWorkoutPage from "./pages/GenerateWorkoutPage";
import ViewExercisesPage from "./pages/ViewExercisesPage";
import AddExercisePage from "./pages/AddExercisePage";
import NotFoundPage from "./pages/NotFoundPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainMenuPage />,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/generate-workout",
    element: <GenerateWorkoutPage />,
  },
  {
    path: "/add-exercise",
    element: <AddExercisePage />,
  },
  {
    path: "/view-exercises",
    element: <ViewExercisesPage />,
  },
]);

// Hardcoded test data
const userExercises = [
  {
    name: "Push-ups",
    type: "Arms",
    reps: 10,
    sets: 3,
    pic: "https://www.fitnesseducation.edu.au/wp-content/uploads/2020/10/Pushups.jpg",
  },
  {
    name: "Sit-ups",
    type: "Core",
    reps: 20,
    sets: 5,
    pic: "https://kinxlearning.com/cdn/shop/files/exercise-18_800x.jpg?v=1613154703",
  },
  {
    name: "Squats",
    type: "Legs",
    reps: 15,
    sets: 3,
    pic: "https://hips.hearstapps.com/hmg-prod/images/goblet-squat-1662030233.jpg",
  },
  {
    name: "Back Extensions",
    type: "Back",
    reps: 25,
    sets: 3,
    pic: "https://www.inspireusafoundation.org/wp-content/uploads/2022/05/back-extension-benefits.jpg",
  },
];

export default function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export { userExercises };
