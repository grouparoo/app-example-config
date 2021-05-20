exports.default = async function buildConfig() {
  return [
    // --- App ---
    {
      class: "app",
      id: "product_db",
      name: "product_db",
      type: "sqlite",
      options: {
        file: "data/source.sqlite",
      },
    },
    // --- Source ---
    {
      class: "source",
      id: "users",
      name: "users",
      type: "sqlite-table-import",
      appId: "product_db",
      options: {
        table: "users",
      },
      mapping: {
        id: "user_id",
      },
    },
    //  --- Schedule ---
    {
      id: "users_schedule",
      name: "users_schedule",
      class: "schedule",
      sourceId: "users",
      recurring: true,
      recurringFrequency: 1000 * 60 * 15,
      options: {
        column: "updated_at",
      },
    },
    // --- Property: email ---
    {
      id: "email",
      name: "Email",
      class: "property",
      sourceId: "users",
      type: "email",
      unique: true,
      identifying: false,
      isArray: false,
      options: {
        column: "email",
        aggregationMethod: "exact",
        sort: null,
      },
      filters: [],
    },
    // --- Property: first_name ---
    {
      id: "first_name",
      name: "First Name",
      class: "property",
      sourceId: "users",
      type: "string",
      unique: false,
      identifying: false,
      isArray: false,
      options: {
        column: "first_name",
        aggregationMethod: "exact",
        sort: null,
      },
      filters: [],
    },
    // --- Property: last_name ---
    {
      id: "last_name",
      name: "Last Name",
      class: "property",
      sourceId: "users",
      type: "string",
      unique: false,
      identifying: false,
      isArray: false,
      options: {
        column: "last_name",
        aggregationMethod: "exact",
        sort: null,
      },
      filters: [],
    },
    // --- Property: language ---
    {
      id: "language",
      name: "Language",
      class: "property",
      sourceId: "users",
      type: "string",
      unique: false,
      identifying: false,
      isArray: false,
      options: {
        column: "language",
        aggregationMethod: "exact",
        sort: null,
      },
      filters: [],
    },
    // --- Property: user-id ---
    {
      id: "user_id",
      name: "user_id",
      class: "Property",
      sourceId: "users",
      type: "integer",
      unique: true,
      identifying: true,
      isArray: false,
      options: {
        column: "id",
        aggregationMethod: "exact",
      },
    },
  ];
};
