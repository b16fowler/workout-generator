/**************************************************************************
 * AdminResetPassword component
 **************************************************************************/

import Header from "./Header";
import Footer from "./Footer";
import ReturnHome from "./ReturnHome";
import { EC2_URL } from "..";
import { showSnackbar } from "./App";

export default function AdminResetPassword() {
  //TODO: FIX ERROR WHEN ATTEMPTING LOGOUT FROM ADMIN RESET PASSWORD COMPONENT
  const searchUser = e => {
    e.preventDefault();

    // Take user's input and run SELECT query for that user
    const usernameInput = document.querySelector("#reset-pw-input").value;

    const fetchUser = async () => {
      const response = await fetch(`${EC2_URL}/api/search`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: usernameInput,
        }),
      });
      const result = await response.json();

      if (result.success) {
        // Confirm, then reset pw
        const confirm = window.confirm(
          `Reset password for user "` + usernameInput + `"?`
        );
        if (confirm) resetPw(usernameInput);
      } else {
        showSnackbar(`User "` + usernameInput + `" was not found in database`);
      }
    };
    fetchUser();

    // Reset form
    document.querySelector(".reset-pw-form").reset();
  };

  const resetPw = usernameInput => {
    const resetFetch = () => {
      const response = fetch(`${EC2_URL}/api/reset`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: usernameInput,
        }),
      });

      if (response.success)
        showSnackbar(
          `User ${usernameInput}'s password has been reset to their username`
        );
    };
    resetFetch();
  };

  return (
    <>
      <Header />
      <form className="reset-pw-form" onSubmit={searchUser}>
        <label>Search user's name to reset their password:</label>
        <input type="text" id="reset-pw-input"></input>
        <input type="Submit" value="Search" onChange={searchUser} />
      </form>
      <ReturnHome />
      <Footer />
    </>
  );
}
