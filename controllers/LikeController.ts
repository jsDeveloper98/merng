import { UserInputError } from "apollo-server-core";

import { Post } from "../models";
import { checkAuth } from "../utils/check-auth";
import { IContext, IPost, ILike } from "../types";

class LikeC {
  async toggleLike(id: string, context: IContext): Promise<IPost> {
    const { username } = checkAuth(context);

    const post = await Post.findById(id);

    if (!post) {
      throw new UserInputError("Post not found!");
    }

    if (post?.likes.find((like) => like.username === username)) {
      // Post already liked, unlike it
      post.likes = this.unlike(post, username);
    } else {
      // Not liked, like post
      post.likes = this.like(post, username);
    }

    return post.save();
  }

  private like(post: IPost, username: string): ILike[] {
    post.likes.push({
      username,
      createdAt: new Date().toISOString(),
    });

    return post.likes;
  }

  private unlike(post: IPost, username: string): ILike[] {
    return post.likes.filter((like) => like.username !== username);
  }
}

export const LikeController = new LikeC();
