import {
  useState,
  FormEvent,
  ChangeEvent,
  HTMLInputTypeAttribute,
} from "react";
import { Button } from "../button";

import * as styles from "./Form.styles";

interface IFormItems {
  id: string;
  label: string;
  placeholder?: string;
  type?: HTMLInputTypeAttribute;
}

interface FormProps<T> {
  title?: string;
  items: IFormItems[];
  buttonText?: string;
  onSubmit: (e: Partial<T>) => void;
}

export const Form = <T extends unknown>({
  items,
  title,
  onSubmit,
  buttonText = "Submit",
}: FormProps<T>) => {
  const [values, setValues] = useState<Partial<T>>({});

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(values);
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <styles.Form>
      <form onSubmit={handleSubmit}>
        {title && <h1>{title}</h1>}

        {items.map(({ id, type, placeholder, label }) => (
          <div key={id} className="row">
            <label htmlFor={id}>{label}</label>
            <input
              id={id}
              name={id}
              type={type}
              onChange={onChange}
              placeholder={placeholder}
            />
          </div>
        ))}

        <div className="btn-row">
          <Button>{buttonText}</Button>
        </div>
      </form>
    </styles.Form>
  );
};
