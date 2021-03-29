const { helper } = require("@grouparoo/spec-helper");

describe("snapshot", () => {
  helper.grouparooTestServer();

  test("Thomas Murrhardt is imported properly", async () => {
    const { snapshot } = await helper.getProfile({ user_id: 534 });

    expect(snapshot.properties["Email"].values[0]).toBe(
      "tmurrhardtet@demo.com"
    );
  });
});
