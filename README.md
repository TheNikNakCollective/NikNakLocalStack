# NikNakLocalStack

**NikNakLocalStack** is a local development environment for running services such as Apache Airflow and AWS LocalStack. This repository simplifies the setup of these services using Docker Compose, providing a seamless local development experience.

---

## Features

- **Custom Docker Network**: Services are connected using a shared `niknak` network for seamless communication.
- **Airflow Environment**: Includes Apache Airflow with optional Flower support for monitoring.
- **AWS LocalStack**: Emulates AWS services like S3 locally for testing and development.
- **Easy Management**: Simple commands to start, stop, and configure the environment.

---

## Prerequisites

Ensure the following tools are installed on your system:

- **Docker**: [Install Docker](https://docs.docker.com/get-docker/)
- **Docker Compose**: [Install Docker Compose](https://docs.docker.com/compose/install/)

---

## Setup

```bash
make setup
```

---

## Usage

### Start the Services

To bring up the entire environment (Airflow, Flower, and AWS LocalStack):

```bash
make niknak
```

---

### Stop the Services

To stop and clean up the environment:

```bash
make stop
```

### Airflow Login

`username`: airflow
`password`: airflow

---

Here's an improved version of the documentation with enhanced clarity, better formatting, and additional context for users:

---

## **Sending Kafka Messages**

To send Kafka messages, you can use the `make` command with the topic of your choice.

### **Usage**

Run the following command, replacing `<topic-name>` with your desired Kafka topic:

```bash
make kafka-message topic=<topic-name>
```

#### Example
To send a message to the `video.upload` topic:

```bash
make kafka-message topic=video.upload
```

---

### **Message Format**

Below is an example Kafka message you can send. Ensure the `key` and `value` fields are properly formatted as JSON.

#### Example Message
```
key:{"video_id": "1234", "video_path": "niknak-raw-data/user-uploads/videos/1/1234/original.mp4", "video_provider": "s3", "user_id": 1}
```
---

### **Notes**
1. **Topic Name**: Ensure the topic specified in the `make` command (`topic=<topic-name>`) exists in your Kafka setup. If not, create it before running the command.
2. **Message Structure**: The message must follow the JSON format for both the key and value fields.
3. **Testing Locally**: If using LocalStack or a custom Kafka setup, ensure the `kafka-message` target in your `Makefile` is configured with the correct `bootstrap-server` endpoint.

### Directory Structure

```plaintext
.
├── airflow/          # Airflow configurations and Compose files
├── aws/              # LocalStack configurations and setup scripts
│   ├── docker-compose.yml  # AWS LocalStack services definition
│   └── setup-s3.sh         # Script to initialize S3 in LocalStack
├── Makefile          # Make commands for managing the environment
└── README.md         # This file
```

---

## Localstack S3

To view files in your localstack s3 buckets, you can visit http://localhost:4566/niknak-raw-data

## Customization

### Adding More AWS Services
To include additional AWS services in LocalStack:
1. Edit `aws/docker-compose.yml` and add the service to the `SERVICES` environment variable.
2. Restart the LocalStack container.

Example:
```yaml
services:
  localstack:
    environment:
      - SERVICES=s3,lambda,dynamodb
```

---

## Troubleshooting

- **Network Already Exists**: If you encounter an error about the `niknak` network already existing, it's safe to ignore as it will be reused.
- **Permissions Error**: Ensure `setup-s3.sh` is executable:
  ```bash
  chmod +x aws/setup-s3.sh
  ```

---

## License

This repository is licensed under the MIT License. See the `LICENSE` file for more details.