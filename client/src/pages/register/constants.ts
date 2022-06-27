export const REGISTER_FORM_ITEMS = [
  {
    id: "username",
    label: "Username",
    placeholder: "Username...",
    required: true,
  },
  {
    id: "email",
    type: "email",
    label: "Email",
    placeholder: "Email...",
    required: true,
  },
  {
    id: "password",
    type: "password",
    label: "Password",
    placeholder: "Password...",
    required: true,
  },
  {
    type: "password",
    id: "confirmPassword",
    label: "Confirm Password",
    placeholder: "Confirm Password...",
    required: true,
  },
];

export const REGISTER_REQUIRED_FIELDS = [
  "username",
  "password",
  "confirmPassword",
  "email",
];

export const REGISTER_ERROR_MESSAGE = "Something went wrong with registration!";

export const REGISTER_REQUIRED_FIELDS_ERROR_MESSAGE =
  "The required fields are not provided!";
