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

```
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

---

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