import React from 'react'
import './App.css';

function Day() {
    return (
        <div className="weather-forecast">
            <div className="weather-forecast-item">
                <div className="day">Sunday</div>
                <img src="http://openweathermap.org/img/wn/10d@2x.png" alt="weather icon" className="w-icon"></img>
                <div className="temp">Day - 0°C</div>
                <div className="temp">Night - 0°C</div>
            </div>
        </div>
    )
}
export default Day
