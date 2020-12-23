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
		return results.json()
	})

	.then(data =>
	{
		const now = new Date()
		const timeNow = now.getHours() + ':' + now.getMinutes()
		
		pushData(dataChartConfig.data.labels, timeNow, 100)
		pushData(dataChartConfig.data.datasets[0].data, data.value, 100)
		
		dataChartConfig.update()

		const dataDisplay = 
		document.getElementById('data-display')
		dataDisplay.innerHTML = '<strong>' + data.value + '<strong>'
	})
}

const pushData = (arr, value, maxLen) =>
{
	arr.push(value)
	
	if (arr.length > maxLen)
	{
		arr.shift()
	}
}

setInterval(() =>
{
	fetchData()
}, 1000)


const temperatureCanvasCtx = document.getElementById('temperature-chart').getContext('2d')

/**
* Create a new chart on the context we just instantiated
*/
const dataChartConfig = new Chart(temperatureCanvasCtx,
{

	type: 'bar',
	data: {

		labels: [],
		datasets: [{
		  data: [],
		  backgroundColor: 'rgba(255, 205, 210, 0.5)'
		}]
	},
	options: {
		legend: {
			display: false
		},
		responsive: true,
		maintainAspectRatio: false,

		scales: {
			yAxes: [{
				ticks: {
					suggestedMin: 0,
					suggestedMax: 100
				}
			}]
		}
	}
})
