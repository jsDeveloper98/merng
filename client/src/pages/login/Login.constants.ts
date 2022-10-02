export const LOGIN_FORM_ITEMS = [
  {
    id: "username",
    label: "Username",
    placeholder: "Username...",
    required: true,
  },
  {
    id: "password",
    type: "password",
    label: "Password",
    placeholder: "Password...",
    required: true,
  },
];

export const LOGIN_ERROR_MESSAGE = "Something went wrong with login!";

export const LOGIN_REQUIRED_FIELDS = ["username", "password"];

export const LOGIN_REQUIRED_FIELDS_ERROR_MESSAGE =
  "The required fields are not provided!";
