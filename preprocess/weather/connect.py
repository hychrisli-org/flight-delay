import mysql.connector
import os


class GenericConnector(object):

    def __init__(self):

        config = {
            'user': os.environ['DB_USER'],
            'passwd': os.environ['DB_PASS'],
            'host': 'localhost',
            'db': 'flight',
            'autocommit': False,
            'charset': 'utf8',
        }
        self.conn = mysql.connector.connect(**config)
        self.cursor = self.conn.cursor()

    def getConn(self):
        return self.conn

    def getCursor(self):
        return self.cursor

    def close(self):
        self.cursor.close()
        self.conn.close()
