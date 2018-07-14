import mysql.connector
import os
import sys
from time import localtime,strftime
import time
import json
from dateutil import rrule
from datetime import datetime, timedelta, date
from math import sin, cos, sqrt, atan2, radians

sql_server = "localhost" #Address to database server
database = "hackathon"
sql_uname = "root"
sql_pw = "12345"

def getDistance(lat_long1, lat_long2):
	R = 6373.0

	lat1 = radians(lat_long1[0])
	lon1 = radians(lat_long1[1])
	lat2 = radians(lat_long2[0])
	lon2 = radians(lat_long2[1])

	dlon = lon2 - lon1
	dlat = lat2 - lat1

	a = sin(dlat / 2)**2 + cos(lat1) * cos(lat2) * sin(dlon / 2)**2
	c = 2 * atan2(sqrt(a), sqrt(1 - a))

	distance = R * c * 1000

	return round(distance, 2)

def storeEntries(rows, conn):
	sql = 'insert into Table1(dest_id, entrance_id, lat_longs) values("%s", "%s", "%s")'

	for i in rows:
		print sql%(i[0],i[1],rows[i]["ls"])
		curr = conn.cursor()
		curr.execute(sql%(i[0],i[1],rows[i]["ls"]))
		curr.close()
		conn.commit()

def aggregate(arow, row):
	dest = str(row[1])
	src = str(row[2])
	lat_longs = json.loads(row[3].decode("utf-8"))
	dist = 0

	for i in xrange(len(lat_longs)-1):
		dist += getDistance(lat_longs[i], lat_longs[i+1])

	if (src, dest) in arow:
		if arow[(src, dest)][dist] > dist:
			arow[(src, dest)]["ls"] = lat_longs
			arow[(src, dest)]["dist"] = dist
	else:
		arow[(src, dest)] = {}
		arow[(src, dest)]["ls"] = lat_longs
		arow[(src, dest)]["dist"] = dist


sql_query = "select * from Table2"

try:
	conn = mysql.connector.connect(host=sql_server, user=sql_uname, password=sql_pw, database=database)
	cur = conn.cursor()

	cur.execute(sql_query)

	arow = {}
	for row in cur:
		aggregate(arow, row)

	storeEntries(arow, conn)

except mysql.connector.Error: 
    sys.stderr.write('Database Connection Error!\n')
    sys.exit(2)

cur.close()
conn.close()