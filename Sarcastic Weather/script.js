document.getElementById('getWeather').addEventListener('click', async () => {
    const errorElement = document.getElementById('error');
    const tempElement = document.getElementById('temperature');
    const conditionElement = document.getElementById('condition');
    const sarcasmElement = document.getElementById('sarcasm');

    errorElement.textContent = '';
    tempElement.textContent = '';
    conditionElement.textContent = '';
    sarcasmElement.textContent = '';

    const fetchWeather = async (lat, lon) => {
        const apiKey = 'a087c8b918911c702d577d445cbf9c05'; // Replace with your OpenWeatherMap API key
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('API request failed');
            }

            const data = await response.json();
            const temp = data.main.temp;
            const condition = data.weather[0].main;

            tempElement.textContent = `Temperature: ${temp}°C`;
            conditionElement.textContent = `Condition: ${condition}`;

            if (temp > 30) {
                sarcasmElement.textContent = 'What a chilly day, better grab a jacket!';
            } else if (temp < 10) {
                sarcasmElement.textContent = 'It’s so warm, perfect for a beach day!';
            } else if (condition.toLowerCase().includes('rain')) {
                sarcasmElement.textContent = 'Perfect time for a picnic!';
            } else {
                sarcasmElement.textContent = 'Terrible weather, stay indoors!';
            }
        } catch (error) {
            errorElement.textContent = 'Mother Nature is ignoring your request.';
        }
    };

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                fetchWeather(lat, lon);
            },
            () => {
                errorElement.textContent = 'Unable to retrieve your location.';
            }
        );
    } else {
        errorElement.textContent = 'Geolocation is not supported by your browser.';
    }
});
