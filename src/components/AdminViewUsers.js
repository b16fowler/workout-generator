/**************************************************************************
 * AdminViewUsers component
 **************************************************************************/

import Header from "./Header";
import Footer from "./Footer";
import UsersTable from "./UsersTable";

export default function AdminViewUsers() {
  return (
    <>
      <Header heading="View Users" />
      <UsersTable />
      <Footer />
    </>
  );
}
