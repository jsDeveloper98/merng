import express from "express";
import mongoose from "mongoose";
import { config } from "dotenv";
import { createServer } from "http";
import { execute, subscribe } from "graphql";
import { PubSub } from "graphql-subscriptions";
import { ApolloServer } from "apollo-server-express";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { SubscriptionServer } from "subscriptions-transport-ws";

import { typeDefs, resolvers } from "./graphql";

config();

const { MONGO_URI, PORT } = process.env;

const init = async (): Promise<void> => {
  const app = express();
  const pubsub = new PubSub();
  const httpServer = createServer(app);

  const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
  });

  const server = new ApolloServer({
    schema,
    context: ({ req }) => ({ req, pubsub }),
    plugins: [
      {
        serverWillStart: async () => {
          return {
            async drainServer() {
              subscriptionServer.close();
            },
          };
        },
      },
    ],
  });

  const subscriptionServer = SubscriptionServer.create(
    {
      schema,
      execute,
      subscribe,
      onConnect: () => ({ pubsub }),
    },
    {
      server: httpServer,
      path: server.graphqlPath,
    }
  );

  await server.start();
  server.applyMiddleware({ app });

  mongoose.connect(MONGO_URI as string).then(() => {
    httpServer.listen(PORT, () =>
      console.log(`Server is now running on http://localhost:${PORT}/graphql`)
    );
  });
};

init();
