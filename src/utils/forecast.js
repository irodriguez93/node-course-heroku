const request =  require('request')


const forecast = (lattitude,longitude, callback )=> {
    const url = 'https://api.darksky.net/forecast/18c9fed0acff8ae6fd162ad43a718bf7/'+ lattitude +','+ longitude 
   // console.log(url)

    request({url, json:true}, (error, {body})=>{
        if (error){
            callback('unable to connect to weather service!', undefined)
        }else if (body.error) {
            callback('unable to find location', undefined)

        }else{
            const rainProbability = body.currently.precipProbability
            const degreesCurrent = body.currently.temperature
            const dailySummary = body.daily.data[0].summary
            callback(undefined, dailySummary + ' It is currently ' + degreesCurrent +' degrees out. There is a ' + rainProbability + '% chance of rain')
        }

    })
}

module.exports = forecast