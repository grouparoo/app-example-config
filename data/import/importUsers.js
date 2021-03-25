const fs = require("fs");
const parse = require("csv-parse/lib/sync");
const path = require("path");

const { buildKeyList, buildValueList, runQuery } = require("./utils");

module.exports = async () => {
  const usersDataFilePath = path.join(__dirname, "../users.csv");
  const rows = parse(fs.readFileSync(usersDataFilePath), { columns: true });

  for (const row of rows) {
    const keys = buildKeyList(row);
    const values = buildValueList(row);
    await runQuery(`INSERT INTO users (${keys}) VALUES (${values})`);
  }
};
