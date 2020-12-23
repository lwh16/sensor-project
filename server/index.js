const express = require('express')

const app = express()

app.get('/hello', function(req, res) {
	res.send('HELLO');
	});

app.listen(3000, function(){
<<<<<<< HEAD
	console.log('Server listening on port 3000 0- index');
	});
=======
 console.log('Server listening on port 3000!!');
});
>>>>>>> a38c6775ab28c8a2f1164ed152da91a03fc8e515
