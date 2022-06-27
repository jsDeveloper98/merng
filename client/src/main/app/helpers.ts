import { INavItem } from "../../components";

interface IGetNavItems {
  leftTabs?: INavItem[];
  rightTabs?: INavItem[];
}

interface IOptions {
  logout: () => void;
}

export const getNavItems = (
  isAuthenticated: boolean,
  { logout }: IOptions
): IGetNavItems => {
  if (isAuthenticated) {
    return {
      leftTabs: [
        {
          label: "Home",
          key: "/",
        },
      ],
      rightTabs: [
        {
          label: "Logout",
          key: "/logout",
          callback: logout,
        },
      ],
    };
  }

  return {
    rightTabs: [
      {
        label: "Login",
        key: "/login",
      },
      {
        label: "Register",
        key: "/register",
      },
    ],
  };
};
