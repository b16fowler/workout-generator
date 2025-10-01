/**************************************************************************
 * AdminResetPassword component
 **************************************************************************/

import Header from "./Header";
import Footer from "./Footer";
import ReturnHome from "./ReturnHome";
import { EC2_URL } from "..";

export default function AdminResetPassword() {
  const searchUser = e => {
    e.preventDefault();

    // Take user's input and run SELECT query for that user
    const input = document.querySelector("#reset-pw-input").value;
    console.log("Submitted value:\n" + input);

    const fetchUser = async () => {
      try {
        const response = await fetch(`${EC2_URL}/api/search`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user: input,
          }),
        });
      } catch (err) {
        console.log("[ERROR] Error fetching users:\n" + err);
      }
    };

    // Reset form
    document.querySelector(".reset-pw-form").reset();
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
