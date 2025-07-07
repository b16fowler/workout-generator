/**************************************************************************
 * LoginPage component
 **************************************************************************/

import MainMenu from "./MainMenuPage.js";
import Header from "./Header.js";
import Footer from "./Footer.js";
import { root, showSnackbar } from "../index.js";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import check_login from "../server.js";

export default function LoginPage() {
  return (
    <>
      <Header heading="Workout Generator Login" notLoggedIn={true} />
      <br />
      <br />
      <h4>Enter login information:</h4>
      <br />
      <form className="form" onSubmit={handleSubmit}>
        <label htmlFor="userName">Username: </label>
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
      <div id="snackbar">This is the original message</div>
      <Footer />
    </>
  );
}

export const queryClient = new QueryClient();

// Called when user clicks "Login" button
function handleSubmit(event) {
  event.preventDefault();

  // Check username and password
  // check_login();

  root.render(
    <QueryClientProvider client={queryClient}>
      <MainMenu />
    </QueryClientProvider>
  );
}

// Called when user clicks "Forgot password" button
function handleForgot() {
  // TODO: Make this do something
  showSnackbar("You hit the forgot password button");
}
