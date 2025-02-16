# Welcome, a fellow developer, I'm glad you are here!

We need to build a very simple time-based line chart, nothing fancy really, **without resorting to any charting lib** using a prepared firebase collection.

-   NO charting lib, I believe angular provides enough tools to build a simple line chart, also it will be a nice showcase
    of one's architectural skills.
-   We should be able to switch between 4 cryptocurrencies defined on the constant `CRYPTO_CURRENCIES_PRICES_COLLECTION_NAME`.
-   When a currency is selected, we draw a line chart where the X-axis is time, and the Y-axis is the tick's price. No need for labels, just a line.
-   By default, BTC is selected.
-   On the repository, you will find a preconfigured firebase service whose purpose is to help you to query mock prices per cryptocurrency generated by a firebase function. By default the cryptocurrencies collection is empty if no one works with it; otherwise querying the firebase collection returns all the prices` documents on the collection which could be thousands of records, so we should build a query to take only N last records.
-   The price's document ID is a timestamp of the record's adding to the collection to be used for the X-axis.
-   So the moment one subscribes to the collection the one will either get N records instantly or an empty array, to start getting prices we must turn on real-time mode for a given cryptocurrency; there is an example on `firebase.service.ts` of how and what model is returned `onSnapshot` change. The real-time mode gets turned off in 15 mins.
-   Best practices are welcome, e.g. SOLID, etc. It should be designed to be maintainable to an extent.
-   Tests are not necessary.
-   Please use repositories formatting.
-   Eslint rules there for a reason. On the company we use them. Disabling must be convincingly justified.

---

# Crypto Currencies Prices Line Chart

This project was generated using [Nx](https://nx.dev).

<p style="text-align: center;"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="450"></p>

🔎 **Powerful, Extensible Dev Tools**

## Quick Start & Documentation

[Nx Documentation](https://nx.dev/angular)

[10-minute video showing all Nx features](https://nx.dev/angular/getting-started/what-is-nx)

[Interactive Tutorial](https://nx.dev/angular/tutorial/01-create-application)

## Adding capabilities to your workspace

Nx supports many plugins which add capabilities for developing different types of applications and different tools.

These capabilities include generating applications, libraries, etc as well as the devtools to test, and build projects as well.

Below are our core plugins:

-   [Angular](https://angular.io)
    -   `ng add @nrwl/angular`
-   [React](https://reactjs.org)
    -   `ng add @nrwl/react`
-   Web (no framework frontends)
    -   `ng add @nrwl/web`
-   [Nest](https://nestjs.com)
    -   `ng add @nrwl/nest`
-   [Express](https://expressjs.com)
    -   `ng add @nrwl/express`
-   [Node](https://nodejs.org)
    -   `ng add @nrwl/node`

There are also many [community plugins](https://nx.dev/nx-community) you could add.

## Generate an application

Run `ng g @nrwl/angular:app my-app` to generate an application.

> You can use any of the plugins above to generate applications as well.

When using Nx, you can create multiple applications and libraries in the same workspace.

## Generate a library

Run `ng g @nrwl/angular:lib my-lib` to generate a library.

> You can also use any of the plugins above to generate libraries as well.

Libraries are shareable across libraries and applications. They can be imported from `@bp/mylib`.

## Development server

Run `ng serve my-app` for a dev server. Navigate to http://localhost:4200/. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng g component my-component --project=my-app` to generate a new component.

## Build

Run `ng build my-app` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test my-app` to execute the unit tests via [Jest](https://jestjs.io).

Run `nx affected:test` to execute the unit tests affected by a change.

## Running end-to-end tests

Run `ng e2e my-app` to execute the end-to-end tests via [Cypress](https://www.cypress.io).

Run `nx affected:e2e` to execute the end-to-end tests affected by a change.

## Understand your workspace

Run `nx dep-graph` to see a diagram of the dependencies of your projects.

## Further help

Visit the [Nx Documentation](https://nx.dev/angular) to learn more.

## ☁ Nx Cloud

### Computation Memoization in the Cloud

<p style="text-align: center;"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-cloud-card.png"></p>

Nx Cloud pairs with Nx in order to enable you to build and test code more rapidly, by up to 10 times. Even teams that are new to Nx can connect to Nx Cloud and start saving time instantly.

Teams using Nx gain the advantage of building full-stack applications with their preferred framework alongside Nx’s advanced code generation and project dependency graph, plus a unified experience for both frontend and backend developers.

Visit [Nx Cloud](https://nx.app/) to learn more.
