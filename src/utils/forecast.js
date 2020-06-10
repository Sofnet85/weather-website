const request = require('request')

const forecast = (lat, lon, location, callback) => {
  const url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=fe34be2ce7e9080cc14162e14b27441e`

  request({url: url, json: true}, (error, response) => {
    if (error) {
      callback('Check connection')
    } else if (response.body.cod === '404') {
      callback(`${response.body.message}`)
    } else {
      const celsius = Math.trunc((response.body.main.temp) - 273.15)
      const max = Math.trunc((response.body.main.temp_max) - 273.15)
      const min = Math.trunc((response.body.main.temp_min) - 273.15)
      const feels = Math.trunc((response.body.main.feels_like) - 273.15)
      const fahreinheit = Math.trunc((((response.body.main.temp)-273.15)*1.8)+32)
      callback(undefined, `It's currently ${celsius} degrees in ${location}. The high is ${max} with a low of ${min} and it feels like ${feels}. There is ${response.body.weather[0].description}`)
    }
  })
}

module.exports = forecast