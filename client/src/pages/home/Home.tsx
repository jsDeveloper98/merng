import { FC, useState } from "react";

import { useMutation } from "@apollo/client";

import { PostList } from "./post-list";
import { useForm } from "../../hooks";
import { Form } from "../../components";
import { CREATE_POST } from "../../graphql/mutations/postMutations";
import { CREATE_POST_FORM_ITEMS, POST_ERROR_MESSAGE } from "./constants";

import * as styles from "./Home.styles";

interface IPostForm {
  body: string;
  errorsHeader: string;
}

const getPostFormInitialState = () => {
  const initialState = {} as Partial<IPostForm>;

  CREATE_POST_FORM_ITEMS.forEach((item) => {
    initialState[item.id as keyof IPostForm] = "";
  });

  return initialState;
};

export const Home: FC = () => {
  const [errors, setErrors] = useState<Partial<IPostForm>>({});
  const { onChange, values, onSubmit, onReset } = useForm<IPostForm>(
    createPostCallback,
    getPostFormInitialState()
  );

  const [createPost] = useMutation(CREATE_POST, {
    update: (_, result) => {
      onReset();
      setErrors({});
    },
    onError: (errors) => {
      let err: Partial<IPostForm> = {
        errorsHeader: POST_ERROR_MESSAGE,
      };

      if (errors.graphQLErrors.length) {
        err = {
          ...(errors.graphQLErrors[0]?.extensions.errors as Partial<IPostForm>),
          ...err,
        };
      }

      setErrors({
        ...err,
      });
    },
    variables: values,
  });

  // const likePost = () => {
  //   console.log('likePost');
  // };

  function createPostCallback(): void {
    createPost();
  }

  return (
    <styles.Home>
      <header>
        <h1>Recent Posts</h1>
      </header>

      <div className="Home-post-form-wrapper">
        <Form
          errors={errors}
          values={values}
          onSubmit={onSubmit}
          onChange={onChange}
          items={CREATE_POST_FORM_ITEMS}
        />
      </div>

      <PostList />
    </styles.Home>
  );
};
