from access import DatabaseAccess
from os.path import expanduser
import csv


home = expanduser("~")
dataDir = home + '/data/255-team-proj/input/airports.dat'
data = csv.reader(file(dataDir))
access = DatabaseAccess()
cursor = access.getCursor()
cnn = access.getConn()

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
access.close()

