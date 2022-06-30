import React from "react";
import Note from './notes'
import AddNote from './addNote'
export default function List(prop){

    const notes = prop.notes.map(note=>{
        return <Note id = {note.id}
                    title = {note.title} 
                    text = {note.text} 
                    date = {note.date} 
                    key = {note.id} 
                    deleteNote = {prop.deleteNote}
                    pinNote = {prop.pinNote}
                    editNote = {prop.editNote}
                    />
    })
    return <div className="notesList">
        {prop.currentPage === 1 && <AddNote handleSave = {prop.handleSave}/>}
        {notes}
    </div>
}