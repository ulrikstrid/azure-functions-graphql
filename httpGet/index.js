import graphQLServer from "@ulrikstrid/apollo-server-azure-functions";
import graphqlTools from "graphql-tools";
import { makeExecutableSchema } from "graphql-tools";

export default function run(context, request) {
  context.log(graphqlTools);

  const typeDefs = `
    type Random {
      id: Int!
      rand: String
    }

    type Query {
      rands: [Random]
      rand(id: Int!): Random
    }
  `;

  const rands = [{ id: 1, rand: "random" }, { id: 2, rand: "modnar" }];

  const resolvers = {
    Query: {
      rands: () => rands,
      rand: (_, { id }) => rands.find(rand => rand.id === id)
    }
  };

  const schema = makeExecutableSchema({
    typeDefs,
    resolvers
  });

  if (request.method === "POST") {
    graphQLServer.graphqlAzureFunctions(context, request);
  } else if (request.method === "GET") {
    graphQLServer.graphiqlAzureFunctions(context, request);
  }
}
