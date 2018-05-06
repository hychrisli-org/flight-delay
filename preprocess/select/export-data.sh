#!/usr/bin bash

mysql --quick --host='cmpe255.ctcmfjskhs4a.us-east-2.rds.amazonaws.com' --port=3306 --user=hychris -p < select-data.sql | sed "s/'/\'/;s/\t/\",\"/g;s/^/\"/;s/$/\"/;s/\n//g" > cluster1-2017.csv