var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));

//adding use of public folder
app.use(express.static('public'));


mongoose.connect("mongodb://localhost/wildy");

//SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
    
   name: String,
   image: String,
});

var Campground = mongoose.model('Camground', campgroundSchema);

//Campground.create({
    
//    name: "Kachess Lake", 
//    image:"http://www.kachessridgeresort.com/uploads/1/0/2/5/10252907/1325803461.jpg"
    
//}, function(err, campground){
//    if (err){
//        
//        console.log("Error creating new CG");
//        console.log(err);
//    }
//    else{
//        console.log("New CG added to db");
//        console.log(campground);
//    }
// });








//set view engine
app.set("view engine", 'ejs');

//Set the root route
app.get('/', function(req, res){
    res.render("landing");
})

//Campgrounds page
app.get('/campgrounds', function(req, res){
       //Get all campgrounds from DB
       Campground.find({}, function(err, allCampgrounds){
          if  (err){
             console.log(err);
          }
          else{
             res.render("campgrounds", {campgrounds:allCampgrounds}); 
              
          }
           
           
       });
       
})
// add new campgrounds
app.post('/campgrounds', function(req, res){
    //get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    //create new object to push into array
    var newCampground = {name: name, image: image};
    
    //create new campground and save it to DB
    Campground.create(newCampground,function(err, newlyCreated){
       if (err){
           
           console.log(err)
           
       }
        else{
                //if .create worked, redirect back to campgrounds
              res.redirect('/campgrounds');  
        }
    });

})

app.get('/campgrounds/new', function(req, res){
    res.render('new.ejs');
})







//listen for server
app.listen(process.env.PORT, process.env.IP, function(){
    console.log('Take a hike!');
})