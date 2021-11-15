import React from 'react';
import moment from 'moment';
import Day from './Day'

function Display(props) {

  const { location, temperature, country,
  } = props.weatherData;

  return (
    <div className="App">
      <div className="container">
        <div className="others" id="current-weather-items">
          <div className="title">
            <h1>Weather App</h1>
          </div>
          <div className="Location">
            Location: {location}
          </div>
          <div>
          Today's temperature: {temperature}
          </div>
          <div className="date">
            Date: {moment().format("MMM Do YY")}
          </div>
        </div>
        <div className="data-container">
          <div className="time" id="time">
            <span id="am-pm"></span>
          </div>
          <div className="place-container">
            <div className="time-zone" id="time-zone"></div>
            <h3>{country} / {location}</h3>
          </div>
        </div>
      </div>
      <div className="future-forecast">
        <div className="today" id="current-temp">
          <div className="other">
            <div className="day">Sunday</div>
            <img src="http://openweathermap.org/img/wn/10d@2x.png" alt="weather icon" className="w-icon"></img>
            <div className="temp">Day - 0°C</div>
            <div className="temp">Night - 0°C</div>
            <div>Description</div>
          </div>
        </div>
        <div className="weather-forecast" id="weather-forecast">
        <Day/>
        <Day/>
        <Day/>
        <Day/>
        <Day/>
        </div>
      </div>
    </div>
  );
}
export default Display;
