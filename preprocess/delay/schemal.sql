CREATE TABLE FLIGHT_DELAY
(
  fl_id           BIGINT PRIMARY KEY AUTO_INCREMENT,
  `year`          SMALLINT UNSIGNED NOT NULL,
  `quarter`       TINYINT UNSIGNED NOT NULL,
  `month`         TINYINT UNSIGNED NOT NULL,
  day_of_month    TINYINT UNSIGNED NOT NULL,
  day_of_week     TINYINT UNSIGNED NOT NULL,
  fl_date         DATE NOT NULL,
  unique_carrier  VARCHAR(3),
  flight_num      VARCHAR(5),
  origin          VARCHAR(7),
  dest            VARCHAR(7),
  crs_dep_time    VARCHAR(5),
  crs_arr_time    VARCHAR(5),
  airtime         DECIMAL(5,1),
  distance        DECIMAL(6,1),
  label           TINYINT UNSIGNED NOT NULL
);


SET AUTOCOMMIT = 0;
LOAD DATA LOCAL INFILE '2017.csv' INTO TABLE FLIGHT_DELAY
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 LINES
(`year`, quarter, `month`, day_of_month, day_of_week, fl_date, unique_carrier,
flight_num, origin, dest, crs_dep_time, crs_arr_time, airtime, distance, label);

COMMIT;

ALTER IGNORE TABLE FLIGHT_DELAY
ADD CONSTRAINT flight_delay_uniq UNIQUE(fl_date, unique_carrier, flight_num, origin, crs_dep_time);

ALTER TABLE FLIGHT_DELAY
ADD COLUMN (arr_date_time)


select STR_TO_DATE(CONCAT(SUBSTRING(crs_arr_time,1,2), ":", SUBSTRING(crs_arr_time, 3,2), ":00") AS TIME) from FLIGHT_DELAY LIMIT 10;

SELECT DATE_FORMAT(DATE_ADD(DATE_ADD(fl_date, INTERVAL CONCAT(SUBSTRING(crs_arr_time,1,2), ":", SUBSTRING(crs_arr_time, 3,2)) HOUR_MINUTE), INTERVAL 30 MINUTE), '%Y-%m-%d %H:00:00') from FLIGHT_DELAY LIMIT 10;

ALTER TABLE FLIGHT_DELAY
ADD COLUMN (local_ts DATETIME);

UPDATE FLIGHT_DELAY
SET local_ts = DATE_FORMAT(DATE_ADD(DATE_ADD(fl_date, INTERVAL CONCAT(SUBSTRING(crs_arr_time,1,2), ":", SUBSTRING(crs_arr_time, 3,2)) HOUR_MINUTE), INTERVAL 30 MINUTE), '%Y-%m-%d %H:00:00');


ALTER TABLE FLIGHT_DELAY
ADD INDEX flight_delay_uidx (dest, local_ts);