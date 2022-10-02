import { IUser } from "./../../types";
import { UserController } from "../../controllers";
import { ILoginInput, IRegisterInput } from "../../types";

export const userResolvers = {
  Mutation: {
    login: async (
      _: any,
      { username, password }: ILoginInput
    ): Promise<IUser> => {
      return UserController.login({
        username,
        password,
      });
    },

    register: async (
      _: any,
      args: { registerInput: IRegisterInput }
    ): Promise<IUser> => {
      return UserController.register(args);
    },
  },
};
