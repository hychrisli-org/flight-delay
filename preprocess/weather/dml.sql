
-- SELECT weather stations near given airports
-- miles
SELECT a.iata, a.icao, a.city, s.usaf, s.wban, s.state, s.icao,
    3956 * 2 * ASIN(SQRT(POWER(SIN((a.lat - abs(s.lat)) * pi()/180 / 2), 2)
    + COS(a.lat * pi()/180 ) * COS(abs(s.lat) * pi()/180)
    * POWER(SIN((a.lot - s.lot) * pi()/180 / 2), 2) )) as  distance
FROM AIRPORT a, STATION s
WHERE s.begin <= '20150101' AND s.end >= '20171231'
HAVING distance < 15
ORDER BY s.state, a.iata, distance


-- SELECT weather station extract that are near airports
SELECT a.iata, a.icao, a.city, s.usaf, s.wban,
    3956 * 2 * ASIN(SQRT(POWER(SIN((a.lat - abs(s.lat)) * pi()/180 / 2), 2)
    + COS(a.lat * pi()/180 ) * COS(abs(s.lat) * pi()/180)
    * POWER(SIN((a.lot - s.lot) * pi()/180 / 2), 2) )) as  distance
FROM AIRPORT a, EXTRACT_STATION s
HAVING distance < 15;

CREATE TABLE NEARBY_STATION AS SELECT a.iata, a.icao, a.city, s.usaf, s.wban,
    3956 * 2 * ASIN(SQRT(POWER(SIN((a.lat - abs(s.lat)) * pi()/180 / 2), 2)
    + COS(a.lat * pi()/180 ) * COS(abs(s.lat) * pi()/180)
    * POWER(SIN((a.lot - s.lot) * pi()/180 / 2), 2) )) as  distance
FROM AIRPORT a, EXTRACT_STATION s
HAVING distance < 15;


-- Fix WEATHER TIMESTAMPE
ALTER TABLE WEATHER ADD COLUMN `time` datetime;
UPDATE WEATHER
SET `time` = DATE_FORMAT(DATE_ADD(utc, INTERVAL 30 MINUTE),'%Y-%m-%d %H:00:00')

CREATE TABLE WEATHER_OCLOCK AS
SELECT
    usaf,
    wban,
    `time`,
    avg(wind_angle) wind_angle,
    avg(wind_speed) wind_speed,
    avg(vis) vis,
    avg(temp) temp,
    max(COALESCE(liqu_depth, 0)) liqu_depth,
    max(COALESCE(snow_depth, 0)) snow_depth
FROM WEATHER
GROUP BY usaf, wban, `time`

CREATE INDEX WEATHER_OCLOCK_IDX on WEATHER(usaf, wban, `time`);

-- CALC WEATHER PER AIRPORT PER
CREATE TABLE AIRPORT_WEATHER AS
SELECT
    es.iata,
    w.utc ts,
    avg(w.wind_angle) wind_angle,
    avg(w.wind_speed) wind_speed,
    avg(w.vis) vis,
    avg(w.temp) temp,
    max(w.liqu_depth) liqu_depth,
    max(w.snow_depth) snow_depth,
FROM NEARBY_STATION es, WEATHER_OCLOCK w
WHERE es.usaf = w.usaf AND es.wban = w.wban
GROUP BY es.iata, w.`time`;

CREATE INDEX AIRPORT_WEATHER_IDX on AIRPORT_WEATHER(iata, ts);


ALTER TABLE AIRPORT_WEATHER
    add column (local_ts datetime),
    add column (tz varchar(30)),
    add column (fl_date date),
    add column (tm time),
    add column (code varchar(7))


UPDATE AIRPORT_WEATHER w
JOIN AIRPORT_TIMEZONE ts ON w.iata = ts.iata
SET
w.local_ts = CONVERT_TZ(w.ts, 'UTC', ts.tz),
w.tz = ts.tz;

UPDATE AIRPORT_WEATHER w
SET fl_date = DATE(local_ts),
    tm = HOUR(local_ts),
    code = CONCAT(ASCII(SUBSTRING(iata,1,1)), ASCII(SUBSTRING(iata, 2,1)),ASCII(SUBSTRING(iata, 3,1)))


SELECT
DATE(local_ts),
HOUR(local_ts),
CONCAT(ASCII(SUBSTRING(iata,1,1)), ASCII(SUBSTRING(iata, 2,1)),ASCII(SUBSTRING(iata, 3,1)))
FROM AIRPORT_WEATHER
WHERE local_ts is not null LIMIT 10;


SELECT
w.*,
ts.tz,
CONVERT_TZ(w.ts, 'UTC', ts.tz)
FROM AIRPORT_WEATHER w
JOIN AIRPORT_TIMEZONE ts ON w.iata = ts.iata