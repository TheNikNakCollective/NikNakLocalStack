FROM apache/airflow:2.10.4

USER root

RUN apt-get update && apt-get install -y --no-install-recommends \
    ffmpeg \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

USER airflow

RUN pip install --no-cache-dir \
    apache-airflow-providers-apache-kafka==1.7.0 \
    ffmpeg-python==0.2.0 \
    confluent-kafka==2.8.0 \
    boto3==1.36.0 \
    smart-open==7.1.0 \
    python-dotenv==1.0.1

COPY scripts/add_kafka_connections.py /opt/airflow/scripts/add_kafka_connections.py
