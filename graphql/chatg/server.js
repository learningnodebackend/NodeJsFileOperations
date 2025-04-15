const express = require('express');
const cors = require('cors');
const { createServer } = require('http');
const { ApolloServer, gql } = require('apollo-server-express');
const { SubscriptionServer } = require('subscriptions-transport-ws');
const { execute, subscribe } = require('graphql');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const { PubSub } = require('graphql-subscriptions'); // ✅

const pubsub = new PubSub();

const typeDefs = gql`
  type Message {
    sender: String
    content: String
  }

  type Query {
    hello: String
  }

  type Mutation {
    sendMessage(sender: String!, content: String!): Message
  }

  type Subscription {
    messageReceived: Message
  }
`;

const resolvers = {
  Query: {
    hello: () => 'Hello, world!',
  },
  Mutation: {
    sendMessage: (_, { sender, content }) => {
      console.log("sendMessageMutation is called...")
      const message = { sender, content };
      console.log('message...',message)
      pubsub.publish('MESSAGE_RECEIVED', { messageReceived: message });
      return message;
    },
  },
  Subscription: {
    messageReceived: {
      subscribe: () => {
        console.log('📢 Subscriber connected!');
        return pubsub.asyncIterator(['MESSAGE_RECEIVED']);
      },
    },
  },
};

const schema = makeExecutableSchema({ typeDefs, resolvers });

(async () => {
  const app = express();
  app.use(cors());

  const apolloServer = new ApolloServer({ schema });
  await apolloServer.start();
  apolloServer.applyMiddleware({ app });

  const httpServer = createServer(app);
  httpServer.listen(4000, () => {
    console.log(`🚀 Server ready at http://localhost:4000${apolloServer.graphqlPath}`);

    new SubscriptionServer(
      {
        execute,
        subscribe,
        schema,
      },
      {
        server: httpServer,
        path: '/graphql',
      }
    );

    console.log('📡 Subscription server ready at ws://localhost:4000/graphql');
  });
})();
