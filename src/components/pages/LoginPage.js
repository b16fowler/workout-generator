/**************************************************************************
 * LoginPage component
 **************************************************************************/

import MainMenu from "./MainMenuPage";
import Header from "../Header";
import Footer from "../Footer";
import { root } from "../../index";

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
      <Footer />
    </>
  );
}

function handleSubmit() {
  root.render(<MainMenu />);
}

function handleForgot() {
  alert("Get rekt, nerd");
}
