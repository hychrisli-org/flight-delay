CREATE TABLE STATION
(
    usaf    CHAR(6) NOT NULL,
    wban    CHAR(5) NOT NULL,
    name    VARCHAR(100),
    ctry    CHAR(2),
    state   CHAR(2),
    icao    CHAR(4),
    lat     DOUBLE,
    lot     DOUBLE,
    elev    FLOAT,
    begin   CHAR(8),
    end     CHAR(8)
);

CREATE TABLE EXTRACT_STATION
(
    usaf    CHAR(6) NOT NULL,
    wban    CHAR(5) NOT NULL,
    lat     DOUBLE,
    lot     DOUBLE
);

CREATE TABLE AIRPORT
(
    id      INT,
    name    VARCHAR(100),
    city    VARCHAR(50),
    ctry    VARCHAR(50),
    iata    CHAR(3),
    icao    CHAR(4),
    lat     DOUBLE,
    lot     DOUBLE,
    alt     INT,
    tzone   INT,
    dst     CHAR(1),
    olson   VARCHAR(50),
    type    VARCHAR(10),
    src     VARCHAR(15)
);

CREATE TABLE WEATHER
(
    id              INT PRIMARY KEY AUTO_INCREMENT,
    usaf            CHAR(6) NOT NULL,
    wban            CHAR(5) NOT NULL,
    lat             DOUBLE,
    lot             DOUBLE,
    date_str        CHAR(8) NOT NULL,
    time_str        CHAR(4) NOT NULL,
    utc             DATETIME,
    wind_angle      INT,
    wind_speed      DECIMAL(4,1),
    wobs_type       CHAR(1),
    vis             INT,
    temp            DECIMAL(4,1),
    liqu_depth      DECIMAL(4,1),
    snow_depth      INT
);

CREATE INDEX WEATHER_IDX on WEATHER(usaf, wban, utc);

ALTER IGNORE TABLE AIRPORT_WEATHER
ADD UNIQUE INDEX airport_weather_uidx (code, local_ts);

use delay;

CREATE TABLE DELAY_WEATHER AS
SELECT
fd.*,
aw.wind_angle,
aw.wind_speed,
aw.vis,
aw.temp,
aw.liqu_depth,
aw.snow_depth
FROM
FLIGHT_DELAY fd JOIN flight.AIRPORT_WEATHER aw
 on fd.dest = aw.code and fd.local_ts = aw.local_ts
WHERE
    aw.local_ts is not null

CREATE INDEX delay_weather_idx on DELAY_WEATHER(`year`, `month`, `day_of_month`);