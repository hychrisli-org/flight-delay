
-- SELECT weather stations near given airports
SELECT a.iata, a.icao, a.city, s.usaf, s.wban, s.state, s.icao,
    3956 * 2 * ASIN(SQRT(POWER(SIN((a.lat - abs(s.lat)) * pi()/180 / 2), 2)
    + COS(a.lat * pi()/180 ) * COS(abs(s.lat) * pi()/180)
    * POWER(SIN((a.lot - s.lot) * pi()/180 / 2), 2) )) as  distance
FROM AIRPORT a, STATION s
WHERE s.begin <= '20150101' AND s.end >= '20171231'
HAVING distance < 15
ORDER BY s.state, a.iata, distance