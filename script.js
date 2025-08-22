const apiKey = "9a9b2c6f45d12bcc9e34fe9e33c2b8f0"; // Replace with your API key

async function getWeather() {
  const city = document.getElementById('cityInput').value;
  const resultDiv = document.getElementById('weatherResult');

  if (!city) {
    resultDiv.innerHTML = "Please enter a city.";
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.cod === "404") {
      resultDiv.innerHTML = "City not found.";
    } else {
      resultDiv.innerHTML = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <p><strong>${data.main.temp}°C</strong> - ${data.weather[0].description}</p>
        <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="weather icon">
      `;

      // 🌈 Dynamic background based on weather condition
      const weatherMain = data.weather[0].main.toLowerCase();

      if (weatherMain.includes("rain")) {
        document.body.style.background = "linear-gradient(135deg, #1e3c72, #2a5298)"; // rainy mood
      } else if (weatherMain.includes("cloud")) {
        document.body.style.background = "linear-gradient(135deg, #bdc3c7, #2c3e50)"; // cloudy
      } else if (weatherMain.includes("clear")) {
        document.body.style.background = "linear-gradient(135deg, #f6d365, #fda085)"; // sunny
      } else if (weatherMain.includes("snow")) {
        document.body.style.background = "linear-gradient(135deg, #e6dada, #274046)"; // snowy
      } else {
        document.body.style.background = "linear-gradient(135deg, #83a4d4, #b6fbff)"; // default
      }
    }
  } catch (error) {
    resultDiv.innerHTML = "Error fetching data.";
    console.error(error);
  }
}
