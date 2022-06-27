import { createContext, FC, ReactElement, useReducer } from "react";

import jwtDecode from "jwt-decode";

import { LOGIN, LOGOUT } from "./constants";
import { User } from "../graphql/generated/graphql";

interface IAuthContext {
  user: User | null;
  logout: () => void;
  login: (_userData?: User) => void;
}

interface IAuthReducerAction {
  payload?: User | null;
  type: "LOGIN" | "LOGOUT";
}

interface IAuthReducerState {
  user: null | User;
}

interface AuthProviderProps {
  children?: ReactElement;
}

const initialState = {
  user: null,
};

const token = localStorage.getItem("token") as string;

if (token) {
  // TODO give correct type instead of any
  const decodedToken = jwtDecode<any>(token);

  if (decodedToken.exp * 1000 < Date.now()) {
    localStorage.removeItem("token");
  } else {
    initialState.user = decodedToken;
  }
}

export const AuthContext = createContext<IAuthContext>({
  user: null,
  login: () => {},
  logout: () => {},
});

const authReducer = (
  state: IAuthReducerState,
  { payload = null, type }: IAuthReducerAction
): IAuthReducerState => {
  switch (type) {
    case LOGIN:
      return {
        ...state,
        user: payload,
      };
    case LOGOUT:
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};

export const AuthProvider: FC<AuthProviderProps> = (props) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = (userData?: User) => {
    if (userData?.token) {
      localStorage.setItem("token", userData.token);
    }

    dispatch({
      type: LOGIN,
      payload: userData,
    });
  };

  const logout = () => {
    localStorage.removeItem("token");

    dispatch({
      type: LOGOUT,
    });
  };

  return (
    <AuthContext.Provider
      value={{ user: state.user, login, logout }}
      {...props}
    />
  );
};
