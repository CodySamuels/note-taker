const fs = require("fs");
const util = require("util");
const uuidv1 = require("uuid/v1");
const noteDatabase = "./db/db.json"

// PROMISIFY
// =============================================================
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

class DB {
    async readJSON() {
        try {
            const notesRaw = await readFileAsync(noteDatabase, "utf8")
            return notesRaw ? JSON.parse(notesRaw) : []
        } catch (err) {
            throw err
        }
    }

    async writeJSON(newNoteData, currentNotes) {
        try {
            const { title, text } = newNoteData;
            const newNote = { title, text, id: uuidv1() }
            const combineNotes = [newNote, ...currentNotes]
            await writeFileAsync(noteDatabase, JSON.stringify(combineNotes))
        } catch (err) {
            throw err
        }
    }

    async deleteJSON(currentNotes, requestedID) {
        try {
            const filteredNotes = currentNotes.filter(note => {
                if (note.id !== requestedID) {
                    return true
                }
            })
            await writeFileAsync(noteDatabase, JSON.stringify(filteredNotes))

        } catch (err) {
            throw err
        }
    }
}

module.exports = new DB();