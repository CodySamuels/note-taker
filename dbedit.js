const fs = require("fs");
const util = require("util");
const noteData = "db/db.json"

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
            const combineNotes = [noteArr, ...existingNotes]
            await writeFileAsync(noteData, JSON.stringify(combineNotes))
        } catch (err) {
            throw err
        }
    }
}

module.exports = new DB();


// Router.get instead of app/get
// router.get('api/notes', async (req,res) => res.json(await DB.readJSON))

// router.post('api/notes', async (req,res) => {
// const newNote = req.body
// const currentNotes = await DB.readJSON();
// await DB.writeJSON(newNote, currentNotes) //?
// res.json(newNotes)
// })

// module.exports = new DB();