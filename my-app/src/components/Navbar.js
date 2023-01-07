import { useCallback } from 'react';
import { Link, NavLink, useMatch, useResolvedPath } from 'react-router-dom';
import Search from './Search';

function CustomLink({ link, children, ...props }) {
  return (
    <li>
      <Link to={link} {...props}>
        {children}
      </Link>
    </li>
  );
}

export default function Navbar(props) {
  const up = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  });

  return (
    <nav className="nav">
      <Link to="/" id="title" className="site-title" onClick={up}>
        POKEMONIA
      </Link>
      <Search placeholder="search pokemon..." />
      <ul>
        <CustomLink to={props.pathMain}>
          <p>{props.main}</p>
        </CustomLink>
        <CustomLink to={props.pathSecondary}>
          <p>{props.secondary}</p>
        </CustomLink>
      </ul>
    </nav>
  );
}
