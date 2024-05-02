import axios from 'axios';

export const getPlacesData = async (type, sw, ne) => {
  try {
    const { data: { data } } = await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`, {
      params: {
        bl_latitude: sw.lat,
        bl_longitude: sw.lng,
        tr_longitude: ne.lng,
        tr_latitude: ne.lat,
      },
      headers: {
        'X-RapidAPI-Key': '',
        'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
      },
    });

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getWeatherData = async (lat, lng) => {
  try {
    if (lat && lng) {
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=`;
      const response = await fetch(url);
      var ans = await response.json();
      const icon = ans.weather[0].icon;
      const main = ans.weather[0].main;
      const temp = (ans.main.temp - 273.15).toFixed(2);   // In degree celcius.
      const wind = ans.wind.speed;    // In meters/second.
      const humidity = ans.main.humidity;   // In percentage.

      let obj = {lat:lat, lon:lng, icon:icon, main:main, temp:temp, wind: wind, humidity: humidity};

      return [obj];
    }
  } catch (error) {
    console.log(error);
  }
};
