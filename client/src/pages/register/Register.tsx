import { FC, useCallback } from "react";
import { useMutation } from "@apollo/client";

import { Spinner, Form } from "../../components";
import { REGISTER_FORM_ITEMS } from "./constants";
import { REGISTER } from "../../graphql/mutations/userMutations";

import * as styles from "./Register.styles";

interface IRegisterForm {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}

export const Register: FC = () => {
  const [addUser, { loading }] = useMutation(REGISTER, {
    update(proxy, result) {
      console.log("%c result ===>", "color: #90ee90", result);
    },
  });

  const register = useCallback(
    (values: Partial<IRegisterForm>) => {
      addUser({ variables: values });
    },
    [addUser]
  );

  if (loading) {
    return <Spinner />;
  }

  return (
    <styles.Register>
      <Form<IRegisterForm>
        title="Register"
        onSubmit={register}
        items={REGISTER_FORM_ITEMS}
      />
    </styles.Register>
  );
};
