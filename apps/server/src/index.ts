import express from "express";
import { ApolloServer } from "apollo-server-express";
import {
  GraphQLID,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from "graphql";
import cors from "cors";

const app = express();

const port = process.env.PORT || 8080;

app.use(
  cors({
    origin: (_, callback) => callback(null, true),
    exposedHeaders: ["Location"],
    credentials: true,
  })
);

app.post("/", (_req, res) => {
  res.json({
    hola: "mundo",
  });
});

app.get("/", (_req, res) => {
  res.send("Hola mundo");
});

const apolloServer = new ApolloServer({
  schema: new GraphQLSchema({
    query: new GraphQLObjectType({
      name: "RootQuery",
      fields: () => ({
        order: {
          type: new GraphQLObjectType({
            name: "Order",
            fields: {
              id: {
                type: new GraphQLNonNull(GraphQLID),
              },
              name: {
                type: new GraphQLNonNull(GraphQLString),
              },
              information: {
                type: new GraphQLNonNull(GraphQLString),
              },
            },
          }),
        },
      }),
    }),
  }),
});

apolloServer.applyMiddleware({ app, path: "/graphql" });

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
