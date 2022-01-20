require("dotenv").config();
const express = require("express");
const path = require("path");
const app = express();
var bodyParser = require('body-parser')
app.set("view engine", "ejs");
const User = require("./models/User");


const pokemonController = require("./controllers/pokemon");
const pokemon_strongController = require("./controllers/pokemon_strong");
const pokemon_weakController = require("./controllers/pokemon_weak");
const userController = require("./controllers/user");



app.get("/logout", async (req, res) => {
  req.session.destroy();
  global.user = false;
  res.redirect('/');
})

app.get("/Pokemon_List", pokemonController.list);
app.get("/Pokemon_List/delete/:id", pokemonController.delete)
app.get("/Pokemon_List/update/:id", pokemonController.edit);
app.post("/Pokemon_List/update/:id", pokemonController.update);

app.get("/Pokemon_Update/:id", pokemonController.edit);

app.get("/Pokemon_Strong", pokemon_strongController.list);
app.get("/Strong_Choice", pokemon_strongController.strong);

app.get("/Pokemon_Weak", pokemon_weakController.list);
app.get("/Weak_Choice", pokemon_weakController.weak);

/**
 * notice above we are using dotenv. We can now pull the values from our environment
 */



 const mongoose = require("mongoose");
 const { WEB_PORT, MONGODB_URI } = process.env;
 
 mongoose.connect(MONGODB_URI, { useNewUrlParser: true });
 
 mongoose.connection.on("error", (err) => {
   console.error(err);
   console.log("MongoDB connection error. Please make sure MongoDB is running.");
   process.exit();
 });
 

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));



app.get("/", (req, res) => {
  res.render("index");
});

app.get("/Pokemon_New", (req, res) => {
  res.render("Pokemon_New");
});

app.post("/Pokemon_New", pokemonController.create);

app.get("/Create_User", (req, res) => {
  res.render('Create_User', { errors: {} })
});

app.post("/join", userController.create);

app.get("/Login", (req, res) => {
  res.render('Login_User', { errors: {} })
});
app.post("/Login", userController.login);



app.listen(WEB_PORT, () => {
  console.log(`Example app listening at http://localhost:${WEB_PORT}`);
});
