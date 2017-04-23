var express = require('express')
var app = express()
var fs = require('fs');
var port = process.env.PORT || 80;

app.get('/', function(req, res){

    fs.readFile('./readme.html', function (err, html) {
        if (err) {
            throw err; 
        }  
        res.writeHeader(200, {"Content-Type": "text/html"});  
        res.write(html);  
        res.end();  
        
      //res.send(express.static( 'readme.js' || (__dirname, 'public')))
    })
})    

app.get('/:date', function(req, res){
    
    var date = req.params.date
    
    if(isNaN(date)){
        if((new Date(date)).getTime()){
            var normal = formatDate(new Date(date))
            var unixtime = (new Date(date)).getTime()
        }
        else {
            var normal = null;
            var unixtime = null;
        }
    }
    else if(!isNaN(date)){
        if((new Date(+date)).getTime()){
            var normal = formatDate(new Date(+date))
            var unixtime = (new Date(+date)).getTime()
        }
        else {
            var normal = null;
            var unixtime = null;
        }
    }
    else {
      var normal = null;
      var unixtime = null;
    }
    function formatDate(date) {
      var monthNames = [
        "January", "February", "March",
        "April", "May", "June", "July",
        "August", "September", "October",
        "November", "December"
      ];
    
      var day = date.getDate();
      var monthIndex = date.getMonth();
      var year = date.getFullYear();
    
      return monthNames[monthIndex] + ' ' + day + ', ' + year;
    }
    
    var send = {
        unix: unixtime,
        natural: normal
    }
    
    res.send(send)
})

app.listen(port, function(){
    console.log("Timestamp api started")
})