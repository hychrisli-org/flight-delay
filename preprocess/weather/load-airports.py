from connect import GenericConnector
from os.path import expanduser
import csv


home = expanduser("~")
dataDir = home + '/data/255-team-proj/input/airports.dat'
data = csv.reader(file(dataDir))
connector = GenericConnector()
cursor = connector.getCursor()
cnn = connector.getConn()

for row in data:
    if row[3] == 'United States':
        for i in xrange(len(row)):
            if row[i] == '\N':
                row[i] = None

        cursor.execute(
            'INSERT INTO AIRPORT(id, name, city, ctry, '
            'iata, icao, lat, lot, alt, tzone, dst,'
            'olson, type, src) '
            'VALUES (%s, %'
            's, %s, %s, '
            '%s, %s, %s, %s, %s, %s, %s, '
            '%s, %s, %s)', row)
cnn.commit()
cursor.close()
connector.close()

