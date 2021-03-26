exports.default = async function buildConfig() {
  return [
    {
      class: "app",
      id: "product_db",
      name: "product_db",
      type: "sqlite",
      options: {
        file: "data/source.sqlite",
      },
    },
  ];
};
