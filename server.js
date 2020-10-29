const express = require('express'),
    exphbs = require('express-handlebars'),
    Burger = require('./models/Burger');

const PORT = process.env.PORT || 3000,
    app = express(),
    routes = require("./controllers/burger_controller");

app.use(express.static("public"))
    .use(express.urlencoded({ extended: true }))
    .use(express.json())
    .engine("handlebars", exphbs({ defaultLayout: "main" }))
    .set("view engine", "handlebars");

app.use(routes);

app.listen(PORT, function(error) {
    if (error) throw error;
    else console.log(`Listening on ${process.env.PORT ? 'https://burger-app-mooj.herokuapp.com/' : `localhost:${PORT}`}`);
});
