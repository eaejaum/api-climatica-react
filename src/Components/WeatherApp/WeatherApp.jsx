import { useState } from 'react';
import './WeatherApp.css';

import clear_icon from '../Assets/clear.png';
import clouds_icon from '../Assets/clouds.png';
import drizzle_icon from '../Assets/drizzle.png';
import humidity_icon from '../Assets/humidity.png';
import rain_icon from '../Assets/rain.png';
import search_icon from '../Assets/search.png';
import snow_icon from '../Assets/snow.png';
import wind_icon from '../Assets/wind.png';

const WeatherApp = () => {

    let apiKey = "9c81e49464655ec2cbce67034d956ef9";

    const [icon, setIcon] = useState(clouds_icon);

    const search = async () => {
        const input = document.getElementsByClassName("city-input");
        if(input[0].value === "") {
            return 0;
        }
        
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${input[0].value}&units=Metric&appid=${apiKey}`;
        let response = await fetch(url);
        let data = await response.json();
        console.log(data);

        const humidity = document.getElementsByClassName("humidity-percent");
        const wind = document.getElementsByClassName("wind-speed");
        const temp = document.getElementsByClassName("weather-temp");
        const location = document.getElementsByClassName("weather-location");

        humidity[0].innerHTML = data.main.humidity + " %";
        wind[0].innerHTML = Math.floor(data.wind.speed) + " Km/h";
        temp[0].innerHTML = Math.floor(data.main.temp) + "°C";
        location[0].innerHTML = data.name;

        if(data.weather[0].icon === "01d" || data.weather[0].icon === "01n") {
            setIcon(clear_icon);
        } else if(data.weather[0].icon === "02d" || data.weather[0].icon === "02n"){
                setIcon(clouds_icon);
        } else if(data.weather[0].icon === "03d" || data.weather[0].icon === "03n"){
            setIcon(clouds_icon);
        } else if(data.weather[0].icon === "04d" || data.weather[0].icon === "04n"){
        setIcon(clouds_icon);
        } else if(data.weather[0].icon === "09d" || data.weather[0].icon === "09n"){
            setIcon(rain_icon);
        } else if(data.weather[0].icon === "10d" || data.weather[0].icon === "10n"){
            setIcon(rain_icon);
        } else if(data.weather[0].icon === "13d" || data.weather[0].icon === "13n"){
            setIcon(snow_icon);
        } else {
            setIcon(clear_icon);
        }
    }

    return (
        <div className="container">  
            <div className="top-bar">
                <input type="text" className="city-input" placeholder='Search'/>
                <div className="search-icon" onClick={() => {search()}}>
                    <img src={search_icon} alt="" />
                </div>
            </div>
            <div className="weather-image">
                <img src={icon} alt="" />
            </div>
            <div className="weather-temp">24°C</div>
            <div className="weather-location">London</div>
            <div className="data-container">
                <div className="element">
                    <img src={humidity_icon} alt="" className='icon'/>
                    <div className="data">
                        <div className="humidity-percent">64%</div>
                        <div className="text">Humidity</div>
                    </div>
                </div>
                <div className="element">
                    <img src={wind_icon} alt="" className='icon'/>
                    <div className="data">
                        <div className="wind-speed">18km/h</div>
                        <div className="text">Wind Speed</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WeatherApp;