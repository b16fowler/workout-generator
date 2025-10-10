/**************************************************************************
 * AdminAddDelete component
 **************************************************************************/

import Header from "./Header";
import Footer from "./Footer";
import ReturnHome from "./ReturnHome";
import { EC2_URL } from "..";
import { showSnackbar } from "./App";

export default function AdminDelete() {
  //TODO: FIX ERROR WHEN ATTEMPTING LOGOUT FROM ADMIN ADD DELETE COMPONENT

  //TODO: COMBINE FUNCTIONALITY OF DELETE ACCOUNT + RESET PW

  //TODO: CHANGE SQL QUERIES SO RESPONSE IS CORRECT
  const searchUser = e => {
    e.preventDefault();

    const usernameInput = document.querySelector("#delete-user-input").value;

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
        // Confirm, then delete account
        const confirm = window.confirm(
          `Delete account "` + usernameInput + `"?`
        );
        if (confirm) deleteUser(usernameInput);
      } else {
        showSnackbar(`User "` + usernameInput + `" was not found in database`);
      }
    };
    fetchUser();
  };

  const deleteUser = usernameInput => {
    const deleteFetch = () => {
      const reponse = fetch(`${EC2_URL}/api/delete`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: usernameInput,
        }),
      });
      console.log(reponse);

      if (reponse.success)
        showSnackbar(`User ${usernameInput}'s account has been deleted`);
    };

    deleteFetch(usernameInput);
  };

  return (
    <>
      <Header heading="Delete User Accounts" />
      <form className="delete-user-form" onSubmit={searchUser}>
        <label>Search user's name to delete their account</label>
        <br />
        <input type="text" id="delete-user-input"></input>
        <input
          type="Submit"
          value="Search"
          id="delete-user-search"
          onChange={searchUser}
        />
      </form>
      <ReturnHome />
      <Footer />
    </>
  );
}
