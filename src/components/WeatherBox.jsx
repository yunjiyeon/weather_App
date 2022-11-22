import React from "react";

// props 대신 destrunturing(구조분해)
const WeatherBox = ({ weather }) => {
  //console.log("weather는?", weather);
  // weather?.name  /  weather && weather.name ( 동일한 걸 축약 ) - weather 가 있을 때만 보여 줌
  return (
    <div className="Weather-box">
      <div className="h5">{weather?.name} 날씨 😎</div>
      <h2 className="text-primary h2">
        온도 {weather?.main.temp}°C / 습도 {weather?.main.humidity}%
      </h2>
      <h3 className="text-dark h4">{weather && weather.weather[0].main}</h3>
    </div>
  );
};

export default WeatherBox;
