# How-to cheat sheet

## How do I write the schema?

The schema file defines the shape of the final GraphQL API and has very few limitations. Designing the schema file is very similar to the design of the database schema. As a rule of thumb, the schema should represent high level domain specific entities and relations between them, to make data fetching and filtering easy for the API consumers.

Typically, the API is consumed by the frontend and mobile apps, so it's a good idea to design the schema even before you go on with implementing the processor mappings. In fact, the processor is completely indpendent from the GraphQL server serving the API, so you can experiment how the API looks like.

## How do I update my schema?

TL;DR: If you're ok dropping the database, simply update `schema.graphql` and run:

```sh
bash reset-schema.sh
```

OBS! The database will be wiped out, so if it's not an option, read below. 


Here's a step-by-step instruction. First, generated the model files:

```sh
npx sqd codegen
npm run build
```

Now you have two options: either create a migration for an incremental schema update or recreate the whole schema from scratch. 

During the development process, recreating the schema is often more convenient. However, if you already have a running API in production and don't want to resync it, having an incremental update is preferable (but requires data backfilling).

### Option 1: Recreate schema from scratch

Run

```sh
bash reset-db.sh
```

### Option 2: Make an incremental update to the schema

Generate a migration for the incremental changes and apply it

```sh
npx sqd db create-migration AddMyAwesomeNewField
npx sqd db migrate
```

You can find the newly generated and applied migration in `db/migrations`.


## How do I run and test the GraphQL API?

Once the migrations are applied, simply run

```
npx squid-graphql-server
```

Observe the port (4350 by default) and navigate to `localhost:4350/graphql` to explore your API. However, you need to run the processor to start populating the database.


## How do I start the processor?

First, make sure you have compiled your project with
```
npm run build
```

Then simply run 
```
node -r dotenv/config lib/processor.js
```

Note that `-r dotenv/config` ensures that the database settings are picked up from `.env`. If you set the environment variables them elsewhere, skip it. 

## How do I deploy my API to the Subsquid Hosted service?

Login to the [Subsquid Hosted Service](https://app.subsquid.io) with your github handle to obtain a deployment key. Then create a Squid (that is, your deployment) and follow the instructions.

## How do I know which events and extrinsics I need for the handlers? 

This part depends on the runtime business-logic of the chain. The primary and the most reliable source of information is thus the Rust sources for the pallets used by the chain. 
For a quick lookup of the documentation and the data format it is often useful to check `Runtime` section of Subscan, e.g. for [Statemine](https://statemine.subscan.io/runtime). One can see the deployed pallets and drill down to events and extrinsics from there. One can also choose the spec version on the drop down.

## How do I decode the event data? And how to deal with runtime upgrades?

Runtime upgrades may change the event data and even the event logic altogether, but Squid gets you covered with a first-class support for runtime upgrades. 

Subsquid SDK comes with a tool called metadata explorer which makes it easy to keep track of all runtime upgrades happen so far.

The basic usage of the explorer is as follows (check README for details):

```sh
npx squid-substrate-metadata-explorer \
  --chain <chain endpoint here> \
  --archive <archive endpoint here> \
  --out metadataVersions.json
```

Once the exploration is done, you should define all events and calls of interest in `typegen.json`, then adjust the bundle and metadata history references and run:

```sh
npx squid-substrate-typegen typegen.json
```

A type-safe definition for each and every version of the event will be generated. Most of the time, one should be able to infer a normalized interface together with some glue code to make it fit the runtime specific versions.