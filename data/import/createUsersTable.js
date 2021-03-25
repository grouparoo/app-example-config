const { runQuery } = require("./utils");

module.exports = async () => {
  await runQuery(`
    CREATE TABLE IF NOT EXISTS users (
      "id" INTEGER PRIMARY KEY NOT NULL,
      "first_name" TEXT,
      "last_name" TEXT,
      "email" TEXT,
      "gender" TEXT,
      "ip_address" TEXT,
      "avatar" TEXT,
      "language" TEXT,
      "deactivated" boolean,
      "created_at" datetime,
      "updated_at" datetime
    )
  `);
};
