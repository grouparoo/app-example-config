exports.default = async function buildConfig() {
  return [
    {
      class: "app",
      id: "product_db",
      name: "product_db",
      type: "postgres",
      options: {
        host: "localhost",
        port: 5432,
        database: "grouparoo_development", // The database name - e.g. `database: "data_warehouse"`
        schema: "demo",

        // you can also optionally set SSL options
        ssl: false, // enforce SSL connections only.  Default "false" will use ssl optionally if supported by the server.
        // ssl_cert: null,
        // ssl_key: null,
        // ssl_ca: null,
      },
    },
  ];
};
