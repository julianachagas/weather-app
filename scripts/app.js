const forecast = new Forecast();
const getLocationForm = document.forms['get-location'];
const weatherCard = document.querySelector('.weather');
const weatherDetails = document.querySelector('.weather__details');
const timeOfTheDayImage = document.querySelector('.weather__img');
const icon = document.querySelector('.weather__icon img');

const updateUI = data => {
  weatherCard.style.display = 'block';
  const { cityDetails, weather } = data;
  //update details template
  weatherDetails.innerHTML = `
  <p class="weather__city">${cityDetails.EnglishName}</p>
  <p class="weather__condition">${weather.WeatherText}</p>
  <div class="weather__temperature">
    <span>${weather.Temperature.Metric.Value}</span>
    <span>&deg;C</span>
  </div>`;
  //update the night/day and icon images
  const timeSrc = weather.IsDayTime ? 'img/day.svg' : 'img/night.svg';
  timeOfTheDayImage.src = timeSrc;
  const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
  icon.src = iconSrc;
};

getLocationForm.addEventListener('submit', e => {
  e.preventDefault();
  const city = document.querySelector('#location').value.trim();
  if (city.length) {
    //fetch the data and update the UI with the new city
    forecast
      .updateCity(city)
      .then(data => updateUI(data))
      .catch(err => console.log(err));
    //set local storage
    localStorage.setItem('city', city);
  } else {
    alert('Please enter a city!');
  }
  e.target.reset();
});

document.addEventListener('DOMContentLoaded', () => {
  const storedCity = localStorage.getItem('city');
  if (storedCity) {
    forecast
      .updateCity(storedCity)
      .then(data => updateUI(data))
      .catch(err => console.log(err));
  }
});
