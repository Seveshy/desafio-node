export default {
  schema: "./src/db/schema/*",
  out: "./drizzle",
  dialect: "mysql",
  dbCredentials: {
    host: "localhost",
    port: 3306,
    user: "root",
    password: "123456",
    database: "desafio_node",
  },
};
