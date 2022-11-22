// 버튼을 배열로
import React from "react";
import { Button } from "react-bootstrap"; // 부트스트랩 설치 후 연결

// App에서 props로 받아옴
const WeatherButton = ({ cities, setCity, selectedCity }) => {
  //console.log("cities는?", cities);
  return (
    <div className="button-box">
      <Button
        variant={`${selectedCity === "" ? "primary" : "outline-primary"}`}
        onClick={() => setCity("")}
      >
        Current Location
      </Button>
      {cities.map((city, index) => (
        <Button
          variant={`${selectedCity === city ? "dark" : "outline-dark"}`}
          key={index}
          onClick={() => setCity(city)}
        >
          {city}
        </Button>
      ))}
    </div>
  );
};

export default WeatherButton;
