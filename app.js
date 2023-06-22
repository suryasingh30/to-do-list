var express = require("express");
var bodyParser = require("body-parser");
const { default: mongoose } = require("mongoose");
const { log } = require("console");
// var path = require("path");

var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

mongoose.connect("mongodb://localhost:27017/todolistDB", {useNewUrlParser: true});

// const Item = new mongoose.Schema({
//     work: {
//         type: [String],  // Defines an array of strings
//         default: [],    // Optional: Provide a default value for the field
//     },
// });

const itemSchema = {
    name: String
};

const Item = mongoose.model('Item', itemSchema);

// set view engin
// app.set("views", path.join(__dirname, "views")); 
app.set("view engine", "ejs"); // it tell our app to use ejs as view engin
app.use
var items = [];

app.get('/' , (req , res)=>{
    
    var today = new Date();
    var option = {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
    };

    var day = today.toLocaleDateString("en-US", option);

    Item.find({})
        .then(foundItems => {
            // console.log(foundItems);
            if(foundItems.length === 0)
            {
                Item.insertMany(defaultItems)
                .then(() => {
                    console.log("Starting items are added");
                })
                .catch((err) => {
                    console.log(err);
                });
                res.redirect('/');
            }
            else
            {
                res.render("list", {
                    kindOfDay: day,
                    // dataitem: items // Initialize dataitem as an empty string
                    arrDataItem: foundItems
                });
            }
        })

    // res.render("list", {
    //     kindOfDay: day,
    //     // dataitem: items // Initialize dataitem as an empty string
    //     arrDataItem: items
    // });

});

// app.get('/home' , (req , res)=>{

// //    res.sendFile(__dirname + "/index.html");
//     res.render("index");

// });

// app.post('/added' , (req , res)=>{

//     var item = req.body.item;
//     console.log(item);
//     // res.send();
//     res.render('list', { 
//         kindOfDay: "",
//         dataitem: item // Pass the item data to the template
//     });
//     res.redirect('/');
// });

app.post('/' , (req , res)=>{

    var item = req.body.item;
    // defaultItems.push(item);
    const newItem = new Item({
        name: item
    });
    newItem.save()
      .then(savedItem => {
        console.log("Item is added:", savedItem);
      })
      .catch(err => {
        console.log(err);
      });
    console.log(item);
    res.redirect("/");
});

// app.post('/ans' , (req , res)=>{

//     res.write('hello from Answer :)')
//     res.send();
// });

// inserting element in data base
const item1 = new Item({
    name: "this is a simple to do list"
});

const item2 = new Item({
    name: "add elements"
});

const defaultItems = [item1, item2];

// Item.insertMany(defaultItems)
//   .then(() => {
//     console.log("Starting items are added");
//   })
//   .catch((err) => {
//     console.log(err);
//   });

app.listen(3000, function () {
    console.log("server is running at 3000...");
});