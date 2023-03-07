import "./Main.css";

export default function Main({ children }) {
  return (
    <>
      <header>
        <nav className="links-container">
          <ul>
            <li>Home</li>
            <li>Schedule</li>
            <li>About</li>
          </ul>
        </nav>
      </header>
      <main>{children}</main>
    </>
  );
}
