# ConnexAI Tech Test

## What I've changed

### Agents Daily Report + DataTable

- Created a reusable `<DataTable />` component in `components/common`, used by `<AgentsDailyReportTable />`. Uses mui data-grid and has styling integrated.
- Added filtering/sorting and client side pagination to the table
- Added tests for `<DataTable />`
- Added new GET endpoint at `/agents-daily-report` to retrieve grouped interaction stats by agent
- Added Sequelize `belongsTo(Agent)` association on the interaction model
- Added some bad data to the db to test how table handles missing data (end of db/build.sql, also applied to database.db)

### Weather Widgets

- Fixed the unresolved promises issue in the weather api, and wrapped in `Promise.all`
- Added try/catch so if one location fails, others don't break. A failed location returns temp: null and its card shows '—'.
- Added backend tests, particularly for `/weather` to prevent future regressions
- Renamed `Weather` component to `WeatherWidget`
- Added a `name` field to `locationCoords.ts` with the correctly cased & formatted location name, rather than relying on the object key to improve UI

### Other improvements/changes in the repo

- Moved `models` folder to `src` root out, from `src/util`
- Created a pages folder in the webapp, moved `dashboard.tsx`
- Fixed the API hot reloader. `nx serve api` used to do a full `tsc` rebuild on every file change, which caused a few issues:
  - Several changes at once (e.g. adding/renaming a file) ran builds in parallel and the server could stop restarting entirely, so it kept serving old code
  - Deleted/renamed routes stayed live, because `dist` was never cleaned and express-openapi loads every route file it finds there
  - It relied on the Nx daemon to watch for changes, so it didn't reload at all without it (e.g. in Docker/CI)
- To fix this:
  - `serve` now runs the source directly with `nodemon` + `tsx` (`apps/api/nodemon.json`), watching `apps/api/src` with a short debounce, so new/renamed/deleted routes restart once and quickly
  - express-openapi loads `.ts` routes in dev and `.js` routes from the build
  - `build` now cleans `dist/apps/api` first (with the TypeScript build info moved inside it, so a clean build always outputs every file)
  - `make start-api` builds and runs the production output
  - `tsx` doesn't type check. `make typecheck-api` can be run to show type errors in the terminal if desired.
- Ran `make lint` to clean up code
- New commands for running frontend & backend tests separately
- Dockerised the app:
  - A Dockerfile per app, both build from the repo root
  - `api`: Node 20.10 running the compiled server as a non-root user
  - `webapp`: the static build served by nginx (`apps/webapp/nginx.conf`)
  - `docker compose` runs both together
  - "Moved `tslib` to `dependencies`

## What else I would change

### Table

- Improve UI of the data table, particularly the sort/options button placement and filters design
- Add server-side pagination for the data table (if it was a table with thousands of rows)
- Add enter page number ability, rather than having to click through each page

### Weather

- Add proper error handling UI for weather widgets
- Add better loading UI (skeleton)
- Currently a separate request per location is made to the external API - I believe there's a way to combine this into one request from the api docs
- Cache the weather API responses to reduce pinging every time
- Add a timeout to the Open-Meteo request

### Other

- DB schema improvement: Instead of using `id` as primary key for each, be more explicit. e.g. `agents.agent_id`, `interactions.interaction_id`.
- use `.env` files (e.g. api url is currently baked into axiosDefaults)
- Add some CRUD operations to models for resources
- More comprehensive tests end to end
- Add import paths via `tsconfig` to make ugly imports easier to look at
- Add database.db to .gitignore to stop real data being tracked (would change how docker volume is created)
- Add a CI check on push that checks lint/test/builds before errors reach remote
- Upgrade Node (currently v20 in `.nvmrc`). Newer versions have a stable built-in `node --watch` and can run TypeScript files directly.
- Use a different package manager (e.g. pnpm or bun)
- Use Vitest across the repo, rather than having jest for the BE
- Maybe find a way to automate orval `make domain` in the workflow
- per-app dependencies, rather than one shared one

## Getting Started

To get started you will need to install dependencies.
`nvm use`
`npm i`

After which you will want to start the api and webapp in separate terminals (this can be done together, but you get better logging individually).
`make serve-api`
http://localhost:3333/

`make serve-webapp`
http://localhost:4200/

The API reloads automatically on changes in `apps/api/src`, including new routes. To run the production build instead, use `make start-api`.

## Running with Docker

With Docker running, build and start both apps:
`make docker-up`

Then open http://localhost:4200/ (the API is at http://localhost:3333/). Stop any locally running dev servers first, as they use the same ports.

`make docker-logs` follows the logs and `make docker-down` stops everything.

The database is kept in a Docker volume (`db-data`), so any changes persist across restarts and rebuilds. It's created from `db/database.db` on first run. To reset it back to that, run `make docker-reset-db` (this also stops the containers). This is also needed after changing `db/database.db`.

## Additional helpers

Generate type safe hooks from openapi docs
`make domain`

Linting
`make lint`

Tests
`make test` (all), `make test-api` (backend, Jest) or `make test-webapp` (frontend, Vitest)

Type check the API as you work (the dev server doesn't type check)
`make typecheck-api`

# Docs

https://nx.dev/getting-started/intro
https://www.npmjs.com/package/express-openapi
https://orval.dev
https://mui.com/material-ui/getting-started/
https://sequelize.org/docs/v6/
