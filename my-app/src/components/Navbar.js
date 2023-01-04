import { Link, NavLink, useMatch, useResolvedPath } from 'react-router-dom';
import Search from './Search';

export default function Navbar(props) {
  function up() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }
  return (
    <nav className="nav">
      <Link to="/" id="title" className="site-title" onClick={up}>
        POKEMONIA
      </Link>
      <Search placeholder="search pokemon..." />
      <ul>
        <CustomLink to="/signup">
          <p>{props.main}</p>
        </CustomLink>
        <CustomLink to="/login">
          <p>{props.secondary}</p>
        </CustomLink>
      </ul>
    </nav>
  );
}

function CustomLink({ link, children, ...props }) {
  return (
    <li>
      <Link to={link} {...props}>
        {children}
      </Link>
    </li>
  );
}
