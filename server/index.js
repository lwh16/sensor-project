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

const http = require('http')
const socketIo = require('socket.io')
const {subscribe, unsubscribe} = require('.notifier')

const httpServer = http.Server(app)

/**
* Socket.io implements its own routes on top of the 
existing ones by wrapping our HTTP server
*/
const io = socketIo(httpServer)

io.on('connection', socket => {
/**
* This callback is called every time a new client 
successfully makes a websocket connection with our server
*/
console.log(`User connected [${socket.id}]`)

/**
* The event listeners are defined inside the callback 
function because we need to access the "socket" instance,   
to emit changes to the client
* The "pushTemperature" and "pushHumidity" listeners 
are called on change of temperature and humidity  
respectively.
*/
const pushTemperature = newTemperature => {
socket.emit('new-temperature', {
  value: newTemperature
})
}

const pushHumidity = newHumidity => {
socket.emit('new-humidity', {
  value: newHumidity
})
}

/**
* Subscribe the listeners that we just defined to the 
"temperature" and "humidity" events
*/
subscribe(pushTemperature, 'temperature')

subscribe(pushHumidity, 'humidity')

socket.on('disconnect', () => {
/**
 * Finally, when the connection is closed, 
unsubscribe the listeners from their events
 */
unsubscribe(pushTemperature, 'temperature')
unsubscribe(pushHumidity, 'humidity')
})
})

/**
* The httpsServer.listen method is called. This exposes 
the routes we defined for the "app" instance as well
*/
httpServer.listen(3000, function () {
console.log('Server listening on port 3000')
})

/**
* The app.listen method invocation from the previous 
version is removed, in place of the httpServer.listen  
method
*/
// app.listen(3000, function () {
//   console.log('Server listening on port 3000')
// })

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
	
