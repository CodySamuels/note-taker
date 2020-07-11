// DEPENDENCIES
// =============================================================
const express = require("express");
const path = require("path");
const DB = require("./dbedit.js");


// SETS UP THE EXPRESS APP
// =============================================================
const app = express();
const PORT = process.env.PORT || 8080;


// SETS UP THE EXPRESS APP TO HANDLE DATA PARSING
// =============================================================
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// GET CALLS
// =============================================================
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/notes.html", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});

// app.get("/api/notes", function (req, res) {
//     res.sendFile(path.join(__dirname, noteData))
// });


// POST CALLS
// =============================================================
// app.post("/api/notes", function (req, res) {
//     let newNote = req.body;
//     arrayOfStuff.push(newNote);
//     writenewJSON(arrayOfStuff)
//     res.json(newNote);
// });

// STARTS THE SERVER TO BEGIN LISTENING
// =============================================================
app.listen(PORT, function () {
    console.log("App listening on http://localhost:" + PORT);
});

// FUNCTIONS AND VARIABLES FOR OTHER STUFF TO BE EXPORTED LATER
// const writenewJSON = (x) => {
//     fs.writeFile('./db/db.json', JSON.stringify(x), (err) => {
//         if (err) throw err;
//     })
// }




// TESTING ROUTES
// =============================================================

app.get('/api/notes', async (req, res) => {
    res.json(await DB.readJSON())
})

app.post('/api/notes', async (req, res) => {
    const newNote = req.body
    const currentNotes = await DB.readJSON();
    await DB.writeJSON(newNote, currentNotes)
    res.json(newNote)
})

app.delete('/api/notes/:id'), function (req, res) {
    // filter FUNCTION
    res.json()

    res.send('Got a DELETE REQUEST')
} 

const deleteNote = (id) => {
    return $.ajax({
      url: "api/notes/" + id,
      method: "DELETE",
    });
  };