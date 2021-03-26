exports.default = async function buildConfig() {
  return [
    /**
     * --------------------
     * Source
     * --------------------
     */
    {
      class: "source",
      id: "purchases",
      name: "purchases",
      type: "sqlite-table-import",
      appId: "product_db", // Set this value to the ID of the App this Source uses - e.g. `appId: "data_warehouse"`
      options: {
        table: "purchases", // Name of the table in your DB - e.g. `table: "users"`
      },

      /**
       * A list of mappings for this source as:
       *
       *     "remote_column": "grouparoo_property_id"
       *
       * For example, if your users table has an `id` column, and you want to map that to the
       * `user_id` property in this Grouparoo source, your mapping would look like:
       *
       *     mapping: { id: "user_id" }
       *
       * If this is the first Source for this App, you'll want to create a property in the
       * bootstrappedProperty section below. Otherwise, you can create properties with the Grouparoo
       * CLI.
       */
      mapping: {
        user_id: "user_id",
      },

      /**
       * If this is the first Source for this App, you must bootstrap it with an initial property.
       * To do so, uncomment the lines below and fill in the appropriate values. Otherwise, you can
       * create properties with the Grouparoo CLI.
       */
      // bootstrappedProperty: {
      //   id: "user_id",
      //   name: "User Id",
      //   type: "integer",
      //   options: {
      //     column: "id",
      //   },
      // },
    },

    /**
     * ---------------
     * Schedule
     * ---------------
     *
     * A Schedule tells Grouparoo how frequently to check the Source for updated
     * data and import it into the application database. If you would like to
     * set a Schedule for this Source, uncomment the following section.
     */
    {
      id: "purchases_schedule",
      name: "purchases_schedule",
      class: "schedule",
      sourceId: "purchases", // The ID of the Source above
      recurring: true, // should this Schedule regularly run?
      recurringFrequency: 1000 * 60 * 15, // 15 minutes, in ms
      options: {
        column: "created_at", // the column to check for new records in table which this Schedule's Source is using (e.g. column: 'updated_at')
      },
    },
  ];
};
