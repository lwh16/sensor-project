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

const fetchDataHistory = () =>
{
	//First call the API used to hold the historical database readings
	fetch('/data/history')
	.then(results =>
	{
		return results.json()
	})
	.then(data => 
	{
		data.forEach(reading =>
		{
			//convert the data readings into ISO Z
			const time = new Date(reading.createdAt + 'Z')
			const formattedTime = time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds()
			pushData(dataChartConfig.data.labels, formattedTime, 100)
			pushData(dataChartConfig.data.datasets[0].data, reading.value, 100)
		})
		
		dataChartConfig.update()
	})
}

function getParameterByName (name)
{
	const url = window.location.href
	name = name.replace(/[\[\]]/g, '\\$&')
	const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)')
	const results = regex.exec(url)
	if (!results) 
		return null
	if (!results[2]) 
		return ''
	return decodeURIComponent(results[2].replace(/\+/g, ''))
}

const fetchTemperatureRange = () =>
{
	const start = getParameterByName('start')
	const end = getParameterByName('end')

	fetch(`/temperature/range?start=${start}&end=${end}`).then(results =>
       {
		return results.json()
	})
	
	.then(data =>
	{
  		data.forEach(reading =>
		{
    			const time = new Date(reading.createdAt + 'Z')
    			const formattedTime = time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds()
     			pushData(temperatureChartConfig.data.labels, formattedTime, 10)
   			pushData(temperatureChartConfig.data.datasets[0].data, reading.value, 10)
  		})
  		temperatureChart.update()
	})


	fetch(`/temperature/average?start=${start}&end=${end}`).then(results =>
	{
 		return results.json()
	})
	
	.then(data =>
      	{
  		temperatureDisplay.innerHTML = '<strong>' + data.value + '</strong>'
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
	fetchDataHistory()
}, 2000)



const temperatureCanvasCtx = document.getElementById('temperature-chart').getContext('2d')

/**
* Create a new chart on the context we just instantiated
*/
const dataChartConfig = new Chart(temperatureCanvasCtx,
{

	type: 'line',
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
