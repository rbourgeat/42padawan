all:
	docker compose up -d

build:
	docker compose build --no-cache

down:
	docker compose down

clean: down
	docker compose rm -f

fclean: clean
	docker system prune -a -f

re: down build all
