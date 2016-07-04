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
   latitude: Number,
   longitude: Number,
   state: String,
   description: String
});

var Campground = mongoose.model('Campground', campgroundSchema);

/*Campground.create({
    
    name: "Kachess Lake", 
    image:"http://www.kachessridgeresort.com/uploads/1/0/2/5/10252907/1325803461.jpg",
    state: "Washington",
    description:"Kachess Lake is a lake and reservoir along the course of the Kachess River in Washington state, US. The upper part of the lake, north of a narrows, is called Little Kachess Lake."
    
}, function(err, campground){
    if (err){
        
        console.log("Error creating new CG");
        console.log(err);
    }
    else{
        console.log("New CG added to db");
        console.log(campground);
    }
 });
*/







//set view engine
app.set("view engine", 'ejs');

//Set the root route
app.get('/', function(req, res){
    res.render("landing");
})

//Campgrounds page *INDEX ROUTE*
app.get('/campgrounds', function(req, res){
       //Get all campgrounds from DB
       Campground.find({}, function(err, allCampgrounds){
          if  (err){
             console.log(err);
          }
          else{
             res.render("index", {campgrounds:allCampgrounds}); 
              
          }
           
           
       });
       
})
// add new campgrounds *CREATE route*
app.post('/campgrounds', function(req, res){
    //get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var latitude = req.body.latitude;
    var longitude = req.body.longitude;
    var state = req.body.state;
    var description = req.body.description; 
    //create new object to push into array
    var newCampground = {
        name: name, 
        image: image,
        latitude: latitude,
        longitude: longitude,
        state: state,
        description: description
        
        
    };
    
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
//*NEW route*
app.get('/campgrounds/new', function(req, res){
    res.render('new.ejs');
})


// *SHOW route* 


app.get('/campgrounds/:id', function(req, res) {
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            console.log(err);
        }
        else{
            res.render("show.ejs", {campground: foundCampground})
            
        }
        
    })
})







//listen for server
app.listen(process.env.PORT, process.env.IP, function(){
    console.log('Take a hike!');
})