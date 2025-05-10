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

// Hardcoding test data
const userExercises = [
  {
    name: "Push-ups",
    type: "Arms",
    reps: 10,
    sets: 3,
    pic: "",
  },
  {
    name: "Sit-ups",
    type: "Core",
    reps: 20,
    sets: 5,
    pic: "",
  },
  {
    name: "Squats",
    type: "Legs",
    reps: 15,
    sets: 3,
    pic: "",
  },
  {
    name: "Back Extensions",
    type: "Back",
    reps: 25,
    sets: 3,
    pic: "",
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
