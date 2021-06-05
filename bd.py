import mysql.connector
from config import get_config


def obtenir_connexion():
    try:
        config_bd = get_config()["bd"]
        conn = mysql.connector.connect(
            user=config_bd['user'],
            password=config_bd['password'],
            host=config_bd['host'],
            port=config_bd['port'],
            database=config_bd['database']
        )
        return conn
    except mysql.connector.Error as e:
        print(e)
