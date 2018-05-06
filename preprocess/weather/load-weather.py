import gzip
from datetime import datetime
from access import DatabaseAccess
from os.path import expanduser
import os

access = DatabaseAccess()
cursor = access.getCursor()
cnn = access.getConn()
home = expanduser("~")

cursor.execute("SELECT DISTINCT usaf, wban FROM NEARBY_STATION")
res = cursor.fetchall()

total = float(len(res))

for yr in range(2015, 2018):

    year = str(yr)
    dataDir = home + '/data/255-team-proj/weather/' + year + '/'
    print ('Running in :' + dataDir, 'Total # files:' + str(total))

    cnt = 0
    rows = []
    for station in res:
        cnt += 1
        percent = "{0:.2f}%".format(cnt / total * 100)
        usaf = station[0].encode('utf-8')
        wban = station[1].encode('utf-8')

        filename = usaf + '-' + wban + '-' + year + '.gz'
        print(cnt, percent, filename)

        if not os.path.isfile(dataDir + filename):
            print ('*'*10 + filename + '*'*10 + 'Not Found')
            continue

        with gzip.open(dataDir + filename, 'r') as f:
            for line in f:
                # print ('Got line', line)
                usaf = line[4:10]
                wban = line[10:15]
                date_str = line[15:23]
                time_str = line[23:27]
                lat = float(line[28:34]) / 1000.0 if line[28:34] != '+99999' else None
                lot = float(line[34:41]) / 1000.0 if line[34:41] != '+999999' else None
                utc = datetime.strptime(date_str+time_str, '%Y%m%d%H%M')
                wind_angle = int(line[60:63]) if line[60:63] != '999' else None
                wind_speed = float(line[65:69]) / 10.0 if float(line[65:69]) != 9999 else None
                wobs_type = line[65]
                # meters
                vis = int(line[78:84]) if line[78:84] != '999999' else None
                # celsius
                temp = float(line[87:92]) / 10.0 if line[87:92] != '+9999' else None

                liqu_depth = None
                snow_depth = None

                add = line.split("ADD", 1)
                if len(add) == 2:
                    add = add[1]
                    aa1 = add.split("AA1", 1)
                    if len(aa1) == 2:
                        aa1 = aa1[1][:8]
                        # millimeter
                        liqu_depth = float(aa1[2:6]) / 10.0 if aa1[2:6] != '9999' and aa1[2:6].isdigit() else None

                    aj1 = add.split("AJ1", 1)
                    if len(aj1) == 2:
                        aj1 = aj1[1][:14]
                        snow_depth = float(aj1[0:4]) if aj1[0:4] != '9999' and aj1[0:4].isdigit() else None

                # print (line)
                row = (usaf, wban, lat, lot, date_str, time_str, utc.strftime('%Y-%m-%d %H:%M:%S'),
                       wind_angle, wind_speed, wobs_type, vis, temp, liqu_depth, snow_depth)
                rows.append(row)
        if cnt % 11 == 10 or cnt == total:
            print ('No.' + str(cnt), '# rows: ' + str(len(rows)))
            cursor.executemany(
                'INSERT INTO WEATHER(usaf, wban, lat, lot, date_str, time_str, utc, wind_angle, '
                'wind_speed, wobs_type, vis, temp, liqu_depth, snow_depth) '
                'VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)', rows)
            cnn.commit()
            rows = []
access.close()





