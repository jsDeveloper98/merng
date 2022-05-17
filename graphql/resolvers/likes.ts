import { IContext, IPost } from "../../types";
import { LikeController } from "../../controllers/LikeController";

export const likeResolvers = {
  Mutation: {
    toggleLike: async (
      _: any,
      { postId }: { postId: string },
      context: IContext
    ): Promise<IPost> => {
      return LikeController.toggleLike(postId, context);
    },
  },
};
