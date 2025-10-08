/**************************************************************************
 * AdminViewUsers component
 **************************************************************************/

import Header from "./Header";
import Footer from "./Footer";
import UsersTable from "./UsersTable";
import ReturnHome from "./ReturnHome";

export default function AdminViewUsers() {
  /* Simple component that returns the standard Header and Footer
   * as well as a component table displaying all usernames */
  return (
    <>
      <Header heading="View Users" />
      <UsersTable />
      <ReturnHome />
      <Footer />
    </>
  );
}
