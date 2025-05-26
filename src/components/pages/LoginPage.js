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
      <Header heading="Workout Generator Login" />
      <br />
      <br />
      <h4>Enter login information:</h4>
      <br />
      <form className="form"></form>
      <label htmlFor="userName">Username: </label>
      <input type="string" id="userName" placeholder=""></input>
      <br />
      <br />
      <label htmlFor="password">Password: </label>
      <input type="password" id="password" placeholder=""></input>
      <br />
      <br />
      <input
        className="login-button"
        type="Submit"
        value="Login"
        onClick={handleSubmit}
        onChange={handleSubmit}
      />
      <input
        className="login-button"
        type="Submit"
        value="Forgot Password"
        onClick={handleForgot}
        onChange={handleForgot}
      />
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
