import {
  FormEvent,
  ChangeEvent,
  useCallback,
  HTMLInputTypeAttribute,
} from "react";

import cn from "classnames";
import { Message } from "semantic-ui-react";

import { Button } from "../button";
import { isEmpty, compact } from "../../utilities";

import * as styles from "./Form.styles";

interface IFormItems {
  id: string;
  label: string;
  required?: boolean;
  placeholder?: string;
  type?: HTMLInputTypeAttribute;
}

interface FormProps<T> {
  title?: string;
  values: Partial<T>;
  items: IFormItems[];
  buttonText?: string;
  onSubmit: (e: FormEvent) => void;
  errors?: Partial<T & { errorsHeader: string }>;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const Form = <T extends Record<string, any>>({
  items,
  title,
  values,
  onSubmit,
  onChange,
  errors = {},
  buttonText = "Submit",
}: FormProps<T>) => {
  const handleSubmit = useCallback(
    (e: FormEvent): void => {
      onSubmit(e);
    },
    [onSubmit]
  );

  const generateErrorsList = useCallback((): string[] | undefined => {
    const errorsList = compact<string | null>(
      Object.entries(errors).map(([key, value]: string[]) =>
        key === "errorsHeader" ? null : value
      )
    );

    if (!errorsList.length) {
      return;
    }

    return errorsList;
  }, [errors]);

  return (
    <styles.Form>
      <form onSubmit={handleSubmit}>
        {title && <h1>{title}</h1>}

        {items.map(({ id, type, placeholder, label, required }) => (
          <div key={id} className="row">
            <label
              htmlFor={id}
              className={cn("Form-label", {
                "Form-label-error": errors[id],
              })}
            >
              {required && "*"} {label}
            </label>
            <input
              id={id}
              name={id}
              type={type}
              value={values[id]}
              onChange={onChange}
              placeholder={placeholder}
              className={cn("Form-field", {
                "Form-field-error": errors[id],
              })}
            />
          </div>
        ))}

        <div className="btn-row">
          <Button>{buttonText}</Button>
        </div>
      </form>

      {!isEmpty(errors) && (
        <Message
          error
          list={generateErrorsList()}
          header={errors?.errorsHeader}
        />
      )}
    </styles.Form>
  );
};
