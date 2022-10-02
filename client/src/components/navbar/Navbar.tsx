import { FC, memo, MouseEvent } from "react";

import cn from "classnames";
import { Link } from "react-router-dom";

import { INavItem } from "./Navbar.types";

import * as styles from "./Navbar.styles";

interface NavbarProps {
  items: {
    leftTabs?: INavItem[];
    rightTabs?: INavItem[];
  };
  pathname: string;
}

const NavbarComp: FC<NavbarProps> = ({ items, pathname }) => {
  const handleLinkClick = (e: MouseEvent, callback?: () => void) => {
    if (callback) {
      e.preventDefault();
      callback();
    }
  };

  return (
    <styles.Navbar>
      <ul className="Navbar-list Navbar-list-left">
        {items.leftTabs?.map((item) => (
          <li
            key={item.key}
            className={cn("Navbar-list-item", {
              "Navbar-list-item-active": pathname === item.key,
            })}
          >
            <Link
              to={item.key}
              onClick={(e) => handleLinkClick(e, item.callback)}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>

      <ul className="Navbar-list Navbar-list-right">
        {items.rightTabs?.map((item) => (
          <li
            key={item.key}
            className={cn("Navbar-list-item", {
              "Navbar-list-item-active": pathname === item.key,
            })}
          >
            <Link
              to={item.key}
              onClick={(e) => handleLinkClick(e, item.callback)}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </styles.Navbar>
  );
};

export const Navbar = memo(NavbarComp);
