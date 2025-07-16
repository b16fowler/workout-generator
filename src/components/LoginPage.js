/**************************************************************************
 * LoginPage component
 **************************************************************************/

import MainMenu from "./MainMenuPage.js";
import Header from "./Header.js";
import Footer from "./Footer.js";
import FetchWrapper from "../fetchWrapper.js";
import { root, showSnackbar } from "../index.js";
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
          <label htmlFor="email">Email address: </label>
          <input type="string" id="email" placeholder="" autoFocus></input>
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
          <label htmlFor="create-account-email">Email address: </label>
          <input className="create-account-email" id="create-account-email" />
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
  const email_input = document.querySelector("#email").value;
  const password_input = document.querySelector("#password").value;
  let correct = false;

  // Get request
  const API = new FetchWrapper("http://localhost:5000/api/login");
  API.get("").then(data => {
    // Check each row for user's enter information
    data.forEach(entry => {
      // Email and password exist and are correct
      if (email_input === entry.email && password_input === entry.password) {
        correct = true;
        login();
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

function handleOpenCreateAccount() {
  // Hide 'Yes, please!' button and show create account form
  document.querySelector(".open-account-button").toggleAttribute("hidden");
  document.querySelector(".create-account-form").toggleAttribute("hidden");
}

function handleCreateAccount() {
  const new_email = document.querySelector(".create-account-email").value;
  const new_password = document.querySelector(".create-account-password").value;

  // Post request
  const API = new FetchWrapper("http://localhost:5000/api/create");
  API.post("", new_email, new_password).then(data => {
    if (data.success) {
      login();
    }
    // Clear form
    else {
      document.querySelector(".create-account-email").value = "";
      document.querySelector(".create-account-password").value = "";
    }
  });
}

function login() {
  root.render(
    <QueryClientProvider client={queryClient}>
      <MainMenu />
    </QueryClientProvider>
  );
}
