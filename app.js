require('dotenv').config();


const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended : true}));

app.get("/",function(req,res){
    res.sendFile(__dirname + "/index.html")

});

app.post("/",function(req,res){
    const query = req.body.cityName;
    const apiKey = process.env.API_KEY;
    const unit = "metric";

    const url = process.env.API_URL+ query +"&units="+ unit +"&appid="+apiKey;
    https.get(url,function(resp){

        resp.on("data",function(data){
        const weatherdata= JSON.parse(data)
        const temp = weatherdata.main.temp
        const weatherdescription = weatherdata.weather[0].description
        const icon = weatherdata.weather[0].icon
        const imageurl = "https://openweathermap.org/img/wn/" + icon +"@2x.png"
        res.write("<h1>temp in " + query + " is "+ temp + " degree celcius</h1>");
        res.write("<p>the weather has " + weatherdescription + "</p>")
        res.write("<img src=" + imageurl + ">")
        res.send()

    })
  })
});

app.listen(3000,function(){
    console.log("server is responding")
});