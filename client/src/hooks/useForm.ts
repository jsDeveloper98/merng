import { ChangeEvent, FormEvent, useCallback, useState } from "react";

export const useForm = <T>(
  callback: Function,
  initialState: Partial<T> = {}
) => {
  const [values, setValues] = useState<Partial<T>>(initialState);

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>): void => {
      setValues({ ...values, [e.target.name]: e.target.value });
    },
    [values]
  );

  const onSubmit = useCallback(
    (e: FormEvent): void => {
      e.preventDefault();
      callback();
    },
    [callback]
  );

  const onReset = useCallback(
    (): void => setValues(initialState),
    [initialState]
  );

  return {
    values,
    onReset,
    onChange,
    onSubmit,
  };
};
