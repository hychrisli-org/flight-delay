import zipfile
from access import DatabaseAccess
from os.path import expanduser
import csv

access = DatabaseAccess()
cursor = access.getCursor()
cnn = access.getConn()

home = expanduser("~")
dataDir = home + '/data/255-team-proj/2017'

cursor.execute("SELECT usaf, wban FROM STATION "
               "WHERE begin <= '20150101 "
               "AND end >= 20171231'")
res = cursor.fetchall()
