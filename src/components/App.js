/**************************************************************************
 * App component
 **************************************************************************/

import LoginPage from "./LoginPage.js";
import "../css/index.css";

// Empty string when not logged in, set to username after log in
const user = {
  _name: "",
  get name() {
    return this._name;
  },
  set name(value) {
    this._name = value;
  },
};

export default function App() {
  return (
    <div className="App">
      <LoginPage />
    </div>
  );
}

export { user };
