var express = require('express');
var app = express();


var campgrounds = [
    {name: "Kachess Lake", image:"http://www.kachessridgeresort.com/uploads/1/0/2/5/10252907/1325803461.jpg"},
    {name: "Lake Chelan", image:"http://www.nwseaplanes.com/wp-content/uploads/lake-chelan.jpg"},
    {name: "Lake Wenatchee State Park", image:"https://c8.staticflickr.com/6/5225/5631019207_6113c94876.jpg"},
    {name: "Icicle Creek", image:"http://d7bmbwiglir4w.cloudfront.net/sites/default/files/photos/routes/Camping.jpg"},
    {name: "North Fk. Teanaway River", image:"http://www.yakimaforever.org/wp-content/flagallery/north-fork-teanaway-river/img_0127web.jpg"},
    {name: "Lunch Counter, Mt. Adams", image:"http://www.oregonhikers.org/w/images/thumb/c/c3/MtAdams4.jpg/400px-MtAdams4.jpg"},
    {name: "Mount Rainier National Park", image:"https://upload.wikimedia.org/wikipedia/commons/3/32/Mount_Rainier_from_above_Myrtle_Falls_in_August.JPG"},
    {name: "Olympic National Park", image:"http://images.boomsbeat.com/data/images/full/23858/37-jpg.jpg"}
               ];

app.set("view engine", 'ejs');
//Set the root route
app.get('/', function(req, res){
    
    
    res.render("landing");
    
})

//Campgrounds page
app.get('/campgrounds', function(req, res){
    
    res.render("campgrounds", {campgrounds:campgrounds});
})



app.listen(process.env.PORT, process.env.IP, function(){
    
    
    console.log('Take a hike!');
    
})