process: migrate
	@node -r dotenv/config lib/processor.js


build:
	@npm run build


serve:
	@npx squid-graphql-server --subscriptions


migrate:
	@npx squid-typeorm-migration apply


migration:
	@npx squid-typeorm-migration generate


codegen:
	@npx squid-typeorm-codegen


typegen:
	@npx squid-substrate-typegen typegen.json


archive-up:
	@docker compose -f archive/docker-compose.yml up


archive-down:
	@docker compose -f archive/docker-compose.yml down -v


up:
	@docker compose up -d


down:
	@docker compose down


.PHONY: build serve process migrate codegen typegen up down