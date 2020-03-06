const express = require('express');
const app = express();
const path = require('path');
const geodata = require('./utils/geodata')
const forecast = require('./utils/forecast')

// const simpleRoutes = require('./routes/app');
const publicRoutes = path.join(__dirname,'public');
app.use(express.static(publicRoutes));
app.set("views","views");
app.set('view engine','ejs');
// app.use(simpleRoutes);
app.get('/weather',(req,res,next)=>{
    if(!req.query.address)
    {
        return res.send("send address"); 
    }
    const addr = req.query.address;
    // destructuring of the object is very import .if no data passed we get error so gove default
    geodata(addr,(err,{latitude,longitude,location}={})=>{
        if(err)
        {
            return res.send({err});
        }
        forecast(latitude,longitude,(err,text)=>{
            if(err)
            {
                return res.send({err});
            }
            // return res.render('weather/index',{
            //     pageTitle:'Home',
            //     forecast:text,
            //     address:addr,
            //     location:location
            // });
            res.send({
                forecast:text,
                address:addr,
                location:location
            })   
        })
    });
         
});

app.get("/help",(req,res,next)=>{
    res.render('weather/help',{
        pageTitle:"HELP Bro",
        content:"Vamos equipo .Lets go",
        owner:"CHAMPION"
    })
});
app.get('/help/*',(req,res,next)=>{
    res.send("HElp article not found");
});
app.get('/',(req,res,next)=>{
    return res.render('weather/home',
    {
        pageTitle:'Home',
    })
});

app.get('*',(req,res,next)=>{
    res.status(404).send('404');
});

app.listen(3000);