import MainMenu from "./MainMenu";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./App.css";
import GenerateWorkoutPage from "./GenerateWorkoutPage";
import ViewExercisesPage from "./ViewExercisesPage";
import AddExercisePage from "./AddExercisePage";
import NotFoundPage from "./NotFoundPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainMenu />,
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
