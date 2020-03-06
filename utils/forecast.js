const request = require('request');

const forecast = (latitude, longitude,callback)=>{
    const url ="https://api.darksky.net/forecast/1e909b169f5355b4a488665fe7638a30/" + latitude + ',' + longitude;
    request({url,json:true},(err,{body})=>{
        if(err)
        {
            return callback('Unable to connect to weather services!', undefined);
        }
        else if (body.error) {
            callback('Unable to find weather. Try another search.', undefined)
        } else {
            callback(undefined, body.daily.data[0].summary + ' It is currently ' 
                                + body.currently.temperature + ' degress out. There is a '
                                 + body.currently.precipProbability + '% chance of rain.')
        }
    })
}
module.exports = forecast;
// forecast(37.8267,-122.4233,(a,b)=>{
//     console.log(b);
// })
