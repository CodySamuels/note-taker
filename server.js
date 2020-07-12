// DEPENDENCIES
// =============================================================
const express = require("express");


// SETS UP THE EXPRESS APP
// =============================================================
const app = express();
const PORT = process.env.PORT || 8080;


// SETS UP THE EXPRESS APP TO HANDLE DATA PARSING
// =============================================================
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));


// ROUTING
// =============================================================
const routes = require('./public/assets/js/routes');
app.use(routes);


// STARTS THE SERVER TO BEGIN LISTENING
// =============================================================
app.listen(PORT, function () {
    console.log("App listening on http://localhost:" + PORT);
});