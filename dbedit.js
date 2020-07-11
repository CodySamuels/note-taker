const fs = require("fs");
const util = require("util");
const noteData = "db/db.json"
const uuidv1 = require("uuid/v1")

// PROMISIFY
// =============================================================
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);


class DB {
    async readJSON() {
        try {
            const notesRaw = await readFileAsync(noteData, "utf8")
            return notesRaw ? JSON.parse(notesRaw) : []
        } catch (err) {
            throw err
        }
    }

    async writeJSON(noteArr, existingNotes) {
        try {
            const {title, text} = noteArr;
            const newNote = {title, text, id: uuidv1()}
                
            
            // console.log(newNote)
            // console.log(existingNotes)
            const combineNotes = [newNote, ...existingNotes]
            await writeFileAsync(noteData, JSON.stringify(combineNotes))
        } catch (err) {
            throw err
        }
    }
}

// readfiles 
// filter by ID
// 
const Test = notes.filter(function(id){
    return id !== idRequested;
})

// 
// write to file

module.exports = new DB();