# Gatsby-source-teamtailor2

Gatsby source plugin for building websites using Teamtailor as a data source.

## :warning: State of this plugin

This plugin is not well tested. Contributors are welcome.

## Install

`npm install --save gatsby-source-teamtailor2`

or

`yarn add gatsby-source-teamtailor2`

## How to use

Get a token from Teamtailor. [See documentation here](https://docs.teamtailor.com/#authentication).

```js
// In your gatsby-config.js
plugins: {
  resolve: `gatsby-source-teamtailor2`,
  options: {
    accessToken: `YOUR_TOKEN_HERE`
  }
}
```

## How to query

You can query nodes created from Teamtailor using GraphQL lkike the following:

```grahpql
query {
  allTeamtailorJob {
    nodes {
      title
      department {
        name
      }
      locations {
        city
      }
      user {
        name
      }
    }
  }
}
```

## API supported

Currently, only jobs are supported. Related departments, locations, and users for the job are fetched as well.

| Resource                  | Supported |
| ------------------------- | --------- |
| Activities                | ❌        |
| Answers                   | ❌        |
| Candidates                | ❌        |
| Companies                 | ❌        |
| Custom field value        | ❌        |
| Custom fields             | ❌        |
| Departments               | ❌        |
| Hiring Teams              | ❌        |
| Jobs                      | ✅        |
| Job Applications          | ❌        |
| Locations                 | ❌        |
| Partner Results           | ❌        |
| Picked questions          | ❌        |
| Questions                 | ❌        |
| Referrals                 | ❌        |
| Requisitions              | ❌        |
| Requisition Step Verdicts | ❌        |
| Roles                     | ❌        |
| Stages                    | ❌        |
| Todos                     | ❌        |
| Triggers                  | ❌        |
| Users                     | ❌        |
| Uploads                   | ❌        |
