/**************************************************************************
 * Footer component
 * Component displayed at the bottom of every page
 * contains author name and link to my website
 **************************************************************************/

export default function Footer() {
  return (
    <>
      <footer className="footer">
        <p className="author-info">
          Brett Fowler
          <br />
          <a href="https://b16fowler.github.io/">Website</a>
        </p>
      </footer>
    </>
  );
}
