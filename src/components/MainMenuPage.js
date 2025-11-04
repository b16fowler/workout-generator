/**************************************************************************
 * MainMenuPage component
 *
 * Component that holds buttons to take the user to different features of
 * the web app. If signed in account is an admin, toggleAdmin button is
 * visible to change the buttons functionality to admin options
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
import AdminDelete from "./AdminDelete.js";
import AdminViewAccounts from "./AdminViewAccounts.js";

export default function MainMenuPage() {
  const [adminOn, setAdminOn] = useState(false);

  // Called to render new component
  const handleClick = component => {
    root.render(component);
  };

  // Toggles button functions between user and admin
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
              ? () => handleClick(<AdminDelete />)
              : () => handleClick(<AddExercise />)
          }>
          {adminOn ? "Delete Users" : "Add Exercise"}
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
        <button
          className="main-menu-button"
          onClick={
            adminOn
              ? () => handleClick(<AdminViewAccounts />)
              : () => handleClick(<GenerateWorkout />)
          }>
          {adminOn ? "View Accounts" : "Generate Workout"}
        </button>
        {user.accountType === "admin" && (
          <button className="toggle-admin-button" onClick={toggleAdmin}>
            Toggle Admin Options
          </button>
        )}
      </div>
      <Footer />
    </>
  );
}
