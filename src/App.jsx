import axios from "axios";
import { useEffect, useState } from "react";
import { MdOutlineWbSunny } from "react-icons/md";
import { BsCloudSunFill } from "react-icons/bs";
import { IoCloudSharp } from "react-icons/io5";
import { BsFillCloudsFill } from "react-icons/bs";
import { FaCloudShowersHeavy } from "react-icons/fa";
import { FaCloudSunRain } from "react-icons/fa";
import { MdThunderstorm } from "react-icons/md";
import { BsSnow2 } from "react-icons/bs";
import { RiMistFill } from "react-icons/ri";

const weatherIcon = {
  "01": {
    textColor: "text-red-500",
    icon: <MdOutlineWbSunny size={120} />,
    text: "해",
  },
  "02": {
    textColor: "text-orange-500",
    icon: <BsCloudSunFill size={120} />,
    text: "구름 조금",
  },
  "03": {
    textColor: "text-blue-300",
    icon: <IoCloudSharp size={120} />,
    text: "흐림",
  },
  "04": {
    textColor: "text-current",
    icon: <BsFillCloudsFill size={120} />,
    text: "구름 많음",
  },
  "09": {
    textColor: "text-cyan-500",
    icon: <FaCloudShowersHeavy size={120} />,
    text: "비 조금",
  },
  10: {
    textColor: "text-blue-800",
    icon: <FaCloudSunRain size={120} />,
    text: "비",
  },
  11: {
    textColor: "text-yellow-500",
    icon: <MdThunderstorm size={120} />,
    text: "번개",
  },
  13: {
    textColor: "text-indigo-300",
    icon: <BsSnow2 size={120} />,
    text: "눈",
  },
  50: {
    textColor: "text-neutral-500",
    icon: <RiMistFill size={120} />,
    text: "안개",
  },
};

const App = () => {
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [weatherData, setWeatherData] = useState();

  const getGeolocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    });
  };

  const getWeather = async () => {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.REACT_APP_WEATHER_KEY}&units=metric`
    );

    setWeatherData(response.data);
  };
  useEffect(() => {
    getGeolocation();
  }, []);

  useEffect(() => {
    if (!latitude || !longitude) return;

    getWeather();
  }, [latitude, longitude]);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-2xl">
      {weatherData ? (
        <div
          className={`flex flex-col items-center gap-8 ${
            weatherIcon[weatherData.weather[0].icon.substring(0, 2)].textColor
          }`}
        >
          {weatherIcon[weatherData.weather[0].icon.substring(0, 2)].icon}
          <div>
            {weatherIcon[weatherData.weather[0].icon.substring(0, 2)].text}
          </div>
          <div>
            {weatherData.name}, {weatherData.main.temp}
          </div>
        </div>
      ) : (
        <div>로딩중...</div>
      )}
    </div>
  );
};

export default App;
