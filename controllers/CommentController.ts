import { AuthenticationError, UserInputError } from "apollo-server-core";

import { Post } from "../models";
import { IContext, IPost } from "../types";
import { checkAuth } from "../utils/check-auth";
import { ICreateComment, IDeleteComment } from "../graphql/resolvers/comments";

class CommentC {
  async create(
    { postId, body }: ICreateComment,
    context: IContext
  ): Promise<IPost> {
    try {
      const { username } = checkAuth(context);

      if (body.trim() === "") {
        throw new UserInputError("Empty Comment", {
          errors: {
            body: "Comment body is required!",
          },
        });
      }

      const post = await Post.findById(postId);

      if (!post) {
        throw new UserInputError("Post not found");
      }

      post.comments.unshift({
        body,
        username,
        createdAt: new Date().toISOString(),
      });

      return post.save();
    } catch (err) {
      throw new Error(err as string);
    }
  }

  async delete(
    { postId, commentId }: IDeleteComment,
    context: IContext
  ): Promise<IPost> {
    try {
      const { username } = checkAuth(context);

      const post = await Post.findById(postId);

      if (!post) {
        throw new UserInputError("Post not found");
      }

      const commentIndex = post?.comments.findIndex(
        (comment) => comment.id === commentId
      );

      if (post?.comments[commentIndex].username === username) {
        post.comments.splice(commentIndex, 1);
        return post.save();
      }

      throw new AuthenticationError("Action not allowed!");
    } catch (err) {
      throw new Error(err as string);
    }
  }
}

export const CommentController = new CommentC();
