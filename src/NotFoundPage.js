import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div>
      <h1>404 not found :/</h1>
      <Link to="/">Return to main menu</Link>
    </div>
  );
}
