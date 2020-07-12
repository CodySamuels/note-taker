// DEPENDENCIES
// =============================================================
const express =require("express");
const path = require("path")
const router = express.Router();
const DB = require("./dbedit.js");


// GET CALLS
// =============================================================
router.get("/notes.html", (req, res) => {
    res.sendFile(path.join(__dirname, "../../notes.html"));
});

router.get('/api/notes', async (req, res) => {
    res.json(await DB.readJSON())
});

router.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../../index.html"));
});


// POST CALLS
// =============================================================
router.post('/api/notes', async (req, res) => {
    const newNoteData = req.body
    const currentNotes = await DB.readJSON();
    await DB.writeJSON(newNoteData, currentNotes)
    res.json("Success!")
})


// DELETE CALLS
// =============================================================
router.delete('/api/notes/:id', async (req, res) => {
    const requestedID = req.params.id;
    const currentNotes = await DB.readJSON();
    await DB.deleteJSON(currentNotes, requestedID)
    res.json("Success!")
})


// EXPORT
// =============================================================
module.exports = router;