/**************************************************************************
 * LoginPage component
 **************************************************************************/

import { user, showSnackbar } from "./App.js";
import MainMenu from "./MainMenuPage.js";
import Header from "./Header.js";
import Footer from "./Footer.js";
import FetchWrapper from "../fetchWrapper.js";
import { root } from "../index.js";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function LoginPage() {
  return (
    <>
      <Header heading="Workout Generator Login" notLoggedIn={true} />
      <br />
      <br />
      <h2>Enter login information:</h2>
      <br />
      <form className="login-form">
        <div className="form-group">
          <label htmlFor="username">Username: </label>
          <input type="string" id="username" placeholder="" autoFocus></input>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password: </label>
          <input type="password" id="password" placeholder=""></input>
          <button className="show-password" onClick={handleShowPassword}>
            <img src="pw-icon.png" alt="buttonpng" border="0" />
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
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <h3>New here? Make a free account!</h3>
      <button
        className="open-account-button"
        value="Yes, please!"
        type="button"
        hidden={false}
        onClick={handleOpenCreateAccount}>
        Yes, please!
      </button>
      <form className="create-account-form" hidden={true}>
        <br />
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
      <div id="snackbar">This is the original message</div>
      <Footer />
    </>
  );
}

export const queryClient = new QueryClient();

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

  // Get request
  /* http://localhost:5000/api/login */
  const API = new FetchWrapper(
    "http://34.227.25.166:5000/api/login" // FOR HOSTING EC2
  );
  API.get("").then(data => {
    // Check each row for user's enter information
    data.forEach(entry => {
      // username and password exist and are correct
      if (
        username_input === entry.username &&
        password_input === entry.password
      ) {
        login(username_input);
        return;
      }
    });
    // Login information does not match
    showSnackbar("Login information does not match records");
  });
}

// Called when user clicks "Forgot password" button
function handleForgot() {
  // TODO: Make this do something
  showSnackbar("You hit the forgot password button");
}

function handleOpenCreateAccount() {
  // Hide 'Yes, please!' button and show create account form
  document.querySelector(".open-account-button").toggleAttribute("hidden");
  document.querySelector(".create-account-form").toggleAttribute("hidden");
}

function handleCreateAccount() {
  const new_username = document.querySelector(".create-account-username").value;
  const new_password = document.querySelector(".create-account-password").value;

  // Post request
  const API = new FetchWrapper("http://localhost:5000/api/create-account");
  const create_query = `INSERT INTO logins VALUES ("${new_username}", "${new_password}");`;
  API.post("", create_query).then(data => {
    if (data.success) {
      login(new_username);
    }
    // Alert user that username is taken and clear form
    else {
      showSnackbar(data.message);
      document.querySelector(".create-account-username").value = "";
      document.querySelector(".create-account-password").value = "";
    }
  });
}

function login(username) {
  user.name = username;
  root.render(
    <QueryClientProvider client={queryClient}>
      <MainMenu />
    </QueryClientProvider>
  );
}
