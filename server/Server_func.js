//Server_func.js
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

const app = express()

app.get('/text', function(req, res)
{
	reo.send('Text: ' + '<strong>' + getCachedInfo.getData() + '<strong>')
})

app.get('/public', function(req, res)
{
	res.sendFile(path.join(__dirname, '/index.html'))
})

app.listen(3000, function()
{
	console.log('Server_func.js listening on port 3000');
});
	

