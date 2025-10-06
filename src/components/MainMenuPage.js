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
import AdminResetPassword from "./AdminResetPassword.js";
import AdminAddDelete from "./AdminAddDelete.js";
import AdminViewUsers from "./AdminViewUsers.js";

export default function MainMenuPage() {
  const [adminOn, setAdminOn] = useState(false);

  const handleClick = component => {
    root.render(component);
  };

  const toggleAdmin = () => {
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
              ? () => handleClick(<AdminViewUsers />)
              : () => handleClick(<GenerateWorkout />)
          }>
          {adminOn ? "See/Edit Users" : "Generate Workout"}
        </button>
        <button
          className="main-menu-button"
          onClick={
            adminOn
              ? () => handleClick(<AdminAddDelete />)
              : () => handleClick(<AddExercise />)
          }>
          {adminOn ? "Add/Delete Users" : "Add Exercise"}
        </button>
        <button
          className="main-menu-button"
          onClick={
            adminOn
              ? () => handleClick(<AdminResetPassword />)
              : () => handleClick(<ViewExercises />)
          }>
          {adminOn ? "Reset Passwords" : "View Exercises"}
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
