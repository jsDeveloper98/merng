import { FC, useContext, useState } from "react";

import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";

import { useForm } from "../../hooks";
import { AuthContext } from "../../context";
import { Spinner, Form } from "../../components";
import { User } from "../../graphql/generated/graphql";
import { REGISTER } from "../../graphql/mutations/userMutations";
import { REGISTER_FORM_ITEMS, REGISTER_ERROR_MESSAGE } from "./Register.constants";

import * as styles from "./Register.styles";

interface IRegisterForm {
  email: string;
  username: string;
  password: string;
  errorsHeader: string;
  confirmPassword: string;
}

const getRegisterFormInitialState = () => {
  const initialState = {} as Partial<IRegisterForm>;

  REGISTER_FORM_ITEMS.forEach((item) => {
    initialState[item.id as keyof IRegisterForm] = "";
  });

  return initialState;
};

export const Register: FC = () => {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const [errors, setErrors] = useState<Partial<IRegisterForm>>({});
  const { onChange, values, onSubmit, onReset } = useForm<IRegisterForm>(
    registerCallback,
    getRegisterFormInitialState()
  );

  const [register, { loading }] = useMutation<{ register: User }>(REGISTER, {
    update: (_, { data }) => {
      const registerData = data?.register;

      authContext.login(registerData);
      onReset();
      setErrors({});
      navigate("/");
    },
    onError: (errors) => {
      let err: Partial<IRegisterForm> = {
        errorsHeader: REGISTER_ERROR_MESSAGE,
      };

      if (errors.graphQLErrors.length) {
        err = {
          ...(errors.graphQLErrors[0]?.extensions
            .errors as Partial<IRegisterForm>),
          ...err,
        };
      }

      setErrors({
        ...err,
      });
    },
    variables: values,
  });

  function registerCallback(): void {
    register();
  }

  if (loading) {
    return <Spinner />;
  }

  return (
    <styles.Register>
      <Form<IRegisterForm>
        errors={errors}
        values={values}
        title="Register"
        onSubmit={onSubmit}
        onChange={onChange}
        items={REGISTER_FORM_ITEMS}
      />
    </styles.Register>
  );
};
