all: dependencies serve

dependencies:
	npm install

build-api: 
	npx nx build api

docs: 
	make build-api && npx ts-node --project tools/tsconfig.json ./tools/schema.ts

lint:
	npx nx format:write -v

domain:
	make docs && npx orval --config ./tools/orval.config.ts

serve-api:
	npx nx serve api

start-api:
	npx nx start api

typecheck-api:
	npx tsc --project apps/api/tsconfig.app.json --noEmit --watch

serve-webapp:
	npx nx serve webapp

serve:
	npx nx run-many -t serve

test:
	npx nx run-many -t test

test-api:
	npx nx test api

test-webapp:
	npx nx test webapp

docker-up:
	docker compose up --build -d

docker-down:
	docker compose down

docker-logs:
	docker compose logs -f

docker-reset-db:
	docker compose down -v
