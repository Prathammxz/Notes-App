const express = require("express");
const app = express();
const port = 4000;
const db = require("./Model/index");
const noteController = require("./Controller/noteController");

app.set("view engine", "ejs");
require("./Config/dbConfig");

db.sequelize.sync({ force: false});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get("/", noteController.index);

app.get("/createNote", noteController.renderNote);

app.post("/createNote", noteController.createNote);

app.get("/index", noteController.index);

app.get("/single/:id", noteController.singleNote);

app.get("/delete/:id", noteController.deleteNote);

app.get("/edit/:id", noteController.editNote);

app.post("/updateNote/:id", noteController.updateNote);




app.listen(port, ()=>{
    console.log("Note app started at port 4000")
});