var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/index.ts
var import_express = __toESM(require("express"));
var import_apollo_server_express = require("apollo-server-express");
var import_graphql = require("graphql");
var import_cors = __toESM(require("cors"));
var app = (0, import_express.default)();
var port = process.env.PORT || 8080;
app.use(
  (0, import_cors.default)({
    origin: (_, callback) => callback(null, true),
    exposedHeaders: ["Location"],
    credentials: true
  })
);
app.post("/", (_req, res) => {
  res.json({
    hola: "mundo"
  });
});
var apolloServer = new import_apollo_server_express.ApolloServer({
  schema: new import_graphql.GraphQLSchema({
    query: new import_graphql.GraphQLObjectType({
      name: "RootQuery",
      fields: () => ({
        order: {
          type: new import_graphql.GraphQLObjectType({
            name: "Order",
            fields: {
              id: {
                type: new import_graphql.GraphQLNonNull(import_graphql.GraphQLID)
              },
              name: {
                type: new import_graphql.GraphQLNonNull(import_graphql.GraphQLString)
              },
              information: {
                type: new import_graphql.GraphQLNonNull(import_graphql.GraphQLString)
              }
            }
          })
        }
      })
    })
  })
});
apolloServer.applyMiddleware({ app, path: "/graphql" });
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
