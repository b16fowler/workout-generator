import Clock from "./Clock";

export default function Header({ heading }) {
  return (
    <>
      <div>
        <Clock />
        <h3 className="main-menu-header">{heading}</h3>
      </div>
    </>
  );
}
