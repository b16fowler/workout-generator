/**************************************************************************
 * AdminDelete component
 *
 * Search form that will delete an account if confirmed by the admin
 **************************************************************************/

import axios from "axios";
import { EC2_URL } from "../../..";
import Header from "../other/Header";
import Footer from "../other/Footer";
import { showSnackbar } from "../App";
import ReturnHomeButton from "../buttons/ReturnHomeButton";

//TODO: COMBINE FUNCTIONALITY OF DELETE ACCOUNT + RESET PW
export default function AdminDelete() {
  const searchUser = e => {
    e.preventDefault();

    const usernameInput = document.querySelector("#delete-user-input").value;

    const fetchUser = async () => {
      const response = await axios.post(`${EC2_URL}/api/search`, {
        username: usernameInput,
      });

      if (response.data.success) {
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
      const response = await axios.post(`${EC2_URL}/api/delete`, {
        username: usernameInput,
      });

      if (response.data.success)
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
      <ReturnHomeButton />
      <Footer />
    </>
  );
}
