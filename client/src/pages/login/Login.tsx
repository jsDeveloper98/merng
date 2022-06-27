import { FC, useContext, useState } from "react";

import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";

import { useForm } from "../../hooks";
import { AuthContext } from "../../context";
import { Spinner, Form } from "../../components";
import { User } from "../../graphql/generated/graphql";
import { checkRequiredFields } from "../../utilities";
import { LOGIN } from "../../graphql/mutations/userMutations";
import {
  LOGIN_FORM_ITEMS,
  LOGIN_ERROR_MESSAGE,
  LOGIN_REQUIRED_FIELDS,
  LOGIN_REQUIRED_FIELDS_ERROR_MESSAGE,
} from "./constants";

import * as styles from "./Login.styles";

interface ILoginForm {
  username: string;
  password: string;
  errorsHeader: string;
}

export const Login: FC = () => {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const [errors, setErrors] = useState<Partial<ILoginForm>>({});
  const { onChange, values, onSubmit } = useForm<ILoginForm>(login);

  const [addUser, { loading }] = useMutation<{ login: User }>(LOGIN, {
    update: (_, { data }) => {
      const loginData = data?.login;

      authContext.login(loginData);
      navigate("/");
    },
    onError: ({ graphQLErrors }) => {
      let err: Partial<ILoginForm> = {};

      if (graphQLErrors.length) {
        err = graphQLErrors[0]?.extensions.errors as Partial<ILoginForm>;

        setErrors({
          ...err,
          errorsHeader: LOGIN_ERROR_MESSAGE,
        });
      }
    },
  });

  function login(): void {
    const allRequiredFieldsAreProvided = checkRequiredFields(
      LOGIN_REQUIRED_FIELDS,
      values
    );

    if (!allRequiredFieldsAreProvided) {
      return setErrors({
        errorsHeader: LOGIN_REQUIRED_FIELDS_ERROR_MESSAGE,
      });
    }

    addUser({ variables: values });
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
