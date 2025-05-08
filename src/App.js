import MainMenuPage from "./pages/MainMenuPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./App.css";
import GenerateWorkoutPage from "./pages/GenerateWorkoutPage";
import ViewExercisesPage from "./pages/ViewExercisesPage";
import AddExercisePage from "./pages/AddExercisePage";
import NotFoundPage from "./pages/NotFoundPage";

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

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
