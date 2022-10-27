import { FC, useContext, useState } from "react";

import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";

import { useForm } from "../../hooks";
import { AuthContext } from "../../context";
import { Spinner, Form } from "../../components";
import { User } from "../../graphql/generated/graphql";
import { LOGIN } from "../../graphql/mutations/userMutations";
import { LOGIN_FORM_ITEMS, LOGIN_ERROR_MESSAGE } from "./Login.constants";

import * as styles from "./Login.styles";

interface ILoginForm {
  username: string;
  password: string;
  errorsHeader: string;
}

const getLoginFormInitialState = () => {
  const initialState = {} as Partial<ILoginForm>;

  LOGIN_FORM_ITEMS.forEach((item) => {
    initialState[item.id as keyof ILoginForm] = "";
  });

  return initialState;
};

export const Login: FC = () => {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const [errors, setErrors] = useState<Partial<ILoginForm>>({});
  const { onChange, values, onSubmit, onReset } = useForm<ILoginForm>(
    loginCallback,
    getLoginFormInitialState()
  );

  const [login, { loading }] = useMutation<{ login: User }>(LOGIN, {
    update: (_, { data }) => {
      const loginData = data?.login;

      authContext.login(loginData);
      onReset();
      setErrors({});
      navigate("/");
    },
    onError: (errors) => {
      let err: Partial<ILoginForm> = {
        errorsHeader: LOGIN_ERROR_MESSAGE,
      };

      if (errors.graphQLErrors.length) {
        err = {
          ...(errors.graphQLErrors[0]?.extensions
            .errors as Partial<ILoginForm>),
          ...err,
        };
      }

      setErrors({
        ...err,
      });
    },
    variables: values,
  });

  function loginCallback(): void {
    login();
  }

  if (loading) {
    return <Spinner />;
  }

  return (
    <styles.Login>
      <Form<ILoginForm>
        title="Login"
        errors={errors}
        values={values}
        onSubmit={onSubmit}
        onChange={onChange}
        items={LOGIN_FORM_ITEMS}
      />
    </styles.Login>
  );
};
