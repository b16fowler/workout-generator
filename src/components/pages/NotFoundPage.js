import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div>
      <h1 className="main-menu-header">404 this page not found :/</h1>
      <Link to="/">Return to main menu</Link>
    </div>
  );
}
