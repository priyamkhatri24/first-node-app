const request = require('request')
const yargs  = require('yargs')
const forecast = require('./forecasr.js')


// const loc = yargs.argv._.join(' ')

const geocode = (address, callback) => {
    if (!address) {
        console.log('no place provided')
        return
    }
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoicHJpeWFta2hhdHJpMjQiLCJhIjoiY2ttaGV0eHJuMDZwZzJ2bnZ6bXZxejNlZSJ9.i_6x9zf2x3LCld5HUjFDtQ`
    request({ url:url, json: true}, (err,res) => {
        if(err) {
            callback("Something went wrong:",null)
        } else if(!res.body.features.length) {
            callback("Location not found", null)
        }
        else {
            callback(null, res.body.features[0].center)
        }
    })
}



module.exports={
    geocode: geocode
}
