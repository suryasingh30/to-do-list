var express = require("express");
var bodyParser = require("body-parser");
// var path = require("path");

var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

// set view engin
// app.set("views", path.join(__dirname, "views")); 
app.set("view engine", "ejs"); // it tell our app to use ejs as view engin
// app.use
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

    res.render("list", {
        kindOfDay: day,
        // dataitem: items // Initialize dataitem as an empty string
        arrDataItem: items
    });

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
    items.push(item);
    console.log(item);
    res.redirect("/");
});

// app.post('/ans' , (req , res)=>{

//     res.write('hello from Answer :)')
//     res.send();
// });

app.listen(3000, function () {
    console.log("server is running at 3000...");
});