import cn from "classnames";
import { FC, useState } from "react";
import { Link } from "react-router-dom";

import * as styles from "./Navbar.styles";

interface IItem {
  key: string;
  label: string;
}

interface NavbarProps {
  items: {
    leftTabs?: IItem[];
    rightTabs?: IItem[];
  };
  defaultActiveKey?: string;
}

export const Navbar: FC<NavbarProps> = ({ items, defaultActiveKey }) => {
  const [activeKey, setActiveKey] = useState(defaultActiveKey);

  return (
    <styles.Navbar>
      {items.leftTabs?.length && (
        <ul className="Navbar-list Navbar-list-left">
          {items.leftTabs.map((item) => (
            <li
              key={item.key}
              onClick={() => setActiveKey(item.key)}
              className={cn("Navbar-list-item", {
                "Navbar-list-item-active": activeKey === item.key,
              })}
            >
              <Link to={item.key}>{item.label}</Link>
            </li>
          ))}
        </ul>
      )}

      {items.rightTabs?.length && (
        <ul className="Navbar-list Navbar-list-right">
          {items.rightTabs?.map((item) => (
            <li
              key={item.key}
              onClick={() => setActiveKey(item.key)}
              className={cn("Navbar-list-item", {
                "Navbar-list-item-active": activeKey === item.key,
              })}
            >
              <Link to={item.key}>{item.label}</Link>
            </li>
          ))}
        </ul>
      )}
    </styles.Navbar>
  );
};
