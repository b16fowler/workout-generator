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
import Footer from "../other/Footer.js";
import Header from "../other/Header.js";
import { root } from "../../../index.js";
import GenerateWorkoutPage from "./GenerateWorkoutPage.js";
import AddExercisePage from "./AddExercisePage.js";
import AdminDelete from "../admin/AdminDelete.js";
import ViewExercisesPage from "./ViewExercisesPage.js";
import AdminViewAccounts from "../admin/AdminViewAccounts.js";
import AdminResetPassword from "../admin/AdminResetPassword.js";

export default function MainMenuPage() {
  const [adminOn, setAdminOn] = useState(false);
  const [splitButton, setSplitButton] = useState(false);

  // Called to render new component
  const handleClick = component => {
    root.render(component);
  };

  // Toggles button functions between user and admin
  const toggleAdmin = () => {
    setAdminOn(!adminOn);
  };

  /* Toggles between 'Generate Workout' button and 
     'New workout'/'From library' buttons */
  const toggleSplitButtons = () => {
    setSplitButton(!splitButton);
  };

  /* Tried to use 'handleClick(<GenerateWorkoutPage/>)'. That 
     syntax was causing the GenerateWorkoutPage to load without
     showing the split buttons */
  const handleNewWorkout = () => {
    root.render(<GenerateWorkoutPage />);
  };

  const handleLoadWorkout = () => {
    console.log("handleNewWorkout button clicked");
  };

  return (
    <>
      <Header heading="Workout Generator App" />
      <div className="main-menu">
        <button
          className="top-main-menu-button"
          onClick={
            adminOn
              ? () => handleClick(<AdminDelete />)
              : () => handleClick(<AddExercisePage />)
          }>
          {adminOn ? "Delete Users" : "Add Exercise"}
        </button>
        <button
          className="main-menu-button"
          onClick={
            adminOn
              ? () => handleClick(<AdminResetPassword />)
              : () => handleClick(<ViewExercisesPage />)
          }>
          {adminOn ? "Reset Passwords" : "View Exercises"}
        </button>
        {!splitButton && (
          <button
            className="main-menu-button"
            onClick={
              adminOn
                ? () => handleClick(<AdminViewAccounts />)
                : () => toggleSplitButtons()
            }>
            {adminOn ? "View Accounts" : "Generate Workout"}
          </button>
        )}
        {splitButton && (
          <div className="split-button-wrapper">
            <button className="split-button" onClick={handleNewWorkout}>
              New workout
            </button>
            <button
              className="split-button-cancel"
              onClick={toggleSplitButtons}>
              Cancel
            </button>
            <button className="split-button" onClick={handleLoadWorkout}>
              From library
            </button>
          </div>
        )}
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
