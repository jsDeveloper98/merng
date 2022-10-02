import { IContext, IPost } from "../../types";
import { PostController } from "../../controllers";

export const postResolvers = {
  Query: {
    getPosts: async (): Promise<IPost[]> => {
      return PostController.getAll();
    },

    getPost: async (_: any, { postId }: { postId: string }): Promise<IPost> => {
      return PostController.getById(postId);
    },
  },
  Mutation: {
    createPost: async (
      _: any,
      { body }: { body: string },
      context: IContext
    ): Promise<IPost> => {
      const post = await PostController.create(body, context);

      context.pubsub.publish("POST_CREATED", {
        postCreated: post,
      });

      return post;
    },

    deletePost: async (
      _: any,
      { postId }: { postId: string },
      context: IContext
    ): Promise<string> => {
      return PostController.delete(postId, context);
    },
  },
  Subscription: {
    postCreated: {
      subscribe: (_: any, __: any, context: IContext) => {
        return context.pubsub.asyncIterator("POST_CREATED");
      },
    },
  },
};
