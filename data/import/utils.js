const { promisify } = require("util");
const path = require("path");
const sqlite3 = require("sqlite3").verbose();

const dbPath = path.join(__dirname, "source.sqlite");
const db = new sqlite3.Database(dbPath);

exports.runQuery = promisify(db.all).bind(db);

exports.buildKeyList = (obj) => Object.keys(obj).join(",");

exports.buildValueList = (obj) => {
  return Object.values(obj)
    .map((x) => (["string", "object"].includes(typeof x) ? `"${x}"` : x))
    .join(",");
};
