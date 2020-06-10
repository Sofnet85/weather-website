const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Set up handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Set up static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Elf'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About me',
    name: 'Elf'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    body: 'This Weather App was created by Elf following \"Andrew Mead\'s tutorial\"',
    name: 'Elf'
  })
})

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'You must provide a valid location!'
    })
  }

  geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
    if (error) {
      return res.send({ error : error})
    }

    forecast(latitude, longitude, location, (error, forecast) => {
      if (error) {
        return res.send({ error: 'You must provide a valid location! 2'})
      }

      res.send({
        forecast: forecast,
        location,
        address: req.query.address
      })
    })
  })  
})

app.get('/products', (req, res) => {
  if (!req.query.products) {
    return res.send({
      error:'You must provide a search term!'
    })
  }

  console.log(req.query)
  res.send({
    products: []
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Elf',
    errorMessage: 'Page not found'
  })
})

app.listen(3000, () => {
  console.log('Server is up on Port 3000')
})