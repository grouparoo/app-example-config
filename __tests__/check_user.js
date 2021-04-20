const { helper, relaxedSnapshot } = require("@grouparoo/spec-helper");

describe("check users", () => {
  // utility to start and stop the server within the test suite
  helper.grouparooTestServer({ truncate: true });

  test("mailchimp user", async () => {
    const { profile, snapshot } = await helper.getProfile({
      user_id: 22,
    });

    // You can do snapshot testing
    // `relaxedSnapshot` lets you skip time and UUID generated properties, but ensure everything else matches exactly
    expect(snapshot).toMatchSnapshot(relaxedSnapshot(snapshot));

    // Or you can test the properties of the snapshot directly
    expect(snapshot.groups.map((g) => g.name).sort()).toEqual(["all_emails"]);
    expect(snapshot.exports.map((g) => g.destinationName).sort()).toEqual([
      "newsletter",
    ]);

    const mailchimpData = snapshot.exports[0].newProfileProperties;
    const mailchimpTags = snapshot.exports[0].newGroups.sort();
    expect(mailchimpData).toEqual({
      FNAME: "Lisabeth",
      LNAME: "Auld",
      email_address: "lauldl@demo.com",
      language: "English",
    });
    expect(mailchimpTags).toEqual([]);
  });

  test("mailchimp tagged user", async () => {
    const { profile, snapshot } = await helper.getProfile({
      user_id: 88,
    });

    // You can do snapshot testing
    // `relaxedSnapshot` lets you skip time and UUID generated properties, but ensure everything else matches exactly
    expect(snapshot).toMatchSnapshot(relaxedSnapshot(snapshot));

    // Or you can test the properties of the snapshot directly
    expect(snapshot.groups.map((g) => g.name).sort()).toEqual([
      "all_emails",
      "high_value_spanish_speakers",
    ]);
    expect(snapshot.exports.map((g) => g.destinationName).sort()).toEqual([
      "newsletter",
    ]);

    const mailchimpData = snapshot.exports[0].newProfileProperties;
    const mailchimpTags = snapshot.exports[0].newGroups.sort();
    expect(mailchimpData).toEqual({
      FNAME: "Alena",
      LNAME: "Triggs",
      email_address: "atriggs2f@demo.com",
      language: "Spanish",
    });
    expect(mailchimpTags).toEqual(["High Value Spanish Speakers"]);
  });
});
