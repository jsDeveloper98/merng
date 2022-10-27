import { ILoginInput, IPostInput, IRegisterInput } from "../types";

export const validateRegisterInput = ({
  email,
  username,
  password,
  confirmPassword,
}: IRegisterInput): {
  isValid: boolean;
  errors: Partial<IRegisterInput>;
} => {
  const errors = {} as Partial<IRegisterInput>;

  if (username.trim().length < 6) {
    errors.username = "Username must be more than 5 characters!";
  }

  if (email.trim() === "") {
    errors.email = "Email must not be empty";
  } else {
    const emailRegEx =
      /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;

    if (!email.match(emailRegEx)) {
      errors.email = "Email must be a valid email address";
    }
  }

  if (password.trim().length < 6) {
    errors.password = "Password must be more than 5 characters!";
  } else if (password !== confirmPassword) {
    errors.confirmPassword = "Passwords must match!";
  }

  return {
    errors,
    isValid: Object.keys(errors).length < 1,
  };
};

export const validateLoginInput = ({
  username,
  password,
}: ILoginInput): {
  isValid: boolean;
  errors: Partial<ILoginInput>;
} => {
  const errors = {} as Partial<ILoginInput>;

  if (username.trim().length < 6) {
    errors.username = "Username must be more than 5 characters!";
  }

  if (password.trim().length < 6) {
    errors.password = "Password must be more than 5 characters!";
  }

  return {
    errors,
    isValid: Object.keys(errors).length < 1,
  };
};

export const validatePostInput = ({
  body,
}: IPostInput): {
  isValid: boolean;
  errors: Partial<IPostInput>;
} => {
  const errors = {} as Partial<IPostInput>;

  if (body.trim().length < 6) {
    errors.body = "Post title must be more than 5 characters!";
  }

  return {
    errors,
    isValid: Object.keys(errors).length < 1,
  };
};
