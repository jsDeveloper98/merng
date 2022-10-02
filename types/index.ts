import { Document } from "mongoose";
import { PubSub } from "graphql-subscriptions";

export interface IRegisterInput {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface ILoginInput {
  username: string;
  password: string;
}

export interface IComment {
  id?: string;
  body: string;
  username: string;
  createdAt: string;
}

export interface ILike {
  id?: string;
  username: string;
  createdAt: string;
}

export interface IPost extends Document {
  id: string;
  body: string;
  likes: ILike[];
  createAt: string;
  username: string;
  comments: IComment[];
}

export interface IUser extends Document {
  _doc: any;
  id: string;
  email: string;
  token: string;
  password: string;
  username: string;
  createdAt: string;
}

export interface IContext {
  req: {
    headers: {
      authorization?: string;
    };
  };
  pubsub: PubSub;
}
