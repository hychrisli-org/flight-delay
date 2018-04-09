from access import DatabaseAccess
from os.path import expanduser
import csv


home = expanduser("~")
dataDir = home + '/data/255-team-proj/input/isd-history.csv'
data = csv.reader(file(dataDir))
access = DatabaseAccess()
cursor = access.getCursor()
cnn = access.getConn()
numIdx = {6, 7, 8}

for row in data:
    if row[3] == 'US':
        for i in xrange(len(row)):
            if row[i] == '':
                row[i] = None
            elif i in numIdx:
                row[i] = float(row[i])
        cursor.execute(
            'INSERT INTO STATION(usaf, wban, name, ctry, '
            'state, icao, lat, lot, elev, begin, end) '
            'VALUES (%s, %s, %s, %s, '
            '%s, %s, %s, %s, %s, %s, %s)', row)
cnn.commit()
cursor.close()
access.close()

