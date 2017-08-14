import {
  graphqlAzureFunctions,
  graphiqlAzureFunctions
} from "@ulrikstrid/apollo-server-azure-functions";
import { makeExecutableSchema } from "graphql-tools";

export default function run(context, request) {
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
    graphqlAzureFunctions({
      endpointURL: '/api/graphql'
    })(context, request);
  } else if (request.method === "GET") {
    graphiqlAzureFunctions({
      endpointURL: '/api/graphql'
    })(context, request);
  }
}
