const formatTime = (timeString) => { 
	const [hourString, minute] = timeString.split(":"); 
	const hour = +hourString % 24; 
	return (hour % 12 || 12) + ":" + minute + (hour < 12 ? "AM" : "PM"); 
} 

const body = { 
	method: 'GET', 
	headers: { 
		'X-RapidAPI-Key': '00ac9ffee4msh159908d21d8cee3p18d8b3jsnc35faa29b8eb', 
		'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com' 
	} 
}; 


var butGetData = document.getElementById("butGetData") 

d = new Date() 
var inputCon = document.getElementById("inputCountry") 
var inputDate = document.getElementById("inputDate") 
const lastweek = new Date(d.getFullYear(), d.getMonth(), d.getDate() - 7); 

inputDate.value = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`   
inputDate.min = `${lastweek.getFullYear()}-${String(lastweek.getMonth() + 1).padStart(2, '0')}-${ String(lastweek.getDate()).padStart(2, '0') }` 

butGetData.addEventListener("click", function (event) { 

	event.preventDefault() 
	const ctx = document.getElementById('myChart'); 
	const ctx2 = document.getElementById('myChart2'); 
	const ctx3 = document.getElementById('myChart3'); 
	const ctx4 = document.getElementById('myChart4'); 

	country = inputCon.value 
	date = inputDate.value

fetch(`https://weatherapi-com.p.rapidapi.com/history.json?q=${country}&dt=

${date}&lang=en`, body)  
.then(response => response.json()) 
			.then(response => { 
				temperatur = response.forecast.forecastday[0].hour.map(item => { 
					return item.temp_c 
				}) 
				jam = response.forecast.forecastday[0].hour.map(item => { 
					return formatTime(item.time.split(' ')[1]).replace(':00', ' ') 
				}) 
				kelembaban = response.forecast.forecastday[0].hour.map(item => { 
					return item.humidity 
				}) 
				angin = response.forecast.forecastday[0].hour.map(item => { 
					return item.wind_kph 
				}) 
				tekanan = response.forecast.forecastday[0].hour.map(item => { 
					return item.pressure_mb 
				}) 

				currTimeData = response.forecast.forecastday[0].hour.findIndex(item => { 
					return item.time.split(' ')[1].replace(':00','') == String(d.getHours()).padStart(2, '0') 
				}) 

				document.getElementById("kota").innerHTML = response.location.name 
				document.getElementById("date").innerHTML = response.forecast.forecastday[0].date 
				document.getElementById("condition").innerHTML = response.forecast.forecastday[0].day.condition.text 
				document.getElementById("temp").innerHTML = response.forecast.forecastday[0].hour[currTimeData].temp_c 
				document.getElementById("speed").innerHTML = response.forecast.forecastday[0].hour[currTimeData].wind_mph 

				new Chart(ctx, { 
					type: 'line', 
					data: { 
						labels: jam, 
						datasets: [{ 
							label: 'Temperature', 
							data: temperatur, 
							borderWidth: 1 
						}] 
					}, 
					options: { 
						scales: { 
							y: { 
								beginAtZero: false, 
								title: {
									display: true,
									text: '℃'
								}
							} 
						} 
					} 
				}); 

				new Chart(ctx2, { 
					type: 'line', 
					data: { 
						labels: jam, 
						datasets: [{ 
							label: 'Humidity', 
							data: kelembaban, 
							borderWidth: 1 
						}] 
					}, 
					options: { 
						scales: { 
							y: { 
								beginAtZero: false,
								title: {
									display: true,
									text: "%"
								}
							} 
						} 
					} 
				}); 

				new Chart(ctx3, {
				type: 'line',
				data: {
					labels: jam,
					datasets: [{
						label: 'Wind Speed',
						data: angin,
						borderWidth: 1
					}]
				},
				options: {
					scales: {
						y: {
							beginAtZero: false,
							title: {
								display: true,
								text: "km/h"
							}
						}
					}
				}
			});

			new Chart(ctx4, {
				type: 'line',
				data: {
					labels: jam,
					datasets: [{
						label: 'Pressure',
						data: tekanan,
						borderWidth: 1
					}]
				},
				options: {
					scales: {
						y: {
							beginAtZero: false,
							title: {
								display: true,
								text: "mb"
							}
						}
					}
				}
			});
			}) 
			.catch(err => { 
				alert("sorry your country and date is not defined, please try again!") 
			}); 
}) 