import gzip
from datetime import datetime
from access import DatabaseAccess
from os.path import expanduser
from os.path import isfile
from geopy.geocoders import Nominatim
from geopy.exc import GeocoderTimedOut
from glob import glob

access = DatabaseAccess()
cursor = access.getCursor()
cnn = access.getConn()
geolocator = Nominatim()

home = expanduser("~")
year = '2017'
dataDir = home + '/data/255-team-proj/weather/' + year + '/'

cursor.execute("SELECT usaf, wban, lat, lot, ctry FROM STATION "
               "WHERE begin <= '20150101 "
               "AND end >= 20171231'")


res = cursor.fetchall()

total = float(len(res))
print (total)
cnt = 0
cnt_done = 0
cnt_not_found = 0
dupfiles = []

for station in res:
    cnt += 1
    percent = "{0:.2f}%".format(cnt / total * 100)
    usaf = station[0].encode('utf-8')
    wban = station[1].encode('utf-8')
    lat = station[2].encode('utf-8') if station[2] else None
    lot = station[3].encode('utf-8') if station[3] else None

    fileNum = 0
    fileName = usaf + '-' + wban + '-2017.gz'

    if isfile(dataDir + fileName):
        fileNum += 1
    else:
        if wban == '99999':
            fileNum += len(glob(dataDir + usaf + '-*-2017.gz'))
        elif usaf == '999999':
            fileNum += len(glob(dataDir + '*-' + wban + '-2017.gz'))

    if fileNum == 0:
        cnt_not_found += 1
        address = None
        print (cnt, percent, address, usaf, wban, "Not Found")
        continue

    if fileNum > 1:
        dupfiles.append((usaf, wban))
        print ("dupfile", usaf, wban)
        break
    cnt_done += 1
    print (cnt, percent, usaf, wban, "Done")

print (len(dupfiles))
total = float(cnt_not_found + cnt_done)
print (cnt_not_found, cnt_done)
print (cnt_not_found / total, cnt_done / total)
access.close()





