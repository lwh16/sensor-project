//index.js
//----------------------------------------------------------------------
//Luke Holland
//22nd December 2020
//----------------------------------------------------------------------
//Program that creates the node server and then access text file
//information through the cached info from Information_cache.js
//----------------------------------------------------------------------

const express = require('express')
const getCachedInfo = require('./Information_cache')
const path = require('path')
const database_ops = require('./database_ops')

const app = express()

//use the express.static middleware
app.use('/public', express.static(path.join(__dirname, 'public')))

app.get('/data', function(req, res)
{
	res.json({
		value: getCachedInfo.getData() 
	})
})

app.get('/data/history', function(req, res)
{
	database_ops.fetchReadings('data', 100, (err, results) =>
	{
		if (err)
		{
			console.error(err)
			return res.status(500).end()
		}
		
		res.json(results.reverse())
	})
})

app.get('/data/range', function(req, res)
{
	const {start, end} = req.query
	database_ops.fetchReadingsBetweenTime('data', start, end, (err, results) =>
	{
		if (err)
		{
			console.error(err)
			return res.status(500).end()
		}
		res.json(results)
	})
})

app.get('/data/average', function (req, res)
{
	const {start, end} = req.query
	database_ops.getAvgReadingBetweenTime('data', start, end, (err, results) =>
	{
		if (err)
		{
			console.error(err)
			return res.status(500).end()
		}
		
		res.json
		({
			value: results['avg(value)']
		})
	})
})
			
		


app.listen(3000, function()
{
	console.log('index.js listening on port 3000');
});
	
