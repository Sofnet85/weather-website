const request = require('request')

const geocode = (address, callback) => {
const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoic29mbmV0IiwiYSI6ImNrYjN0bWxobTA5OG4yem83bzBuc3VkcnMifQ.g-6mBAd7UJfWc-AYkUh9YQ&limit=1'

  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback('Unable to connect', undefined)
    } else if (response.body.message === 'Not Found') {
      callback(undefined, 'Address not Found')
    } else if (response.body.features.length === 0) {
      callback('Unable to find location, try again with different search', undefined)
    } else {
      const latitude = response.body.features[0].geometry.coordinates[1]
      const longitude = response.body.features[0].geometry.coordinates[0]
      const location = response.body.features[0].place_name
      const data = {
        location: location,
        latitude: latitude,
        longitude: longitude
      }
      callback(undefined, data)
    }
  })
}

module.exports = geocode