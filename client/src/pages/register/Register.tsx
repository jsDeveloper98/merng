import { FC, useContext, useState } from "react";

import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";

import { useForm } from "../../hooks";
import { AuthContext } from "../../context";
import { Spinner, Form } from "../../components";
import { User } from "../../graphql/generated/graphql";
import { checkRequiredFields } from "../../utilities";
import { REGISTER } from "../../graphql/mutations/userMutations";
import {
  REGISTER_FORM_ITEMS,
  REGISTER_ERROR_MESSAGE,
  REGISTER_REQUIRED_FIELDS,
  REGISTER_REQUIRED_FIELDS_ERROR_MESSAGE,
} from "./constants";

import * as styles from "./Register.styles";

interface IRegisterForm {
  email: string;
  username: string;
  password: string;
  errorsHeader: string;
  confirmPassword: string;
}

export const Register: FC = () => {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const [errors, setErrors] = useState<Partial<IRegisterForm>>({});
  const { onChange, values, onSubmit } = useForm<IRegisterForm>(register);

  const [addUser, { loading }] = useMutation<{ register: User }>(REGISTER, {
    update: (_, { data }) => {
      const registerData = data?.register;

      authContext.login(registerData);
      navigate("/");
    },
    onError: ({ graphQLErrors }) => {
      let err: Partial<IRegisterForm> = {};

      if (graphQLErrors.length) {
        err = graphQLErrors[0]?.extensions.errors as Partial<IRegisterForm>;

        setErrors({
          ...err,
          errorsHeader: REGISTER_ERROR_MESSAGE,
        });
      }
    },
  });

  function register(): void {
    const allRequiredFieldsAreProvided = checkRequiredFields(
      REGISTER_REQUIRED_FIELDS,
      values
    );

    if (!allRequiredFieldsAreProvided) {
      return setErrors({
        errorsHeader: REGISTER_REQUIRED_FIELDS_ERROR_MESSAGE,
      });
    }

    addUser({ variables: values });
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
