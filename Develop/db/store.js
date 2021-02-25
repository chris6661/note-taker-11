const util = require('util');
const fs = require('fs');
//use to gerneate id for notes
const uuid = require('uuid');
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

class Store {
    read() {
        return readFileAsync('db/db.json', 'utf8');
    }

    write(note) {
        return writeFileAsync('db/db.json', JSON.stringify(note));
    }

    getNotes() {
        return this.read().then(notes => {
            let parsedNotes;

            //if notes not in array send new empty array
            try {
                parsedNotes = [].concat(JSON.parse(notes));
            } catch (err) {
                parsedNotes = [];
            }

            return parsedNotes;
        });
    }
    addNote(note) {
        const {
            title,
            text
        } = note;

        if (!title || !text) {
            throw new error("Note title and text can not be blank.");
        }
        //add id to note with uuid
        const newNote = {
            title,
            text,
            id: uuid()
        };

        //get notes, add new, write updated, return new note
        return this.getNotes()
            .then(notes => [...notes, newNote])
            .then(updatedNotes => this.write(updatedNotes))
            .then(() => newNote);
    }

    removeNote(id) {
        // get notes, remove note based on id, write filtered notes
        return this.getNotes()
            .then(notes => notes.filter(note => note.id !== id))
            .then(filteredNotes => this.write(filteredNotes));
    }
}
module.exports = new Store();