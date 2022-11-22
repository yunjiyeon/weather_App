/*
  로딩 스피너 추가 
  https://www.npmjs.com/package/react-spinners
*/
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import WeatherBox from "./components/WeatherBox";
import WeatherButton from "./components/WeatherButton";

import PuffLoader from "react-spinners/PuffLoader";

function App() {
  const [weather, setWeather] = useState(null); // 데이터가 있는지 없는지
  const [city, setCity] = useState(""); // 버튼에서 선택한 도시
  const [loading, setLoading] = useState(false);

  const cities = ["seoul", "London", "New york", "Paris", "Tokyo"]; // 버튼에 사용할 도시들을 배열로

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      //console.log("현재 내 위치는?", lat, lon);
      getWeatherByCurrentLocation(lat, lon);
    });
  };

  const getWeatherByCurrentLocation = async (lat, lon) => {
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=37447602c75acbcdf6cce79ff94292ee&units=metric`;
    setLoading(true); // fetch 시작 전 로딩 작동
    let response = await fetch(url); //비동기적, url을 호출해서 데이타를 가져올때가 기다려줘
    let data = await response.json();
    //fetch함수로 불러왔을때는 그대로 사용할 수 없음,json()으로 변환
    // console.log("data는? ", data);
    setWeather(data);
    setLoading(false); // fetch 완료 로딩 끝
  };

  const getWeatherByCity = async () => {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=37447602c75acbcdf6cce79ff94292ee&units=metric`;
    setLoading(true); // fetch 시작 전 로딩 작동
    let response = await fetch(url);
    let data = await response.json();
    setWeather(data);
    setLoading(false); // fetch 완료 로딩 끝
  };

  // 하나로 합쳐서 if로 구분
  useEffect(() => {
    if (city === "") {
      getCurrentLocation();
    } else {
      getWeatherByCity();
    }
  }, [city]);

  // 선택된 버튼 모양을 바꿔주기 위해 selectedCity={city} 추가
  return (
    <>
      {loading ? (
        <div className="container">
          <PuffLoader
            color="skyblue"
            size={120}
            loading={loading}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      ) : (
        <div className="container">
          <WeatherBox weather={weather} />
          <WeatherButton
            cities={cities}
            setCity={setCity}
            selectedCity={city}
          />
        </div>
      )}
    </>
  );
}

export default App;
