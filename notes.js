const fs = require('fs')
const chalk=require('chalk')

const success=chalk.green
const error=chalk.red

const addNote = function (title, body) {
    const notes = loadNotes()
    const duplicateNotes = notes.filter(function (note) {
        return note.title === title
    })

    if (duplicateNotes.length === 0) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(success('New note added!'))
    } else {
        console.log(error('Note title taken!'))
    }
}

const saveNotes = function (notes) {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = function () {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }
}

const delNote=function(title){
    const notes=loadNotes()
    const duplicateNote=notes.filter(function(note){
        return note.title===title
    })
    if(duplicateNote.length==0){
        console.log(error('No note found with the given title'))
    }
    else{
        const ind=notes.indexOf(duplicateNote[0])
        notes.splice(ind,1)
        saveNotes(notes)
        console.log(success('Note Deleted'))
    }
}

const editNote=function(title,newbody){
    const notes=loadNotes()
    const duplicateNote=notes.filter(function(note){
        return note.title===title
    })
    if(duplicateNote.length==0){
        console.log(error('No note found with the given title'))
    }
    else{
        const ind=notes.indexOf(duplicateNote[0])
        notes[ind].body=newbody
        saveNotes(notes)
        console.log(success('Note Updated !'))
    }
}

const readNote=(title)=>{
    const notes=loadNotes()
    const duplicateNote=notes.filter((note)=>note.title==title)
    if(duplicateNote.length==0){
        console.log(error('No note found with given title !'))
    }
    else{
        console.log(success(duplicateNote[0].title+':\n'+duplicateNote[0].body))
    }
}

module.exports = {
    addNote: addNote,
    loadNotes: loadNotes,
    delNote:delNote,
    editNote:editNote,
    readNote:readNote
}