var express = require('express');
var app = express();

app.use('/hey', function(re,res,next){
    res.send("heyy there!");
})

var port = 3000;
app.listen( port, function(){
    console.log("Server is running...On port" + port);
}) 


