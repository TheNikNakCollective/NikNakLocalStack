from airflow.models import Connection
from airflow.utils.db import provide_session

@provide_session
def add_connections(session=None):
    kafka_connections = [
        {
            "conn_id": "kafka_default",
            "conn_type": "kafka",
            "extra": '{"bootstrap.servers": "kafka:29092", "group.id": "group_1", "security.protocol": "PLAINTEXT", "auto.offset.reset": "beginning"}',
        },
        {
            "conn_id": "kafka_listener",
            "conn_type": "kafka",
            "extra": '{"bootstrap.servers": "kafka:29092", "group.id": "group_2", "security.protocol": "PLAINTEXT", "auto.offset.reset": "beginning"}',
        },
    ]

    for conn in kafka_connections:
        if not session.query(Connection).filter_by(conn_id=conn["conn_id"]).first():
            new_conn = Connection(**conn)
            session.add(new_conn)
            
    session.commit()

if __name__ == "__main__":
    add_connections()
