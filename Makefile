.PHONY: install dev build lint clean docker-build docker-run docker-stop help

# المتغيرات
APP_NAME = jamiya-app
DOCKER_IMAGE = $(APP_NAME):latest

# الأوامر
install:
	npm install

dev:
	npm run dev

build:
	npm run build

lint:
	npm run lint

clean:
	rm -rf node_modules dist

docker-build:
	docker build -t $(DOCKER_IMAGE) .

docker-run:
	docker-compose up -d

docker-stop:
	docker-compose down

docker-clean:
	docker-compose down -v
	docker rmi $(DOCKER_IMAGE)

# عرض المساعدة
help:
	@echo "Available commands:"
	@echo "  make install      - Install dependencies"
	@echo "  make dev          - Start development server"
	@echo "  make build        - Build for production"
	@echo "  make lint         - Run ESLint"
	@echo "  make clean        - Clean node_modules and dist"
	@echo "  make docker-build - Build Docker image"
	@echo "  make docker-run   - Run with Docker Compose"
	@echo "  make docker-stop  - Stop Docker containers"
	@echo "  make docker-clean - Clean Docker containers and images"
	@echo "  make help         - Show this help message"
