# Grouparoo Example: Declarative Sync

This is an example Grouparoo application that is configured using declarative configuration set up by our development tool UI. It will sync data from a local SQLite database to Mailchimp.

You can learn more about how it works by [reading the documentation](https://www.grouparoo.com/docs/config/code-config). Or take a brief tour by watching [this video](https://www.youtube.com/watch?v=FCtZknaX1WA).

[![Grouparoo Development Workflow](https://img.youtube.com/vi/FCtZknaX1WA/0.jpg)](https://www.youtube.com/watch?v=FCtZknaX1WA)

## Setup

To get started, first install the dependencies:

    $ npm install

### Setup Source Database

The SQLite source database gets created from two CSV files in the `data` directory. You can create and load this data by running the import script:

    $ npm run import

### Setup Mailchimp

The destination used in this example is Mailchimp. You will need two environment variables for the syncing to work properly: `MAILCHIMP_API_KEY` and `MAILCHIMP_LIST_ID`.

Begin by copying `.env.example` to `.env`. Then scroll to the bottom of the file and fill in these two values. If you aren't familiar with connecting to Mailchimp, you can read more about [generating an API key](https://mailchimp.com/help/about-api-keys/) and [finding your list ID here](https://mailchimp.com/help/find-audience-id/).

That's it! Now your Source and Destination are ready to be used. You can run Grouparoo!

## Run

To start running Grouparoo, run the `start` script:

    $ npm start

Now you're off to the races! This will begin the import and export and will also start a UI web server, which you can visit at http://localhost:3000/.

## Updating

The configuration can be updated via our UI:

    $ npm install -g grouparoo
    $ grouparoo config

## Testing

This project is configured to run a [Jest](https://jestjs.io/) test suite. To run the tests locally, use the following command:

    $ npm run test

There is also a configuration file that can be used to run the tests using [GitHub Actions](https://github.com/features/actions). This file is `.github/workflows/test.yml`.

Note that Jest is configured to use `__tests__/.env` for environment variables and `__tests__/fixtures/config` as the directory in which to place your test configuration files. These values are set in `jest.config.js`.

## Other Grouparoo Examples

Visit https://github.com/grouparoo/app-examples to see other Grouparoo Example Projects.
