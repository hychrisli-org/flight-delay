import mysql.connector
import os


class DatabaseAccess(object):

    def __init__(self):

        config = {
            'user': os.environ['DB_USER'],
            'passwd': os.environ['DB_PASS'],
            'host': os.environ['DB_HOST'],
            'port': 3306,
            'db': 'flight',
            'autocommit': True,
        }
        self.conn = mysql.connector.connect(**config)

        if self.conn:
            print ("Connection Successful")

        self.cursor = self.conn.cursor()

    def getConn(self):
        return self.conn

    def getCursor(self):
        return self.cursor

    def close(self):
        self.cursor.close()
        self.conn.close()
