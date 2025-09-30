/**************************************************************************
 * MainMenuPage component
 **************************************************************************/
import Footer from "./Footer.js";
import "../css/index.css";
import Header from "./Header.js";
import GenerateWorkout from "./GenerateWorkoutPage.js";
import AddExercise from "./AddExercisePage.js";
import ViewExercises from "./ViewExercisesPage.js";
import { root } from "../index.js";
import { user } from "./App.js";
import { useState } from "react";

export default function MainMenuPage() {
  const [adminOn, setAdminOn] = useState(false);

  const handleClick = component => {
    root.render(component);
  };

  const handleAdminClick = () => {
    console.log("You clicked an admin button");
  };

  const toggleAdmin = () => {
    console.log(adminOn ? "You are an admin" : "You are a smelly non-admin");
    setAdminOn(!adminOn);
  };

  return (
    <>
      <Header heading="Workout Generator App" />
      <div className="main-menu">
        <button
          className="main-menu-button"
          onClick={
            adminOn
              ? () => handleAdminClick()
              : () => handleClick(<GenerateWorkout />)
          }>
          {adminOn ? "See User List" : "Generate Workout"}
        </button>
        <button
          className="main-menu-button"
          onClick={
            adminOn
              ? () => handleAdminClick()
              : () => handleClick(<AddExercise />)
          }>
          {adminOn ? "Add/Delete User(s)" : "Add Exercise"}
        </button>
        <button
          className="main-menu-button"
          onClick={
            adminOn
              ? () => handleAdminClick()
              : () => handleClick(<ViewExercises />)
          }>
          {adminOn ? "Reset Password(s)" : "View Exercises"}
        </button>
      </div>
      {user.accountType === "admin" && (
        <button className="toggle-admin-button" onClick={toggleAdmin}>
          Toggle Admin Options
        </button>
      )}
      <div id="snackbar"></div>
      <Footer />
    </>
  );
}
