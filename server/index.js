const express = require('express')

const app = express()

app.get('/hello', function(req, res) {
	res.send('HELLO');
	});

app.listen(3000, function(){
	console.log('Server listening on port 3000 0- index');
	});
