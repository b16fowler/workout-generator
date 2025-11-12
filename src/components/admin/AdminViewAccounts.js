/**************************************************************************
 * AdminViewAccounts component
 *
 * Simple component that returns the standard Header and Footer
 * as well as a component table displaying all usernames
 **************************************************************************/

import Header from "../other/Header";
import Footer from "../other/Footer";
import UsersTable from "../tables/AccountsTable";
import ReturnHomeButton from "../buttons/ReturnHomeButton";

export default function AdminViewAccounts() {
  return (
    <>
      <Header heading="View Accounts" />
      <UsersTable />
      <ReturnHomeButton />
      <Footer />
    </>
  );
}
