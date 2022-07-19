class Forecast {
  constructor() {
    this.key = '1cAE7zGpvifWYffs9C68yAudb2Bt49AA'; //apikey
    this.cityURL =
      'https://dataservice.accuweather.com/locations/v1/cities/search';
    this.weatherURL =
      'https://dataservice.accuweather.com/currentconditions/v1/';
  }

  async updateCity(city) {
    const cityDetails = await this.getCity(city);
    const weather = await this.getWeather(cityDetails.Key);
    return { cityDetails, weather };
  }

  //get the city code: Locations API -> city search
  async getCity(city) {
    const query = `?apikey=${this.key}&q=${city}`;
    const response = await fetch(this.cityURL + query);
    const data = await response.json();
    return data[0];
  }

  //get the current conditions using the city code: Current Conditions API
  async getWeather(id) {
    const query = `${id}?apikey=${this.key}`;
    const response = await fetch(this.weatherURL + query);
    const data = await response.json();
    return data[0];
  }
}
