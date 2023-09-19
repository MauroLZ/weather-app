document.addEventListener('DOMContentLoaded', () => {
    const apiKey = '356d51e746144ad5a46190909231909';
    const weatherForm = document.querySelector('#weather-form');
    const locationInput = document.querySelector('#location-input');
    const resultContainer = document.querySelector('#result-container');

    weatherForm.addEventListener('submit', async (e) => {
        // Prevents the site from reloading and instead we manage the form submission through JavaScript
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
            resultContainer.innerHTML = `<p>Temperature: ${data.current.temp_c}°C</p>
                                    <p>Condition: ${data.current.condition.text}</p>`;
        } catch (error) {
            // Handle errors and display error message
            resultContainer.innerHTML = `<p>Error: ${error.message}</p>`;
        }
    });
});
