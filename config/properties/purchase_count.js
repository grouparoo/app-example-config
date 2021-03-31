exports.default = async function buildConfig() {
  return [
    {
      id: "purchase_count",
      name: "purchase_count",
      class: "property",
      sourceId: "purchases", // The ID of the Source that this Property belongs to - e.g. `sourceId: "users_table"`
      type: "integer", // The type of the Property.  Options are: "boolean", "date", "email", "float", "integer", "phoneNumber", "string", "url"
      unique: false, // Will Profiles have unique records for this Property?
      identifying: false, // Should we consider this property Identifying in the UI? Only one Property can be identifying.
      isArray: false, // Is this an Array Property?
      options: {
        column: "price", // The column to use for this Property - e.g. `column: "first_name"`
        aggregationMethod: "count", // The aggregation method.  Options are: "exact", "average", "count", "sum", "min", "max", "most recent value", "least recent value"
        sort: null, // You can sort the results by another column in this table
      },

      // You can optionally filter the results of this Property.
      // For example, if you were collecting SUM(purchases.value) and wanted to exclude those refunded purchases, you could:
      //   filters: [{ key: "state", op: "equals", match: "successful" }],
      // Options for `op` are: equals, does not equal, greater than, greater than or equal to, less than, less than or equal to, contains, does not contain, in
      filters: [{ key: "state", op: "equals", match: "successful" }],
    },
  ];
};
