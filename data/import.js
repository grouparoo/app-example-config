const createUsersTable = require("./import/createUsersTable");
const importUsers = require("./import/importUsers");

const run = async () => {
  await createUsersTable();
  await importUsers();
};

run();
