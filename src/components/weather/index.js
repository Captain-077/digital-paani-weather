import React, { useEffect, useState } from 'react'
import Search from '../search'
import humidity from "../images/humidity.png"
import windspeed from "../images/wind.png"
import calender from "../images/calendar.png"
import clouds from "../images/clouds.png"
import Drizzle from "../images/drizzle.png"
import Clear from "../images/clear.png"
import Mist from "../images/mist.png"
import Snow from "../images/snow.png"
import Rain from "../images/rain.png"
import Haze from "../images/haze.png"
import nocity from "../images/nodata.png"


function Weather() {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [weatherData, setWeatherData] = useState(null);

  async function featchWeatherData(param) {
    setLoading(true);
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${param}&appid=5022cc39011ed310ed53b75edf60732d`);

      const data = await response.json();
      console.log(data);
      if (data) {

        setWeatherData(data)
        setLoading(false);

      }
    }

    catch (e) {
      setLoading(false);
      console.log(e);
    }
  }

  useEffect(() => {
    featchWeatherData("New delhi");

  }, [])



  const handleSearch = () => {

    featchWeatherData(search);
  }


  function getcurrentDate() {
    return new Date().toLocaleDateString('en-us', {
      month: "long",
      day: "numeric",
      year: "numeric"
    })
  }
  console.log(loading);



  return (
    <>
      <Search search={search} setSearch={setSearch} handleSearch={handleSearch} />


      {
        !weatherData?.name ?
          (
            <>
              <div className='loading'><img src={nocity} alt="" /></div>
              <p className='humidity'>Location Not found</p>
            </>
          )

          : (

            <div>

              <div className="weather-condition">
                {weatherData?.weather[0]?.main === 'Rain' && <img src={Rain} alt="Rain" />}
                {weatherData?.weather[0]?.main === 'Drizzle' && <img src={Drizzle} alt="Rain" />}
                {weatherData?.weather[0]?.main === 'Clouds' && <img src={clouds} alt="Clouds" />}
                {weatherData?.weather[0]?.main === 'Clear' && <img src={Clear} alt="Clear" />}
                {weatherData?.weather[0]?.main === 'Mist' && <img src={Mist} alt="Mist" />}
                {weatherData?.weather[0]?.main === 'Snow' && <img src={Snow} alt="Mist" />}
                {weatherData?.weather[0]?.main === 'Haze' && <img src={Haze} alt="Mist" />}
              </div>


              <div className="temp">
                <span>{(weatherData?.main?.temp - 273.15).toFixed(0)}°C</span>

              </div>

              <div className="city-name">
                <h2>{weatherData?.name},<span>{weatherData?.sys?.country}</span></h2>
              </div>

              <div className="date">
                <img src={calender} alt="" />
                <span>{getcurrentDate()}</span>
              </div>

              <div className="weather-info">
                <div className='column'>
                  <img src={windspeed} alt="" />
                  <div className='column-text'>
                    <p className='wind'>{weatherData?.wind?.speed}</p>
                    <p>Wind speed</p>
                  </div>
                </div>

                <div className='column'>
                  <img src={humidity} alt="" />
                  <div className='column-text'>
                    <p className='humidity'>{weatherData?.main?.humidity}%</p>
                    <p>Humidity</p>
                  </div>

                </div>

              </div>

            </div>

          )
      }



    </>
  )
}









export default Weather