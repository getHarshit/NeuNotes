import React, { useState } from 'react'
import {nanoid} from 'nanoid'
import NotesList from './components/notesList'
import Search from './components/search';
import Header from './components/header';

export default function App(){

  const [notes,setNotes] = useState([
    {
      id : nanoid(),
      text : 'Hello I am here ',
      date: '12/02/23'
    },
    {
      id : nanoid(),
      text : 'Hello 2 am here ',
      date: '12/02/23'
    },
    {
      id : nanoid(),
      text : 'Hello 3 am here ',
      date: '12/02/23'
    }
  ]);

  const [searchtext,setSearchtext] = React.useState(); 

  React.useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem('react-notes-app-data'))
    if(savedNotes){
      setNotes(savedNotes);
    }
    
  }, [])
  

  React.useEffect(() => {
    localStorage.setItem('react-notes-app-data',JSON.stringify(notes))
  }, [notes])
  
  function handleSave(text){
    const date = new Date();
    
    const newNote = {
      id: nanoid(),
      text : text,
      date : date.toLocaleDateString()
    }

    const newNotes = [...notes,newNote];
    setNotes(newNotes);
  }

  function deleteNote(id){
    const newNotes = notes.filter(note=>note.id !== id);
    setNotes(newNotes);
  }
  return <div className='container'>
    <div className='sidebar'>

    </div>
    <div className='noteArea'>
    <Header/>
    <Search handleSearch ={setSearchtext}/>
    <NotesList 
            notes = {searchtext?notes.filter((note)=>note.text.toLowerCase().includes(searchtext)):notes} 
            handleSave = {handleSave} 
            deleteNote = {deleteNote}/>
    </div>
    
  </div>
}