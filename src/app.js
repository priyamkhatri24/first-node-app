const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./geocode')
const forecast = require('./forecasr')
const port = process.env.PORT || 3000

const app = express()


const publicDirectoryPath = path.join(__dirname,"../public")
const viewsPath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, "../templates/partials")


app.use(express.static(publicDirectoryPath))
app.set('view engine', 'hbs')
app.set("views",viewsPath)
hbs.registerPartials(partialsPath)


app.get('', (req,res) => {
    res.render('index', {
        title: "Weather",
        name: "Prime"
    })
})
app.get('/weather', (req,res) => {
    if(!req.query.address) {
        return res.send({
            error: "No Place entered"
        })
    }
    geocode.geocode(req.query.address,(err,resp) => {
    
        if(err) res.send({error: err})
        if(resp) {forecast.forecast(resp,(err,current) => {
            if (err) res.send({error: err})
            if(current) res.send({...current, location: req.query.address})
        })}
    })
})
app.get('/about', (req,res) => {
    console.log(req.query)
    res.render('about', {
        title: "ABOUT Us",
        name: "Priyam Khatri"
    })
})
app.get('/help', (req,res) => {
    res.render('help', {
        title: "Help",
        name: "Priyam Khatri"
    })
})
app.get('/help/article', (req,res) => {
    res.render('helparticle', {
        title: "Article",
        name: "Priyam Khatri"
    })
})
app.get('*', (req,res) => {
    res.render('404', {
        title: "Error 404. Page not found",
        name: " Priyam"
    })
})

app.listen(port, () => {
    console.log('server is on')
})