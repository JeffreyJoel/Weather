window.addEventListener("load", () =>{
	let long;
	let lat;
	const temperatureDescription = document.querySelector('.temperature-description');
	const degreeSection = document.querySelector('.degree-section')
	const temperatureDegree = document.querySelector('.temperature-degree');
	const locationTimezone = document.querySelector('.location-timezone');
	const locationPlace = document.querySelector('.location-place');
	const unit = document.querySelector('.degree-section span');
	if(navigator.geolocation){ 
		navigator.geolocation.getCurrentPosition(position =>{
			 console.log(position);
			long = position.coords.longitude;
			lat = position.coords.latitude;

			const proxy ="https://cors-anywhere.herokuapp.com/";
			  const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=af4fbc6000c357ac6f8fb2ce5a42629c`;
			 

			 fetch(api)

				.then(response =>{
					return response.json()
				})

				.then(data =>{
					console.log(data);
					const {temp} = data.main;
					const name = data.name;
					const [{main,icon}] = data.weather;
					const {country} = data.sys;

					//SET DOM elements to api
					temperatureDegree.textContent = temp;
					temperatureDescription.textContent = main;
					locationTimezone.textContent = country;
					locationPlace.textContent = name;

					// Celsius to Farenheit
						let Farenheit = (9/5)*(temp + 32);
					//Switch between Celsius and Farenheit
						degreeSection.addEventListener("click", ()=>{
						if(unit.textContent === "°C"){
							unit.textContent = "°F";
							temperatureDegree.textContent =Math.floor( Farenheit);
						}
						else{
							 unit.textContent = "°C"
							 temperatureDegree.textContent = temp
						};
					})
					
				})
				
				

				
				
		});

	}
	
})