//jshint esversion:6

const express = require("express");
const bodyparser = require("body-parser");
const date = require(__dirname + "/date.js");

const app = express();

var items = [];
let workItems = [];

app.set("view engine", "ejs");

app.use(bodyparser.urlencoded({
    extended: true
}));

app.use(express.static("public"));

app.get("/", function (req, res) {

    let day = date();

    res.render("lists", {
        listTitle: day,
        newListItem: items
    });
})

app.get("/work", function (req, res) {

    res.render("lists", {
        listTitle: "Work List",
        newListItem: workItems
    });
});


app.post("/", function (req, res) {
    var item = req.body.newitem;
    if (req.body.list === "Work List") {
        workItems.push(item);
        res.redirect("/work");
    } else {

        items.push(item);
        res.redirect("/");
    }


});

app.post("/work", function (req, res) {
    let item = req.body.newitem;
    workItems.push(item);
    res.redirect("/work");
})


app.listen(3000, function () {
    console.log("Server is running on Port 3000");
})