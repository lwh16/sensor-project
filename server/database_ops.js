//database_ops.js
//----------------------------------------------------------------------
//Luke Holland
//28th December 2020
//----------------------------------------------------------------------
//Holds the various CRUD function to pull information from the database
//----------------------------------------------------------------------

const sqlite3 = require('sqlite3')
const path = require('path')
const db = new sqlite3.Database('media/pi/DATABASE/Test_Database/test.db')

//Function to add a new reading to the db
const insertReading = (type, reading) =>
{
	db.run(`INSERT INTO ${type} VALUES (datetime('now'), ${reading});`)
}

//Function to fetch the last n readings from the db table
const fetchReadings = (type, limit, callback) =>
{
	db.all(`SELECT * FROM ${type} ORDER BY createdAt DESC LIMIT ${limit}`,
	callback)
}

//Function to get readings between a start and end time
const fetchReadingsBetweenTime = (type, start, end, callback) =>
{
	db.all(`SELECT * FROM data WHERE createdAt > ? AND createdAT < ?`;,
	[start, end],callback)
}

//Function to get the average of all the readings between a set of times
const getAvgReadingBetweenTime = (type, start, end, callback) =>
{
	db.get(`SELECT avg(value) FROM data WHERE createdAt > ? AND createdAt < ?;`,
	[start, end], callback)
}

module.exports =
{
	insertReading,
	fetchReadings,
	fetchReadingsBetweenTime,
	getAvgReadingBetweenTime
}
