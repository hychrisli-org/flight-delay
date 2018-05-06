SELECT
    `year`,
    `quarter`,
    `month`,
    day_of_month,
    day_of_week,
    fl_date,
    unique_carrier,
    flight_num,
    origin,
    dest,
    crs_dep_time,
    crs_arr_time,
    airtime,
    distance,
    label
FROM
    delay.FLIGHT_DELAY
WHERE
    `year` = 2017
INTO OUTFILE 'data.csv'
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n';

SELECT
	CONCAT(
	CHAR(CONVERT(SUBSTRING(dest, 1, 2), INTEGER)),
	CHAR(CONVERT(SUBSTRING(dest, 3, 2), INTEGER)),
	CHAR(CONVERT(SUBSTRING(dest, 5, 2), INTEGER)))
FROM FLIGHT_DELAY LIMIT 10;


SELECT
CONCAT(
  CHAR(CONVERT(SUBSTRING(dest, 1, 2), UNSIGNED)),
  CHAR(CONVERT(SUBSTRING(dest, 3, 2), UNSIGNED )),
  CHAR(CONVERT(SUBSTRING(dest, 5, 2), UNSIGNED ))) iata
FROM
  FLIGHT_DELAY LIMIT 10;


SELECT
	CONCAT(
  CHAR(CONVERT(SUBSTRING(dest, 1, 2), UNSIGNED)),
  CHAR(CONVERT(SUBSTRING(dest, 3, 2), UNSIGNED )),
  CHAR(CONVERT(SUBSTRING(dest, 5, 2), UNSIGNED ))) iata,
  dest,
	sum(label) delays,
	count(*) all_flights,
	sum(label) / count(*) ratio
FROM
	FLIGHT_DELAY
GROUP BY
	iata
ORDER BY
  ratio desc;

CREATE table AIRPORT_DELAY_STATS
AS
SELECT
	CONCAT(
  CHAR(CONVERT(SUBSTRING(dest, 1, 2), UNSIGNED)),
  CHAR(CONVERT(SUBSTRING(dest, 3, 2), UNSIGNED )),
  CHAR(CONVERT(SUBSTRING(dest, 5, 2), UNSIGNED ))) iata,
  dest,
	sum(label) delays,
	count(*) all_flights,
	sum(label) / count(*) ratio
FROM
	FLIGHT_DELAY
GROUP BY
	iata;


CREATE TABLE AIRPORT_INFO
AS
SELECT
a.*,
ads.dest,
ads.delays,
ads.all_flights,
ads.ratio
FROM flight.AIRPORT a,
delay.AIRPORT_DELAY_STATS ads
WHERE
a.iata = ads.iata;



SELECT
iata,
dest,
lat,
lot,
alt,
delays,
all_flights,
ratio
FROM
AIRPORT_INFO
ORDER BY iata



SELECT
    unique_carrier,
    sum(label) delays,
	count(*) all_flights,
	sum(label) / count(*) ratio
FROM FLIGHT_DELAY
GROUP BY unique_carrier
ORDER BY ratio desc;


CREATE TABLE FLIGHT_DELAY_CLUSTER AS
SELECT
fd.year,
fd.quarter,
fd.month,
fd.day_of_month,
fd.day_of_week,
fd.fl_date,
fd.unique_carrier,
fd.flight_num,
fd.origin,
fd.dest,
fd.crs_dep_time,
fd.crs_arr_time,
fd.distance,
ac.cluster,
fd.label
FROM
delay.FLIGHT_DELAY fd,
flight.AIRPORT_CLUSTER ac
WHERE fd.dest = ac.dest
ORDER BY fd.fl_date, fd.dest, fd.crs_dep_time, fd.unique_carrier;


CREATE TABLE DELAY_WEATHER_CLUSTER AS
SELECT
dw.year,
dw.quarter,
dw.month,
dw.day_of_month,
dw.day_of_week,
dw.fl_date,
dw.unique_carrier,
dw.flight_num,
dw.origin,
dw.dest,
dw.crs_dep_time,
dw.crs_arr_time,
dw.distance,
dw.vis,
dw.temp,
dw.liqu_depth,
dw.snow_depth,
ac.cluster,
dw.label
FROM
delay.DELAY_WEATHER dw,
flight.AIRPORT_CLUSTER ac
WHERE dw.dest = ac.dest