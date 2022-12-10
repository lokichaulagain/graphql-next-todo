import express from "express";
import { ApolloServer, gql } from "apollo-server-express";
import { typeDefs } from "./typeDefs.js";
import { resolvers } from "./resolvers.js";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

async function initServer() {
  const app = express();
  app.use(cors());
  dotenv.config();

  const apolloServer = new ApolloServer({ typeDefs, resolvers });
  await apolloServer.start();
  apolloServer.applyMiddleware({ app });
  app.use((req, res) => {
    res.send("Server started successfully");
  });

  const PORT = process.env.PORT || 4000;

  mongoose
    .connect(process.env.MONGO_DB_URI, {
      autoIndex: true,
    })
    .then(() => {
      console.log("MongoDb connected successfully !");
    })
    .catch((error) => {
      console.log("MondoDb Disconnected !!!", error);
    });

  app.listen(PORT, () => console.log(`Apollo-Express server running on port ${PORT}`));
}

initServer();
