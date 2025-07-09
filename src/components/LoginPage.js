/**************************************************************************
 * LoginPage component
 **************************************************************************/

import MainMenu from "./MainMenuPage.js";
import Header from "./Header.js";
import Footer from "./Footer.js";
import { root, showSnackbar } from "../index.js";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { useEffect } from "react";

export default function LoginPage() {
  return (
    <>
      <Header heading="Workout Generator Login" notLoggedIn={true} />
      <br />
      <br />
      <h4>Enter login information:</h4>
      <br />
      <form className="login-form" onSubmit={handleSubmit}>
        <label htmlFor="username">Username: </label>
        <input type="string" id="username" placeholder="" autoFocus></input>
        <br />
        <br />
        <label htmlFor="password">Password: </label>
        <input type="password" id="password" placeholder=""></input>
        <br />
        <br />
        <input
          className="login-button"
          type="submit"
          value="Login"
          onClick={handleSubmit}
          onChange={handleSubmit}
        />
        <input
          className="login-button"
          type="button"
          value="Forgot Password"
          onClick={handleForgot}
          onChange={handleForgot}
        />
      </form>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <h4>New here? Make a free account!</h4>
      <button
        className="open-account-button"
        value="Yes, please!"
        type="button"
        hidden={false}
        onClick={handle_open_create_account}
      >
        Yes, please!
      </button>
      <form className="create-account-form" hidden={true}>
        <br />
        <label htmlFor="create-account-username">Username: </label>
        <input
          className="create-account-username"
          id="create-account-username"
        />
        <br />
        <br />
        <label htmlFor="create-account-email">Email address: </label>
        <input className="create-account-email" id="create-account-email" />
        <br />
        <br />
        <label htmlFor="create-account-password">Password: </label>
        <input
          className="create-account-password"
          id="create-account-password"
          type="password"
        />
        <br />
        <br />
        <input
          className="create-account-button"
          type="button"
          value="Create new account"
        />
      </form>
      <div id="snackbar">This is the original message</div>
      <Footer />
    </>
  );
}

export const queryClient = new QueryClient();

// Called when user clicks "Login" button
function handleSubmit(event) {
  event.preventDefault();

  // Pull login info entered by user
  const username_input = document.querySelector("#username").value;
  const password_input = document.querySelector("#password").value;
  let correct = false;

  // Fetch information from server to check for login
  fetch("http://localhost:5000/api/login")
    .then((res) => res.json())
    .then((data) => {
      // Check each row for user's enter information
      data.forEach((entry) => {
        // Username and password exist and are correct
        if (
          username_input === entry.username &&
          password_input === entry.password
        ) {
          correct = true; // Flip to stop alert
          // Login to MainMenuPage.js
          root.render(
            <QueryClientProvider client={queryClient}>
              <MainMenu />
            </QueryClientProvider>
          );
        }
      });
      if (!correct) {
        // Login information does not match
        showSnackbar("Login information does not match records");
      }
    });
}

// Called when user clicks "Forgot password" button
function handleForgot() {
  // TODO: Make this do something
  showSnackbar("You hit the forgot password button");
}

function handle_open_create_account() {
  document.querySelector(".open-account-button").toggleAttribute("hidden");
  document.querySelector(".create-account-form").toggleAttribute("hidden");
}
