const request = require('request');

const geodata = (address,callback)=>{
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" 
    + address+
    ".json?access_token=pk.eyJ1IjoiY29kaW5nZHJlYW1pbmciLCJhIjoiY2s3ZG82eGxxMDIxZzNybzE1c2sxb2x1eCJ9.f8tUy09D8rujhJGHU4CzsA";
    request({url,json:true},(err,{body})=>{
        if(err)
        {
            return callback('Unable to connect to location services!', undefined);
        }
        else if (body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        }
         else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}
module.exports = geodata;
// geodata("Los%20Angeles",(a,b)=>{
//     console.log(b);
// })
