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


