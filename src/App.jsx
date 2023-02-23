import { useEffect, useState } from "react";
import "./App.scss";

function App() {
  const [lat, setLat] = useState("");
  const [long, setLong] = useState("");
  const [loc, setLoc] = useState("Empty");
  const [weatherToday, setWeatherToday] = useState("Empty");
  // const [weatherTom, setWeatherTom] = useState("Empty");
  const [greeting, setGreeting] = useState("Hello");
  const [todaysDate, setTodaysDate] = useState(new Date());
  const [weatherIcon, setWeatherIcon] = useState("No link available");
  let url = "";
  // let tomDate = new Date(todaysDate);
  // tomDate.setDate(tomDate.getDate() + 1);
  // let tomorrowDateUrl = `&dt=${tomDate.getFullYear}-${tomDate.getMonth}-${tomDate.getDate}`;
  const { REACT_APP_API_KEY } = process.env;

  const getgreeting = () => {
    console.log(todaysDate.getHours());
    if (todaysDate.getHours() >= 5 && todaysDate.getHours() < 12) {
      setGreeting("Good Morning");
    } else if (todaysDate.getHours() >= 12 && todaysDate.getHours() < 18) {
      setGreeting("Good Afternoon");
    } else if (todaysDate.getHours() >= 18 && todaysDate.getHours() < 22) {
      setGreeting("Good Evening");
    } else if (todaysDate.getHours() >= 22 && todaysDate.getHours() < 5) {
      setGreeting("Good Night");
    } else {
      setGreeting("Something went wrong");
    }
  };

  const checkGeo = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(getPosition);
    } else {
      alert = "Browser doesn't support Geolocation.";
    }
  };

  const getPosition = (position) => {
    setLat(position.coords.latitude);
    setLong(position.coords.longitude);
    // console.log(tomDate);
  };

  const getWeather = async (lat, long) => {
    url = `https://api.weatherapi.com/v1/forecast.json?key=${REACT_APP_API_KEY}&q=${lat},${long}`;
    const response = await fetch(url);
    const data = await response.json();
    setLoc(data.location.name);
    setWeatherToday(data.current.condition.text);
    setWeatherIcon(data.current.condition.icon);
  };

  useEffect(() => {
    setInterval(() => setTodaysDate(new Date()), 1000);
  });

  useEffect(() => {
    getgreeting();
  }, [todaysDate.getSeconds()]);

  useEffect(() => {
    checkGeo();
  }, []);

  useEffect(() => {
    if (!lat || !long) {
      return;
    }
    getWeather(lat, long);
    // getWeatherTom(lat, long);
  }, [lat, long]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>{greeting}</h1>
      </header>
      <div>
        <p>The time is: {todaysDate.toLocaleTimeString()}</p>
        {/* <p>
          Current latitude and longitude of the user is: {lat} & {long}
        </p> */}
        <p>
          The weather in {loc} is currently {weatherToday}
        </p>
        <img src={weatherIcon} alt="current weather icon" />

        <p></p>
      </div>
    </div>
  );
}

export default App;
