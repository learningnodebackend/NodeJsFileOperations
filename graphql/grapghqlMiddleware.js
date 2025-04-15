const { ApolloServer, gql } = require('apollo-server');
const jwt = require('jsonwebtoken');

// Secret for signing JWT tokens
const JWT_SECRET = 'your-secret-key';

// In-memory "database"
const users = [];

// GraphQL Schema
const typeDefs = gql`
  type User {
    id: ID!
    username: String!
  }

  type Query {
    me: User
    users: [User!]!
  }

  type Mutation {
    signup(username: String!): String
    login(username: String!): String
  }
`;

// Utility to generate JWT token
const generateToken = (user) => {
  return jwt.sign(user, JWT_SECRET, { expiresIn: '1h' });
};

// Resolvers
const resolvers = {
  Query: {
    me: (_, __, context) => {
      if (!context.user) throw new Error('Not authenticated');
      return context.user;
    },
    users: () => users,
  },

  Mutation: {
    signup: (_, { username }) => {
      const existingUser = users.find((u) => u.username === username);
      if (existingUser) {
        throw new Error('Username already taken');
      }

      const newUser = { id: users.length + 1, username };
      users.push(newUser);
      return generateToken(newUser);
    },

    login: (_, { username }) => {
      const user = users.find((u) => u.username === username);
      if (!user) {
        throw new Error('User not found');
      }

      return generateToken(user);
    },
  },
};

// Middleware: extract user from token
const getUserFromToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return null;
  }
};

// Apollo Server Setup
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const token = req.headers.authorization?.replace('Bearer ', '') || '';
    const user = getUserFromToken(token);
    return { user };
  },
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
