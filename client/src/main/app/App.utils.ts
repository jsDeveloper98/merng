
import { PATHS } from "../routes/constants";

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
          key: PATHS.INDEX,
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
        key: PATHS.LOGIN,
      },
      {
        label: "Register",
        key: PATHS.REGISTER,
      },
    ],
  };
};
