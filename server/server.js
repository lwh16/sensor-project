//This file will inspect the text file saved by other programs

const express = require('express')
const fs = require('fs')

const app = express()

app.get('/temperature', function(req, res)
{
	fs.readFile('test.txt', 'utf-8', (err, data) =>
	{
		if (!err)
		{
			res.send('Text File says this :' + data);
		}
	});
});

app.listen(3000, function()
{
	console.log('Server listening on port 3000 - server.js');
});
	
