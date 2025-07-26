const apiKey = "YOUR_API_KEY"; // Replace with your OpenWeatherMap API key

document.getElementById("weatherForm").addEventListener("submit", function(e) {
    e.preventDefault();
    const city = document.getElementById("cityInput").value.trim();
    if (city) {
        getWeather(city);
    }
});

function getWeather(city) {
    const resultDiv = document.getElementById("weatherResult");
    resultDiv.textContent = "Loading...";
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`)
        .then(response => {
            if (!response.ok) throw new Error("City not found");
            return response.json();
        })
        .then(data => {
            const weatherHTML = `
                <h2>${data.name}, ${data.sys.country}</h2>
                <p><b>${data.weather[0].main}</b>: ${data.weather[0].description}</p>
                <p>Temperature: ${data.main.temp}&deg;C</p>
                <p>Humidity: ${data.main.humidity}%</p>
                <p>Wind: ${data.wind.speed} m/s</p>
            `;
            resultDiv.innerHTML = weatherHTML;
        })
        .catch(() => {
            resultDiv.textContent = "Could not fetch weather. Check city name!";
        });
}