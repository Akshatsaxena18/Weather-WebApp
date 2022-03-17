// const time1 = document.getElementById('time');
const date1 = document.getElementById('date');
const time1 = document.getElementById('time');
const currentweatheritem1 = document.getElementById('current-weather-item');
const timezone1 = document.getElementById('timezone');
const country1 = document.getElementById('country');
const weatherforecast1 = document.getElementById('Weather-forecast');
const currenttemp1 = document.getElementById("current-temp");

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const API_KEY = '23c3bff60719521840da4a0ef69e18a5';


setInterval(()=>{
  const time = new Date();
  const month = time.getMonth();
  const date = time.getDate();
  const day = time.getDay();
  const hour = time.getHours();
  const hoursin12hr = hour >= 13 ? hour%12: hour
  const minute = time.getMinutes();
  const ampm = hour>=12? 'PM' : 'AM'
  console.log(hour)
  time1.innerHTML = (hoursin12hr < 10? '0'+hoursin12hr : hoursin12hr) + ':' + (minute < 10? '0'+minute: minute) + ' ' + `<span id="am-pm">${ampm}</span>`

  date1.innerHTML = days[day] + ', ' + date+ ' ' + months[month]


},1000);


getWeatherData()
function getWeatherData () {
    navigator.geolocation.getCurrentPosition((success) => {

        let {latitude, longitude } = success.coords;

        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${API_KEY}`).then(res => res.json()).then(data => {

        console.log(data)
        showWeatherData(data);
        })

    })
}

function showWeatherData (data){
    let {humidity, pressure, sunrise, sunset, wind_speed} = data.current;

    timezone1.innerHTML = data.timezone;
    country1.innerHTML = data.lat + 'N ' + data.lon+'E'

    currentweatheritem1.innerHTML =
    `<div class="Weather-item">
      <div>
        Humidity
      </div>
      <div>
        ${humidity}%
      </div>
    </div>
    <div class="Weather-item">
      <div>
        Pressure
      </div>
      <div>
        ${pressure}
      </div>
    </div>
    <div class="Weather-item">
      <div>
        Wind speed
      </div>
      <div>
        ${wind_speed}km/hr
      </div>
    </div>
    <div class="Weather-item">
      <div>
        Sunrise
      </div>
      <div>
        ${window.moment(sunrise * 1000).format('HH:mm a')}
      </div>
    </div><div class="Weather-item">
      <div>
        Sunset
      </div>
      <div>
      ${window.moment(sunset * 1000).format('HH:mm a')}
      </div>
    </div>`;

    // Scriptsrc

    let otherDayForcast = ''
    data.daily.forEach((day, idx) => {
        if(idx == 0){
            currenttemp1.innerHTML = `
            <img src="http://openweathermap.org/img/wn//${day.weather[0].icon}@4x.png" alt="weather icon" class="w-icon">
            <div class="other">
                <div class="Day">${window.moment(day.dt*1000).format('dddd')}</div>
                <div class="Temperature">Night - ${day.temp.night}&#176;C</div>
                <div class="Temperature">Day - ${day.temp.day}&#176;C</div>
            </div>

            `
        }else{
            otherDayForcast += `
            <div class="weather-forecast-item">
                <div class="day">${window.moment(day.dt*1000).format('ddd')}</div>
                <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="weather icon" class="w-icon">
                <div class="temp">Night - ${day.temp.night}&#176;C</div>
                <div class="temp">Day - ${day.temp.day}&#176;C</div>
            </div>

            `
        }
    })
    weatherforecast1.innerHTML = otherDayForcast;
}
