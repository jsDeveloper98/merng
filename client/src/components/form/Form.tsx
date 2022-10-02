import { FormEvent, ChangeEvent, memo, useMemo } from "react";

import cn from "classnames";
import { Message } from "semantic-ui-react";

import { Button } from "../button";
import { isEmpty, compact } from "../../utils";

import { IFormItems } from "./Form.types";

import * as styles from "./Form.styles";

interface FormProps<T> {
  title?: string;
  values: Partial<T>;
  items: IFormItems[];
  buttonText?: string;
  onSubmit: (e: FormEvent) => void;
  errors?: Partial<T & { errorsHeader: string }>;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const FormComp = <T extends Record<string, any>>({
  items,
  title,
  values,
  onSubmit,
  onChange,
  errors = {},
  buttonText = "Submit",
}: FormProps<T>) => {
  const errorsList = useMemo((): string[] | undefined => {
    const errList = compact<string | null>(
      Object.entries(errors).map(([key, value]: string[]) =>
        key === "errorsHeader" ? null : value
      )
    );

    if (!errList.length) {
      return;
    }

    return errList;
  }, [errors]);

  return (
    <styles.Form>
      <form onSubmit={onSubmit}>
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
        <Message error list={errorsList} header={errors?.errorsHeader} />
      )}
    </styles.Form>
  );
};

export const Form = memo(FormComp) as typeof FormComp;
