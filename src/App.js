import React, { useState } from 'react'
import {nanoid} from 'nanoid'
import NotesList from './components/notesList'
import Header from './components/header';
import Pagination from './components/pagination';

export default function App(){

  const [notes,setNotes] = useState([
    {
      id : nanoid(),
      title : "Introduction",
      text : 'Hello I am here ',
      date: '12/02/23'
    },
  ]);

  //pagination States
  const [searchtext,setSearchtext] = React.useState(); 
  const [currentPage, setCurrentpage] = React.useState(1);
  const [notesPerPage] = React.useState(5);

  
  //finding First and Last Index of a note on a page
  const indexOfLastNote = currentPage*notesPerPage;
  const indexOfFirstNote = indexOfLastNote - notesPerPage;
  const currentNotes = notes.slice(indexOfFirstNote,indexOfLastNote);

  const paginate =(pageNumber)=> setCurrentpage(pageNumber)

  React.useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem('react-notes-app-data'))
    if(savedNotes){
      setNotes(savedNotes);
    }
    
  }, [])
  

  React.useEffect(() => {
    localStorage.setItem('react-notes-app-data',JSON.stringify(notes))
  }, [notes])
  
  function handleSave(noteData){
    const date = new Date();
    
    const newNote = {
      id: nanoid(),
      title : noteData.title,
      text : noteData.text,
      date : date.toLocaleDateString()
    }

    const newNotes = [newNote,...notes];
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
    <Header setSearchtext={setSearchtext}/>
    
    <NotesList 
            notes = {searchtext?notes.filter((note)=>note.title.toLowerCase().includes(searchtext)):currentNotes} 
            handleSave = {handleSave} 
            deleteNote = {deleteNote}/>
    </div>
    <Pagination notesPerPage={notesPerPage} totalNotes= {notes.length} paginate = {paginate } />
  </div>
}