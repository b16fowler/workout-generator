/**************************************************************************
 * NotFoundPage Component
 **************************************************************************/

import { Link } from "react-router-dom";
import Header from "../Header";

export default function NotFoundPage() {
  return (
    <div>
      <Header />
      <h2>404 this page not found :/</h2>
      <Link to="/">Return to main menu</Link>
    </div>
  );
}
