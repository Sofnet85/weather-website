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
      const fahreinheit = Math.trunc((((response.body.main.temp)-273.15)*1.8)+32)
      callback(undefined, `It's currently ${celsius} degrees in ${location}, with ${response.body.weather[0].description}`)
    }
  })
}

module.exports = forecast