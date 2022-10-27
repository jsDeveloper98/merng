import { AuthenticationError, UserInputError } from "apollo-server-core";

import { Post } from "../models";
import { IContext, IPost } from "../types";
import { checkAuth } from "../utils/check-auth";
import { validatePostInput } from "../utils/validators";

class PostC {
  async create(body: string, context: IContext): Promise<IPost> {
    const user = checkAuth(context);

    const { errors, isValid } = validatePostInput({ body });

    if (!isValid) {
      throw new UserInputError("Errors", { errors });
    }

    try {
      const newPost = new Post({
        body,
        user: user.id,
        username: user.username,
        createdAt: new Date().toISOString(),
      });

      return newPost.save();
    } catch (err) {
      throw new Error(err as string);
    }
  }

  async delete(id: string, context: IContext): Promise<string> {
    const user = checkAuth(context);

    try {
      const post = await Post.findById(id);

      if (user.username !== post?.username) {
        throw new AuthenticationError("Action not allowed");
      }

      await post?.delete();
      return "Post deleted successfully";
    } catch (err) {
      throw new Error(err as string);
    }
  }

  async getById(id: string): Promise<IPost> {
    try {
      const post = await Post.findById(id);

      if (!post) {
        throw new Error("Post not found");
      }

      return post;
    } catch (err) {
      throw new Error(err as string);
    }
  }

  async getAll(): Promise<IPost[]> {
    try {
      return Post.find().sort({ createdAt: -1 });
    } catch (err) {
      throw new Error(err as string);
    }
  }
}

export const PostController = new PostC();
