import React from "react";

const WeatherWidget = () => {
  const getWeather = async (lat, long) => {
    url = `https://api.weatherapi.com/v1/forecast.json?key=${REACT_APP_API_KEY}&q=${lat},${long}`;
    const response = await fetch(url);
    const data = await response.json();
    setLoc(data.location.name);
    setWeatherToday(data.current.condition.text);
    setWeatherIcon(data.current.condition.icon);
  };

  return <div>WeatherWidget</div>;
};

export default WeatherWidget;
