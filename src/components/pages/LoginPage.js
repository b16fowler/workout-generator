/**************************************************************************
 * LoginPage component
 * This component shows two forms. The base login form compares username and
 * password to values in the 'logins' table of the database. The hidden form
 * allows user to make an account and a password. This second form confirms
 * that all usernames are unique
 **************************************************************************/

import Header from "../other/Header.js";
import Footer from "../other/Footer.js";
import { useEffect, useState } from "react";
import MainMenuPage from "./MainMenuPage.js";
import { EC2_URL, root } from "../../index.js";
import { user, showSnackbar } from "../App.js";
import { accountCreated, accountLogin } from "../../analytics.js";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function LoginPage() {
  const [readyToRender, setReadyToRender] = useState(false);

  useEffect(() => {
    if (!readyToRender) return;

    showSnackbar("Logging in!");

    // Update analytics table
    accountLogin(user.username);

    // Delay render 0.75 seconds for snackbar message
    setTimeout(() => {
      root.render(
        <QueryClientProvider client={queryClient}>
          <MainMenuPage />
        </QueryClientProvider>
      );
    }, 750);
  }, [readyToRender]);

  // Called when user clicks "eye" button next to password
  function handleShowPassword(e) {
    e.preventDefault();

    // Toggle type attribute between password and string
    const passwordEle = document.querySelector("#password");
    if (passwordEle.getAttribute("type") === "password") {
      passwordEle.setAttribute("type", "string");
    } else {
      passwordEle.setAttribute("type", "password");
    }
  }

  // Called when user clicks "Login" button
  function handleLogin(event) {
    event.preventDefault();

    // Pull login info entered by user
    const username_input = document.querySelector("#username").value;
    const password_input = document.querySelector("#password").value;

    //TODO: CHANGE VALIDATION LOGIC FOR LOGIN
    fetch(`${EC2_URL}/api/login`)
      .then((response) => response.json())
      .then((data) => {
        // Check each row for user's enter information
        data.forEach((account) => {
          if (
            username_input.toLowerCase() === account.username.toLowerCase() &&
            password_input === account.password
          ) {
            login(username_input);
            return;
          }
          // Login information does not match
          showSnackbar("Login information does not match records");
        });
      });
  }

  // Called when user clicks "Forgot password" button
  function handleForgot() {
    //TODO: Make this do something
    showSnackbar("You hit the forgot password button");
  }

  function handleOpenCreateAccount() {
    // Hide 'Yes, please!' button and show create account form
    document.querySelector(".open-form-button").toggleAttribute("hidden");
    document.querySelector(".create-account-form").toggleAttribute("hidden");
  }

  function handleCreateAccount() {
    const new_username = document.querySelector(
      ".create-account-username"
    ).value;
    const new_password = document.querySelector(
      ".create-account-password"
    ).value;

    const create_query = `INSERT INTO logins VALUES ("${new_username}", "${new_password}", "user");`;
    fetch(`${EC2_URL}/api/create-account`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query: create_query, user: new_username }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          accountCreated(new_username.toLowerCase());
          login(new_username.toLowerCase());
        }
        // Alert user that username is taken, clear form
        else {
          showSnackbar(data.message);
          document.querySelector(".create-account-username").value = "";
          document.querySelector(".create-account-password").value = "";
        }
      });
  }

  function login(username) {
    /* login function sets 'user' variables username and account type
     * then updates readyToRender so main menu can be loaded */
    user.username = username.toLowerCase();

    const fetchAccountType = async () => {
      const response = await fetch(`${EC2_URL}/api/check-account-type`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: user.username,
        }),
      });
      const result = await response.json();
      // Set user.accountType
      user.accountType = result.account[0][0].type;

      // Ready to render MainMenu
      setReadyToRender(true);
    };
    fetchAccountType();
  }

  return (
    <>
      <Header heading="Workout Generator Login" notLoggedIn={true} />
      <h2 id="form-heading">Enter login information:</h2>
      <form className="login-form">
        <div className="form-group">
          <label htmlFor="username">Username: </label>
          <input type="string" id="username" placeholder="" autoFocus></input>
        </div>
        <div className="form-group">
          <label className="form-group-label" htmlFor="password">
            Password:{" "}
          </label>
          <input type="password" id="password" placeholder=""></input>
          <button
            type="button"
            className="show-password"
            onClick={handleShowPassword}
          >
            <img
              id="show-pw-img"
              src="pw-icon.png"
              alt="buttonpng"
              border="0"
            />
          </button>
        </div>
        <input
          className="login-button"
          type="submit"
          value="Login"
          onClick={handleLogin}
        />
        <input
          className="login-button"
          type="button"
          value="Forgot Password"
          onClick={handleForgot}
        />
      </form>
      <h3 id="form-heading">New here? Make a free account!</h3>
      <button
        className="open-form-button"
        value="Yes, please!"
        type="button"
        hidden={false}
        onClick={handleOpenCreateAccount}
      >
        Yes, please!
      </button>
      <form className="create-account-form" hidden={true}>
        <div className="form-group">
          <label htmlFor="create-account-username">Username: </label>
          <input
            className="create-account-username"
            id="create-account-username"
          />
        </div>
        <div className="form-group">
          <label htmlFor="create-account-password">Password: </label>
          <input
            className="create-account-password"
            id="create-account-password"
            type="password"
          />
        </div>
        <input
          className="login-button"
          type="button"
          value="Create new account"
          onClick={handleCreateAccount}
        />
      </form>
      <Footer />
    </>
  );
}

export const queryClient = new QueryClient();
