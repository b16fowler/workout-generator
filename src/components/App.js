/**************************************************************************
 * App component
 **************************************************************************/

import LoginPage from "./LoginPage";
import "../css/index.css";

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
    name: "Bicep curls",
    type: "Arms",
    reps: 15,
    sets: 5,
    pic: "https://cdn.shopify.com/s/files/1/2384/0833/files/shutterstock_419477203_480x480_d668762a-37fc-4d56-acfc-7e12885e91c1.webp?v=1689192672",
  },
  {
    name: "Sit-ups",
    type: "Core",
    reps: 20,
    sets: 5,
    pic: "https://kinxlearning.com/cdn/shop/files/exercise-18_800x.jpg?v=1613154703",
  },
  {
    name: "Forearm Planks",
    type: "Core",
    reps: 50,
    sets: 3,
    pic: "https://www.shape.com/thmb/GBTOZceBdJzc5iPQjYVNGyB2ACA=/3000x0/filters:no_upscale():max_bytes(200000):strip_icc():format(webp)/30-Day-Plank-Challenge-Stocksy_txp37c4682fMZb300_Medium_3751574-8471c02a2c6f4d959de0e4fc3487238b.jpg",
  },
  {
    name: "Squats",
    type: "Legs",
    reps: 15,
    sets: 3,
    pic: "https://hips.hearstapps.com/hmg-prod/images/goblet-squat-1662030233.jpg",
  },
  {
    name: "Lunges",
    type: "Legs",
    reps: 15,
    sets: 2,
    pic: "https://trainingstation.co.uk/cdn/shop/articles/Lunges-movment_d958998d-2a9f-430e-bdea-06f1e2bcc835_1400x.webp?v=1741687877",
  },
  {
    name: "Back Extensions",
    type: "Back",
    reps: 25,
    sets: 3,
    pic: "https://www.inspireusafoundation.org/wp-content/uploads/2022/05/back-extension-benefits.jpg",
  },
  {
    name: "Pendlay Rows",
    type: "Back",
    reps: 10,
    sets: 3,
    pic: "https://liftmanual.com/wp-content/uploads/2023/04/barbell-pendlay-row.jpg",
  },
];

export default function App() {
  return (
    <div className="App">
      <LoginPage />
    </div>
  );
}

export { userExercises };
