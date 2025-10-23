/**************************************************************************
 * AdminDelete component
 *
 * Search form that will delete an account if confirmed by the admin
 **************************************************************************/

import Header from "./Header";
import Footer from "./Footer";
import ReturnHome from "./ReturnHome";
import { showSnackbar } from "./App";

export default function AdminDelete() {
  //TODO: COMBINE FUNCTIONALITY OF DELETE ACCOUNT + RESET PW
  const searchUser = e => {
    e.preventDefault();

    const usernameInput = document.querySelector("#delete-user-input").value;

    const fetchUser = async () => {
      const response = await fetch("/api/search", {
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

    /* Account with name 'admin' is designed as a sample account
     * no edits/deletions are allowed */
    if (usernameInput === "admin")
      alert("This account is for testing only. You may not delete it :(");
    else fetchUser();
  };

  const deleteUser = usernameInput => {
    const deleteFetch = async () => {
      const response = await fetch("/api/delete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: usernameInput,
        }),
      });
      const result = await response.json();

      if (result.success)
        showSnackbar(`User "${usernameInput}" account has been deleted`);
    };
    deleteFetch();
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
