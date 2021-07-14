const { promisify } = require("util");
const fs = require("fs");
const parse = require("csv-parse/lib/sync");
const path = require("path");
const sqlite3 = require("sqlite3").verbose();

const dbPath = path.resolve(path.join(__dirname, "source.sqlite"));

console.log(`ℹ️  Source database path: ${dbPath}`);

// ---------------------------------------- | Checks

if (fs.existsSync(dbPath)) {
  console.log(`❌ Source database already exists - Please delete to reimport`);
  process.exit(1);
}

// ---------------------------------------- | Refs

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
    "deactivated" BOOLEAN,
    "created_at" DATETIME,
    "updated_at" DATETIME
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

const buildKeyList = (obj) => {
  return Object.keys(obj).join(",");
};

const buildValueList = (obj) => {
  const out = [];
  for (const x of Object.values(obj)) {
    if (x === null || x === undefined) {
      out.push("NULL");
    } else if (["string", "object"].includes(typeof x)) {
      out.push(`"${x}"`);
    } else {
      out.push(x);
    }
  }
  return out.join(", ");
};

const dropTable = async (tableName) => {
  const query = `DROP TABLE IF EXISTS ${tableName}`;
  await runQuery(query);
  console.log(`✅ Dropped ${tableName} table`);
};

const createTable = async (tableName) => {
  const query = `CREATE TABLE IF NOT EXISTS ${tableName} (${tableColumns[tableName]})`;
  await runQuery(query);
  console.log(`✅ Created ${tableName} table`);
};

const importCsv = async (tableName) => {
  const csvFilePath = path.join(__dirname, `${tableName}.csv`);
  const rows = parse(fs.readFileSync(csvFilePath), { columns: true });

  for (const row of rows) {
    const keys = buildKeyList(row);
    const values = buildValueList(row);
    await runQuery(`INSERT INTO ${tableName} (${keys}) VALUES (${values})`);
  }
  console.log(`✅ Imported ${tableName}.csv`);
};

const doImport = async (tableName) => {
  await dropTable(tableName);
  await createTable(tableName);
  await importCsv(tableName);
};

// ---------------------------------------- | Run!

const run = async () => {
  await doImport("users");
  await doImport("purchases");
};

run();
