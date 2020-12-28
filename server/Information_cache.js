//Information_cache.js
//----------------------------------------------------------------------
//Luke Holland
//22nd December 2020
//----------------------------------------------------------------------
//Caches the infomration from the text file
//----------------------------------------------------------------------

//get the text reader function
const accessInformation = require('./Access_Information')
const database_ops = require('./database_ops')

//Instantiate the cache
var cache = null

//get a function which pulls this information every 5 secs

setInterval(() =>
{
	accessInformation((err, data) =>
	{
		if (err)
		{
			return console.error(err)
		}
		
		//if no error, then set the readings from database
		database_ops.insertReading('data',data)
		cache = data
	})
}, 2000)

//this exposes only the cached values
module.exports.getData = () => cache
