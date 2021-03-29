process.env.GROUPAROO_ENV_CONFIG_FILE = `${__dirname}/__tests__/.env`;
process.env.GROUPAROO_CONFIG_DIR = `${__dirname}/__tests__/fixtures/config`;
process.env.GROUPAROO_TELEMETRY_ENABLED = false;

module.exports = {
  testEnvironment: "node",
  testPathIgnorePatterns: ["<rootDir>/__tests__/fixtures"],
};
