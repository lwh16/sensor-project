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

const app = express()

//use the express.static middleware
app.use('/public', express.static(path.join(__dirname, 'public')))

app.get('/data', function(req, res)
{
	res.send('Text: ' + '<strong>' + getCachedInfo.getData() + '<strong>')
})

app.listen(3000, function()
{
	console.log('index.js listening on port 3000');
});
	
