import gzip
from datetime import datetime
from access import DatabaseAccess
from os.path import expanduser
import os

access = DatabaseAccess()
cursor = access.getCursor()
cnn = access.getConn()
home = expanduser("~")


year = '2017'
dataDir = home + '/data/255-team-proj/weather/' + year + '/'

total = len(os.listdir(dataDir))
cnt = 0
rows = []

for filename in os.listdir(dataDir):

    cnt += 1
    percent = "{0:.2f}%".format(cnt / float(total) * 100)
    print(cnt, percent, filename)
    with gzip.open(dataDir + filename, 'r') as f:
        line = f.readline()
        # print ('Got line', line)
        usaf = line[4:10]
        wban = line[10:15]
        lat = float(line[28:34]) / 1000.0 if line[28:34] != '+99999' else None
        lot = float(line[34:41]) / 1000.0 if line[34:41] != '+999999' else None

        myname = usaf + '-' + wban + '-2017.gz'
        if myname != filename:
            print (filename, myname)

        row = (usaf, wban, lat, lot)
        rows.append(row)

cursor.executemany(
    'INSERT INTO EXTRACT_STATION(usaf, wban, lat, lot) '
    'VALUES (%s, %s, %s, %s)', rows)
cnn.commit()
access.close()
