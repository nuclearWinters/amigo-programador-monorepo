setup_backend:
	docker volume create node_modules_backend
setup_frontend:
	docker volume create node_modules_frontend
install_backend:
	docker-compose	-f docker-compose.builder.yml run --rm install_backend
install_frontend:
	docker-compose	-f docker-compose.builder.yml run --rm install_frontend
populate:
	docker-compose -f docker-compose.populate.yml up
up:
	docker-compose -f docker-compose.dev.yml up
down:
	docker-compose -f docker-compose.dev.yml down
up-prod:
	docker-compose -f docker-compose.prod.yml up
down-prod:
	docker-compose -f docker-compose.prod.yml down