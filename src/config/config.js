require("dotenv").config();
const config = {
  development: {
    username: "db_siakbaak_owner",
    password: "YZ2p7DLtwaez",
    database: "db_siakbaak",
    host: "ep-damp-fog-a10p5bcq-pooler.ap-southeast-1.aws.neon.tech",
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
  production: {
    username: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    host: process.env.PGHOST,
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
};

module.exports = config;
