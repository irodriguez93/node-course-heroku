const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' +encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiaXJvZHJpZ3VlejkzIiwiYSI6ImNqeXcwcDAybTBjNWozaGxnNTQwcG16eGUifQ.v4fED-g0CJb_l3TKS-YUXg'
    
    request({url, json: true}, (error,{body})=>{

        if (error){
            callback('unable to connnect to location services')
        } else if (body.message==='Not Authorized - Invalid Token') {
            callback('Not Authorized - Invalid Token')
    
        }else if (body.features === undefined || body.features.length == 0){
          callback('unable to find location')
        }else{
            callback(undefined,{
                lattitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
         }

    })
}


module.exports = geocode