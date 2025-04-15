const db = require('./db');

const resolvers = {
  Query: {
    users: async () => {
      const { rows } = await db.query('SELECT * FROM users');
      return rows;
    },

    
    user: async (_, { id }) => {
      const { rows } = await db.query('SELECT * FROM users WHERE id = $1', [id]);
      return rows[0];
    },
  },
  Mutation: {
    createUser: async (_, { name, email }) => {
      const { rows } = await db.query(
        'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *',
        [name, email]
      );
      return rows[0];
    },
    // mutation {
    //     createUser(name: "Dhaval", email: "dhaval@example.com") {
    //       id
    //       name
    //       email
    //     }
    //   }
    updateUser: async (_, { id, name, email }) => {
      const { rows } = await db.query(
        'UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *',
        [name, email, id]
      );
      return rows[0];
    },

    // mutation {
    //     updateUser(id: "1", name: "Dhaval V", email: "dhavalv@example.com") {
    //       id
    //       name
    //       email
    //     }
    //   }  
      
    deleteUser: async (_, { id }) => {
      await db.query('DELETE FROM users WHERE id = $1', [id]);
      return `User with id ${id} deleted.`;
    },
  },
//   mutation {
//     deleteUser(id: "1")
//   }
  
};

module.exports = resolvers;
