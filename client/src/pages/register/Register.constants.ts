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

export const REGISTER_ERROR_MESSAGE = "Something went wrong with registration!";
