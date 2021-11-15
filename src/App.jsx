import React from 'react'
import './App.css';
import Display from './Display'
import Axios from 'axios'
import Navbar from './Navbar'
import moment from 'moment'

class App extends React.Component {

  state = {
    coords: {
      latitude: Number,
      longitude: Number
    },
    data: {},
    inputDate: ""
  }

  componentDidMount() {

    navigator.geolocation.getCurrentPosition((position) => {
      let newCoords = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      }
      this.setState({ coords: newCoords });
      const API_KEY = 'a3dfc64f016495e5f5c25ba2eabe80cf'

      Axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${this.state.coords.latitude}&lon=${this.state.coords.longitude}&appid=${API_KEY}`)
        .then(result => {
          console.log(result)

          let weatherData = {
            location: result.data.city.name,
            temperature: Math.round(result.data.list[0].main.feels_like / 10) + "°",
            country: result.data.city.country,
          }
          this.setState({ data: weatherData });
        })

      Axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${this.state.coords.latitude}&lon=${this.state.coords.longitude}&exclude={daily}&appid=${API_KEY}`)
        .then(res => {
          console.log(res);
          let currentTempEl = document.getElementById('current-temp');
          let weatherForecastEl = document.getElementById('weather-forecast');

          let otherDayForcast = "";
          res.data.daily.forEach((day, idx) => {
            if (idx === 0) {
              currentTempEl.innerHTML = `
                  <div class="other">
                  <div class="day">${moment(day.dt * 1000).format('dddd')}</div>
                  <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="weather icon" class="w-icon"/>
                  <div class="temp">Day - ${Math.round(day.temp.day / 10)}&#176;C</div>
                  <div class="temp">Night - ${Math.round(day.temp.night / 10)}&#176;C</div>
                  <div class="temp">Description - ${day.weather[0].description}</div>
              </div>`
            } else if (idx < 7) {
              otherDayForcast += ` 
                       <div class="weather-forecast-item">
                  <div class="day">${moment(day.dt * 1000).format('dddd')}</div>
                       <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="weather icon" class="w-icon"/>
                       <div class="temp">Day - ${Math.round(day.temp.day / 10)}&#176;C</div>
                       <div class="temp">Night - ${Math.round(day.temp.night / 10)}&#176;C</div>
                       <div class="temp">Description - ${day.weather[0].description}</div>
                   </div>
                  `
            }
          })
          weatherForecastEl.innerHTML = otherDayForcast;
        })
    })
  }
  change = (value) => {
    this.setState({ inputDate: value })
  }

  changeWeather = (event) => {
    event.preventDefault();
    const API_KEY = 'a3dfc64f016495e5f5c25ba2eabe80cf'

    

    Axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${this.state.inputDate}&exclude={daily}&appid=${API_KEY}`)
      .then(res => {
        console.log(res);

        let weatherData = {
          location: res.data.city.name,
          temperature: Math.round(res.data.list[0].main.temp / 10) + "°",
          country: res.data.city.country,
        }
        this.setState({ data: weatherData });

        let latLon = {
          latitude: res.data.city.coord.lat,
          longitude: res.data.city.coord.lon
        }
        this.setState({ newCoords: latLon });
        

        Axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${this.state.newCoords.latitude}&lon=${this.state.newCoords.longitude}&exclude={daily}&appid=${API_KEY}`)
          .then(res => {
            console.log(res);
            let currentTempEl = document.getElementById('current-temp');
            let weatherForecastEl = document.getElementById('weather-forecast');

            let otherDayForcast = "";
            res.data.daily.forEach((day, idx) => {
              if (idx === 0) {
                currentTempEl.innerHTML = `
                    <div class="other">
                    <div class="day">${moment(day.dt * 1000).format('dddd')}</div>
                    <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="weather icon" class="w-icon"/>
                    <div class="temp">Day - ${Math.round(day.temp.day / 10)}&#176;C</div>
                    <div class="temp">Night - ${Math.round(day.temp.night / 10)}&#176;C</div>
                    <div class="temp">Description - ${day.weather[0].description}</div>
                </div>
                `
              } else if (idx < 7) {
                otherDayForcast += ` 
                         <div class="weather-forecast-item">
                    <div class="day">${moment(day.dt * 1000).format('dddd')}</div>
                         <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="weather icon" class="w-icon"/>
                         <div class="temp">Day - ${Math.round(day.temp.day / 10)}&#176;C</div>
                         <div class="temp">Night - ${Math.round(day.temp.night / 10)}&#176;C</div>
                         <div class="temp">Description - ${day.weather[0].description}</div>
                     </div>
                   `
              }
            })
            weatherForecastEl.innerHTML = otherDayForcast;
          })
      })
  }
  render() {
    return (
      <div className="App" >
        <Display weatherData={this.state.data} />
        <Navbar changeWeather={this.changeWeather} changeRegion={this.change} />
      </div>
    )
  }
}
export default App;