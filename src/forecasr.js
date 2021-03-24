const request = require('request')

const forecast = (latlong, callback) => {
    const [lat,long] = latlong
    // console.log(latlong)
    const url = `http://api.weatherstack.com/current?access_key=4cc26753325fbe138582c036f7376176&query=${long},${lat}`

    request({ url: url, json: true}, (err,res) => {
    if(err) {
        callback("Something went wrong")
    } else if(!res.body.current.temperature) {
        callback('Does not exist')
    } else {
        callback(null, res.body.current)

    }
})
}

module.exports = {
    forecast: forecast
}

