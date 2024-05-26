async function moduleProject4() {
  // 👇 WORK WORK BELOW THIS LINE 👇
  const footer = document.querySelector('footer');
  const currentYear = new Date().getFullYear();
  footer.textContent = `© BLOOM INSTITUTE OF TECHNOLOGY ${currentYear}`;

  let descriptions = [
    ["Sunny", "☀️"],
    ["Cloudy", "☁️"],
    ["Rainy", "🌧️"],
    ["Thunderstorm", "⛈️"],
    ["Snowy", "❄️"],
    ["Partly Cloudy", "⛅️"]
  ];

  // 👉 Tasks 1 - 5 go here
  const weatherId = document.querySelector('#weatherWidget');
  weatherId.style.display = 'none';
  document.querySelector('#citySelect').addEventListener('change', async evt => {
    console.log('Selection changed');
    try {
      evt.target.setAttribute('disabled', 'disabled');
      weatherId.style.display = 'none';
      document.querySelector('.info').textContent = "Fetching weather data...";
      console.log(evt.target.value);
      let city = evt.target.value;
      let url = `http://localhost:3003/api/weather?city=${city}`;
      
      const res = await axios.get(url);
      weatherId.style.display = 'block';
      document.querySelector('.info').textContent = "";
      evt.target.removeAttribute('disabled');
      let { data } = res;

      document.querySelector('#apparentTemp div:nth-child(2)')
        .textContent = `${data.current.apparent_temperature}°`;
      document.querySelector('#todayDescription')
        .textContent = descriptions.find(d => d[0] === data.current.weather_description)[1];
      document.querySelector('#todayStats div:nth-child(1)')
        .textContent = `${data.current.temperature_min}°/${data.current.temperature_max}°`;
      document.querySelector('#todayStats div:nth-child(2)')
        .textContent = `Precipitation: ${data.current.precipitation_probability * 100}%`;
      document.querySelector("#todayStats div:nth-child(3)")
        .textContent = `Humidity: ${data.current.humidity}%`;
      document.querySelector('#todayStats div:nth-child(4)')
        .textContent = `Wind: ${data.current.wind_speed}m/s`;

      console.log('Forecast data:', data.forecast.daily); // Log forecast data to check date formats

      data.forecast.daily.forEach((day, idx) => {
        let card = document.querySelectorAll('.next-day')[idx];

        let weekDay = card.children[0];
        let apparent = card.children[1];
        let minMax = card.children[2];
        let precipit = card.children[3];

        console.log(`Date for forecast day ${idx}:`, day.date); // Log each date to check format

        let dayOfWeek = getWeekDay(day.date);
        console.log(`Setting day of week for idx ${idx}: ${dayOfWeek}`);

        weekDay.textContent = dayOfWeek;
        apparent.textContent = descriptions.find(d => d[0] === day.weather_description)[1];
        minMax.textContent = `${day.temperature_min}°/${day.temperature_max}°`;
        precipit.textContent = `Precipitation: ${day.precipitation_probability * 100}%`;
      });

      document.querySelector('#location').firstElementChild.textContent = data.location.city;
    } catch (err) {
      console.log(`Promise rejected with an err.message --> `, err.message);
    }
  });

  const getWeekDay = (date) => {
    console.log("Date received for getWeekDay:", date); // Log date received
    const d = new Date(date);
    console.log("Parsed Date:", d); // Log parsed date
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayIndex = d.getDay();
    console.log(`Day index for ${date}: ${dayIndex} (${daysOfWeek[dayIndex]})`); // Log day index and corresponding day
    return daysOfWeek[dayIndex];
  };
  // 👆 WORK WORK ABOVE THIS LINE 👆 
}

// ❗ DO NOT CHANGE THE CODE BELOW
if (typeof module !== 'undefined' && module.exports) module.exports = { moduleProject4 };
else moduleProject4();
