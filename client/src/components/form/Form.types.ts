import { HTMLInputTypeAttribute } from "react";

export interface IFormItems {
  id: string;
  label: string;
  required?: boolean;
  placeholder?: string;
  type?: HTMLInputTypeAttribute;
}
