const { promisify } = require("util");
const fs = require("fs");
const parse = require("csv-parse/lib/sync");
const path = require("path");
const sqlite3 = require("sqlite3").verbose();

// ---------------------------------------- | Refs

const dbPath = path.join(__dirname, "./source.sqlite");
const db = new sqlite3.Database(dbPath);

const tableColumns = {
  users: `
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
  `,
  purchases: `
    "id" INTEGER PRIMARY KEY NOT NULL,
    "user_id" INTEGER,
    "item" INTEGER,
    "category" TEXT,
    "price" NUMERIC,
    "state" TEXT,
    "created_at" TEXT
  `,
};

// ---------------------------------------- | Utils

const runQuery = promisify(db.all).bind(db);

const buildKeyList = (obj) => Object.keys(obj).join(",");

const buildValueList = (obj) => {
  return Object.values(obj)
    .map((x) => (["string", "object"].includes(typeof x) ? `"${x}"` : x))
    .join(",");
};

const createTable = async (tableName) => {
  const query = `CREATE TABLE IF NOT EXISTS ${tableName} (${tableColumns[tableName]})`;
  await runQuery(query);
};

const importCsv = async (tableName) => {
  const csvFilePath = path.join(__dirname, `./${tableName}.csv`);
  const rows = parse(fs.readFileSync(csvFilePath), { columns: true });

  for (const row of rows) {
    const keys = buildKeyList(row);
    const values = buildValueList(row);
    await runQuery(`INSERT INTO ${tableName} (${keys}) VALUES (${values})`);
  }
};

const doImport = async (tableName) => {
  await createTable(tableName);
  await importCsv(tableName);
};

// ---------------------------------------- | Run!

const run = async () => {
  await doImport("users");
  await doImport("purchases");
};

run();
