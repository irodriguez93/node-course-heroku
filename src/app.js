const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require ('./utils/geocode')
const forecast = require ('./utils/forecast')
const port = process.env.PORT || 3000



// Define paths for express config
const app = express()
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views', viewsPath)

hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req,res)=>{
    res.render('index', {
        title: 'Weather App',
        name: 'Irving Rodriguez'
    })
})

app.get('/about', (req,res)=>{
    res.render('about', {
        title: 'About Me',
        name: 'Irving Rodriguez'
    })
})

app.get('/help', (req,res)=>{
    res.render('help', {
        title: 'Help Page',
        description: 'This is a help page to help you understand the application',
        name: 'Irving Rodriguez'
    })
})

// app.get('/help', (req, res)=>{
//     res.send([{
//         name: 'Dood',
//         age: 25
//     },
//     {
//         name: 'Sir',
//         age: 23
//     }]
        
//     )
// })

// app.get('/about', (req, res)=>{
//     res.send('<h1>About</h1>')
// })

app.get('/weather', (req, res)=>{
    if (!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    }

    const address = req.query.address
    geocode(address, (error, {lattitude, longitude, location}={})=>{
        if (error){
            return res.send({error})
        }

        forecast(lattitude, longitude, (error, forecastData) => {
            if (error){
                return res.send({error})
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
          })
    })
})

app.get('/products', (req, res) => {
    if(!req.query.search){
       return res.send({
            error: 'Ypou must prove a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products:[]
    })
})
app.get('/help/*', (req, res)=>{
    res.render('error', {
        title: '404',
        errorMessage: 'HELP ARTICLE NOT FOUND',
        name: 'Irving Rodriguez'
    })
})

app.get('*', (req, res)=>{
    res.render('error', {
        title: '404',
        errorMessage: 'PAGE NOT FOUND 404',
        name: 'Irving Rodriguez'
    })
})

app.listen(port,() =>{
    console.log('Server is up on port '+ port)
})