function updateContainerStyle(hour) {
    const container = document.querySelector('.container');
    const submitButton = document.querySelector('.submit-button');

    // Convert the hour to a number (assuming the hour is in 24-hour format)
    const hourNumber = parseInt(hour.split(' ')[1].split(':')[0]);

    // Check the hour and change the container style accordingly
    if ((hourNumber >= 0 && hourNumber < 6) || (hourNumber >= 20 && hourNumber <= 23)) {
        container.style.backgroundImage = 'url(/images/night.jpg)'; // Night background
        submitButton.classList.add('button-night');
        submitButton.classList.remove('button-morning');
        submitButton.classList.remove('button-evening');
        submitButton.classList.remove('button-day');
    } else if (hourNumber >= 6 && hourNumber < 12) {
        container.style.backgroundImage = 'url(/images/sunrise.jpg)'; // Morning background
        submitButton.classList.add('button-morning');
        submitButton.classList.remove('button-night');
        submitButton.classList.remove('button-evening');
        submitButton.classList.remove('button-day');
    } else if (hourNumber >= 12 && hourNumber < 18) {
        container.style.backgroundImage = 'url(/images/day.jpg)'; // Day background
        submitButton.classList.add('button-afternoon');
        submitButton.classList.remove('button-night');
        submitButton.classList.remove('button-morning');
        submitButton.classList.remove('button-evening');
    } else {
        container.style.backgroundImage = 'url(/images/evening.jpg)'; // Evening background
        submitButton.classList.add('button-evening');
        submitButton.classList.remove('button-night');
        submitButton.classList.remove('button-morning');
        submitButton.classList.remove('button-day');
    }
}


document.addEventListener('DOMContentLoaded', () => {
    // Our api key for the weather API
    const apiKey = '356d51e746144ad5a46190909231909';
    const weatherForm = document.querySelector('#weather-form');
    const locationInput = document.querySelector('#location-input');
    const temperatureResult = document.querySelector('.temperature-result');
    const conditionResult = document.querySelector('.condition-result');
    const uvResult = document.querySelector('.uv-result');
    const timeResult = document.querySelector('.time-result');
    const cityName = document.querySelector('.city-name')
    const regionName = document.querySelector('.region-name')
    const resultContainer = document.querySelector('.result-container');


    weatherForm.addEventListener('submit', async (e) => {
        // Prevents the site from reloading, and instead we manage the form submission through JavaScript
        e.preventDefault();
        // Get the location from the input field and put it into a variable
        const location = locationInput.value;

        // Setting up a try/catch block to handle errors
        try {
            // in a variable called response, we're storing the result from fetching the weather data from the API, using our API key and the location entered
            const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}`);

            // If the response is not ok, throw an error
            if (!response.ok) {
                throw new Error('Weather data not found');
            }
            // If the response is ok, parse the data into JSON format
            const data = await response.json();
            // Update the UI with weather data
            cityName.innerHTML = `<h1>${data.location.name}</h1>`
            regionName.innerHTML = `<h2>${data.location.region}</h2>`
            temperatureResult.innerHTML = `<p>${data.current.temp_c}°C</p>`;
            conditionResult.innerHTML = `<p>${data.current.condition.text}</p>`;
            uvResult.innerHTML = `<p>${data.current.uv}</p>`;
            timeResult.innerHTML = `<p>${data.location.localtime}</p>`;

            updateContainerStyle(data.location.localtime);
        } catch (error) {
            // Handle errors and display error message
            console.log(error);
        }
    });
});
