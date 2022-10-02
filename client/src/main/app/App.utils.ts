import { IGetNavItemsReturn } from "./App.types";

export const getNavItems = (
  isAuthenticated: boolean,
  { logout }: { logout: () => void }
): IGetNavItemsReturn => {
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
