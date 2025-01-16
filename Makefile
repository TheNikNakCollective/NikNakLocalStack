setup:
	docker network inspect niknak >/dev/null 2>&1 || docker network create niknak
	cd airflow && docker-compose build

niknak:
	cd airflow && docker-compose --profile flower up -d
	cd aws && chmod +x setup-s3.sh
	cd aws && docker-compose up -d

stop:
	cd airflow && docker-compose down