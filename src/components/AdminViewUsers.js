/**************************************************************************
 * AdminViewUsers component
 *
 * Simple component that returns the standard Header and Footer
 * as well as a component table displaying all usernames
 **************************************************************************/

import Header from "./Header";
import Footer from "./Footer";
import UsersTable from "./AccountsTable";
import ReturnHome from "./ReturnHome";

export default function AdminViewUsers() {
  return (
    <>
      <Header heading="View Users" />
      <UsersTable />
      <ReturnHome />
      <Footer />
    </>
  );
}
