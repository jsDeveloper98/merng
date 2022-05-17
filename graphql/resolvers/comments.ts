import { IContext } from "../../types";
import { IPost } from "../../types/index";
import { CommentController } from "../../controllers/CommentController";

export interface ICreateComment {
  body: string;
  postId: string;
}

export interface IDeleteComment {
  postId: string;
  commentId: string;
}

export const commentResolvers = {
  Mutation: {
    createComment: async (
      _: any,
      args: ICreateComment,
      context: IContext
    ): Promise<IPost> => {
      return CommentController.create(args, context);
    },
    deleteComment: async (
      _: any,
      args: IDeleteComment,
      context: IContext
    ): Promise<IPost> => {
      return CommentController.delete(args, context);
    },
  },
};
