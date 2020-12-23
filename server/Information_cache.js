//Information_cache.js
//----------------------------------------------------------------------
//Luke Holland
//22nd December 2020
//----------------------------------------------------------------------
//Caches the infomration from the text file
//----------------------------------------------------------------------

//get the text reader function
const accessInformation = require('./Access_Information')

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
		
		//if no error, then set the readings
		cache = data
	})
}, 1000)

//this exposes only the cached values
module.exports.getData = () => cache
