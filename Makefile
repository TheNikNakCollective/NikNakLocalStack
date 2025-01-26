setup:
	sh scripts/setup-python.sh
	docker network inspect niknak >/dev/null 2>&1 || docker network create niknak
	cd airflow && docker-compose build
	cd app && docker build -f server/Dockerfile ../.. -t niknak/server:latest
	cd app && docker build -f ingestor/Dockerfile ../.. -t niknak/ingestor:latest

niknak:
	cd aws && chmod +x setup-s3.sh
	cd aws && docker-compose up -d

	cd app && chmod +x migrations.sh

	cd app/server && chmod +x entrypoint.sh

	cd app/ingestor && chmod +x entrypoint.sh

	cd app && docker-compose up -d

	cd kafka && docker-compose up -d

	cd airflow && docker-compose --profile flower up -d

	echo "Adding Kafka Connections to Airflow..."

	cd airflow && docker-compose exec airflow-webserver python /opt/airflow/scripts/add_kafka_connections.py

	echo "Adding Topics to Kafka..."

	cd kafka && docker-compose exec kafka kafka-topics --create --topic video.upload --bootstrap-server localhost:29092 || true

watch:
	cd app && yarn watch

stop:
	cd aws && docker-compose down
	cd app && docker-compose down
	cd kafka && docker-compose down
	cd airflow && docker-compose down

kafka-message:
	cd kafka && docker-compose exec -it kafka kafka-console-producer --topic $(topic) --bootstrap-server localhost:29092 --property "parse.key=true" --property "key.separator=:"