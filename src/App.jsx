import { useEffect, useState } from "react";
import Article from "./components/Article/Article";
import "./App.scss";
import WeatherWidget from "./components/WeatherWidget/WeatherWidget";
import AllNews from "./containers/AllNews/AllNews";

function App() {
  const [lat, setLat] = useState("");
  const [long, setLong] = useState("");
  const [loc, setLoc] = useState("");
  const [weatherToday, setWeatherToday] = useState("");
  const [greeting, setGreeting] = useState("Hello");
  const [todaysDate, setTodaysDate] = useState(new Date());
  const [weatherIcon, setWeatherIcon] = useState("");
  const [newsArray, setNewsArray] = useState([]);
  const [newsArrayPopulated, setNewsArrayPopulated] = useState(false);

  const { REACT_APP_WEATHER_WIDGET_API_KEY, REACT_APP_NEWS_API_KEY } =
    process.env;

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
  };

  const getWeather = async (lat, long) => {
    let todayWeatherUrl = `https://api.weatherapi.com/v1/forecast.json?key=${REACT_APP_WEATHER_WIDGET_API_KEY}&q=${lat},${long}`;
    const response = await fetch(todayWeatherUrl);
    const data = await response.json();
    setLoc(data.location.name);
    setWeatherToday(data.current.condition.text);
    setWeatherIcon(data.current.condition.icon);
  };

  const getNews = async () => {
    console.log("getNews");
    let todayNewsUrl = `https://newsapi.org/v2/top-headlines?country=gb&pageSize=5&apiKey=${REACT_APP_NEWS_API_KEY}`;
    const response = await fetch(todayNewsUrl);
    const data = await response.json();
    setNewsArray(data.articles);
    setNewsArrayPopulated(true);
    console.log(newsArray);
  };

  useEffect(() => {
    setInterval(() => setTodaysDate(new Date()), 1000);
  }, []);

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
  }, [lat, long]);

  useEffect(() => {
    if (!loc && !weatherToday && !weatherIcon) {
      return;
    } else {
      getWeatherWidget();
    }
  }, [loc, weatherToday, weatherIcon]);

  const getWeatherWidget = () => {
    return (
      <WeatherWidget
        loc={loc}
        weatherToday={weatherToday}
        weatherIcon={weatherIcon}
      />
    );
  };

  useEffect(() => {
    getNews();
  }, [newsArrayPopulated, todaysDate.getHours()]);

  let id = 0;

  // const checkNews = () => {
  //   if ((newsArrayPopulated = true)) {
  //     const allNewsJSX = newsArray.map((article) => {
  //       console.log(article.url);
  //       console.log("getallnews");
  //       return (
  //         <Article
  //           key={id++}
  //           title={article.title}
  //           url={article.url}
  //           author={article.author}
  //         />
  //       );
  //     });
  //   } else return;
  // };

  const allNewsJSX = newsArray.map((article) => {
    console.log("getallnews");
    return (
      <Article
        // key={id++}
        title={article.title}
        url={article.url}
        author={article.author}
      />
    );
  });

  return (
    <div className="App">
      <header className="App-header">
        <h1>{greeting}</h1>
      </header>
      <div>
        <p>The time is: {todaysDate.toLocaleTimeString()}</p>
        <p>
          The weather in {loc} is currently {weatherToday}
        </p>
        {}
        <img src={weatherIcon} alt="current weather icon" />
        <h2>Top News Stories</h2>
        <div>{allNewsJSX}</div>
      </div>
    </div>
  );
}

export default App;
