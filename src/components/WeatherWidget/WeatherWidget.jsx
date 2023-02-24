const WeatherWidget = ({ loc }, { weatherToday }, weatherIcon) => {
  return (
    <div>
      <p>
        The weather in {loc} is currently {weatherToday}
      </p>
      <img src={weatherIcon} alt="current weather icon" />
    </div>
  );
};

export default WeatherWidget;
