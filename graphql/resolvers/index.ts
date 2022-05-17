import { IPost } from "../../types";
import { postResolvers } from "./posts";
import { userResolvers } from "./users";
import { likeResolvers } from "./likes";
import { commentResolvers } from "./comments";

export const resolvers = {
  Post: {
    likesCount: (parent: IPost) => parent.likes.length,
    commentsCount: (parent: IPost) => parent.comments.length,
  },
  Query: {
    ...postResolvers.Query,
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...postResolvers.Mutation,
    ...likeResolvers.Mutation,
    ...commentResolvers.Mutation,
  },
  Subscription: {
    ...postResolvers.Subscription,
  },
};
