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

app.get("/notes.html", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get('/api/notes', async (req, res) => {
    res.json(await DB.readJSON())
})

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

// POST CALLS
// =============================================================
app.post('/api/notes', async (req, res) => {
    const newNoteData = req.body
    const currentNotes = await DB.readJSON();
    await DB.writeJSON(newNoteData, currentNotes)
    res.json(newNoteData)
})

// DELETE CALLS
// =============================================================
app.delete('/api/notes/:id', async (req, res) => {
    const requestedID = req.params.id;
    const currentNotes = await DB.readJSON();
    const remainingNotes = await DB.deleteJSON(currentNotes, requestedID)
    res.json(remainingNotes)
})

// STARTS THE SERVER TO BEGIN LISTENING
// =============================================================
app.listen(PORT, function () {
    console.log("App listening on http://localhost:" + PORT);
});