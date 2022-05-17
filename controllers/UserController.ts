import { config } from "dotenv";
import { compare, hash } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { UserInputError } from "apollo-server-core";

import { User } from "../models";
import { ILoginInput, IRegisterInput, IUser } from "../types";
import { validateLoginInput, validateRegisterInput } from "../utils/validators";

config();

const { JWT_SECRET } = process.env;

const generateToken = (user: IUser): string => {
  return sign(
    {
      id: user.id,
      email: user.email,
      username: user.username,
    },
    JWT_SECRET as string,
    { expiresIn: "20d" }
  );
};

class UserC {
  async login({ username, password }: ILoginInput): Promise<IUser> {
    try {
      const { errors, isValid } = validateLoginInput({ username, password });

      if (!isValid) {
        throw new UserInputError("Errors", { errors });
      }

      const user = await User.findOne({ username });

      if (!user) {
        throw new UserInputError("User not found!", {
          errors: {
            general: "User not found",
          },
        });
      }

      const match = await compare(password, user.password);

      if (!match) {
        throw new UserInputError("Wrong credentials", {
          errors: {
            general: "Wrong credentials",
          },
        });
      }

      const token = generateToken(user);

      return {
        ...user._doc,
        id: user._id,
        token,
      };
    } catch (err) {
      throw new Error(err as string);
    }
  }

  async register(args: { registerInput: IRegisterInput }): Promise<IUser> {
    try {
      let { username, email, password } = args.registerInput;

      const { errors, isValid } = validateRegisterInput(args.registerInput);

      if (!isValid) {
        throw new UserInputError("Errors", { errors });
      }

      const user = await User.findOne({ username });

      if (user) {
        throw new UserInputError("Username is taken", {
          errors: {
            username: "This username is taken",
          },
        });
      }

      password = await hash(password, 12);

      const newUser = new User({
        email,
        username,
        password,
        createdAt: new Date().toISOString(),
      });

      const res = await newUser.save();
      const token = generateToken(res);

      return {
        ...res._doc,
        id: res._id,
        token,
      };
    } catch (err) {
      throw new Error(err as string);
    }
  }
}

export const UserController = new UserC();
