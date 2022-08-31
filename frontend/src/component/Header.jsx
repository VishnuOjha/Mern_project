import { Link } from "react-router-dom";

function Header() {
  return (
    <header>
      <div>
        <Link to="/">Goal setter</Link>
      </div>
      <ul>
        <li>
          <Link> Login</Link>
        </li>
        <li>
          <Link> Register</Link>
        </li>
      </ul>
    </header>
  );
}

export default Header;
