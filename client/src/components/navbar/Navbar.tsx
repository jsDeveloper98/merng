import { FC, MouseEvent, useCallback } from "react";

import cn from "classnames";
import { Link } from "react-router-dom";

import * as styles from "./Navbar.styles";

export interface INavItem {
  key: string;
  label: string;
  callback?: () => void;
}

interface NavbarProps {
  items: {
    leftTabs?: INavItem[];
    rightTabs?: INavItem[];
  };
  pathname: string;
}

export const Navbar: FC<NavbarProps> = ({ items, pathname }) => {
  const handleLinkClick = useCallback(
    (e: MouseEvent, callback?: () => void) => {
      if (callback) {
        e.preventDefault();
        callback();
      }
    },
    []
  );

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
