/**************************************************************************
 * LoginPage component
 **************************************************************************/

import MainMenu from "./MainMenuPage";
import Header from "./Header";
import Footer from "./Footer";
import { root, showSnackbar } from "../index";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

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
        <input type="string" id="userName" placeholder="" autoFocus></input>
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

const queryClient = new QueryClient();

// Called when user clicks "Login" button
function handleSubmit(event) {
  event.preventDefault();

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

export { queryClient };
