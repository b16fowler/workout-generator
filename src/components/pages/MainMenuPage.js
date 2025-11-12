/**************************************************************************
 * MainMenuPage component
 *
 * Component that holds buttons to take the user to different features of
 * the web app. If signed in account is an admin, toggleAdmin button is
 * visible to change the buttons functionality to admin options
 **************************************************************************/
import "../../css/index.css";
import { useState } from "react";
import { user } from "../App.js";
import { root } from "../../index.js";
import Footer from "../other/Footer.js";
import Header from "../other/Header.js";
import AddExercisePage from "./AddExercisePage.js";
import AdminDelete from "../admin/AdminDelete.js";
import ViewExercisesPage from "./ViewExercisesPage.js";
import GenerateWorkoutPage from "./GenerateWorkoutPage.js";
import AdminViewAccounts from "../admin/AdminViewAccounts.js";
import AdminResetPassword from "../admin/AdminResetPassword.js";

export default function MainMenuPage() {
  const [adminOn, setAdminOn] = useState(false);

  // Called to render new component
  const handleClick = (component) => {
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
              : () => handleClick(<AddExercisePage />)
          }
        >
          {adminOn ? "Delete Users" : "Add Exercise"}
        </button>
        <button
          className="main-menu-button"
          onClick={
            adminOn
              ? () => handleClick(<AdminResetPassword />)
              : () => handleClick(<ViewExercisesPage />)
          }
        >
          {adminOn ? "Reset Passwords" : "View Exercises"}
        </button>
        <button
          className="main-menu-button"
          onClick={
            adminOn
              ? () => handleClick(<AdminViewAccounts />)
              : () => handleClick(<GenerateWorkoutPage />)
          }
        >
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
