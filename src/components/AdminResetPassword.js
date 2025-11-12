/**************************************************************************
 * AdminResetPassword component
 *
 * Search form that allows admins to search for an existing user in the
 * database and reset their password
 * Currently always resets password to be their username
 **************************************************************************/

import Header from "./Header";
import Footer from "./Footer";
import ReturnHome from "./ReturnHomeButton";
import { showSnackbar } from "./App";
import { EC2_URL } from "..";

export default function AdminResetPassword() {
  //TODO: FIX ERROR WHEN ATTEMPTING LOGOUT FROM ADMIN RESET PASSWORD COMPONENT

  //TODO: PROMPT USER TO ENTER NEW PASSWORD AFTER BEING RESET
  const searchUser = (e) => {
    e.preventDefault();

    // Take user's input and run SELECT query for that user
    const usernameInput = document.querySelector("#reset-pw-input").value;

    // fetches username using admin's form input
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
        // Inform admin that username was not found in DB
        showSnackbar(`User "` + usernameInput + `" was not found in database`);
      }
    };

    /* Account with name 'admin' is designed as a sample account
     * no edits/deletions are allowed */
    if (usernameInput === "admin")
      alert(
        "This account is for testing only. You may not reset it's password :("
      );
    else fetchUser();

    // Reset form
    document.querySelector(".reset-pw-form").reset();
  };

  /* Called after fetchUser, fetch runs post request that resets the account's
   * password to be their username */
  const resetPw = (usernameInput) => {
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
          `User "${usernameInput}" password has been reset to their username`
        );
    };
    resetFetch();
  };

  return (
    <>
      <Header heading="Reset Passwords" />
      <form className="reset-pw-form" onSubmit={searchUser}>
        <label>Search user's name to reset their password</label>
        <br />
        <input type="text" id="reset-pw-input"></input>
        <input
          type="Submit"
          value="Search"
          id="reset-pw-search"
          onChange={searchUser}
        />
      </form>
      <ReturnHome />
      <Footer />
    </>
  );
}
