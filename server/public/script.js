//script.js
//----------------------------------------------------------------------
//Luke Holland
//23rd December 2020
//----------------------------------------------------------------------
//This script will fetch the text file data from client-side javascript.
//It uses a fetch API
//----------------------------------------------------------------------

//Set the first promise in a function
const fetchData = () =>
{
	fetch('/data')
	.then(results =>
	{
		return results.text()
	})

	.then(text =>
	{
		const dataDisplay = 
		document.getElementById('data-display')
		dataDisplay.innerHTML = text
	})
}

setInterval(() =>
{
	fetchData()
}, 1000)
