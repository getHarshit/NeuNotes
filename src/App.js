import React, { useState } from 'react'
import {nanoid} from 'nanoid'
import NotesList from './components/notesList'
import Header from './components/header';
import Pagination from './components/pagination';
import SideBar from './components/sideBar';

export default function App(){

  const [notes,setNotes] = useState([
    {
      id : nanoid(),
      title : "Introduction", 
      text : 'Hello I am here ',
      date: '12/02/23',
      pinned : false
    },
  ]);

  //pagination States
  const [searchtext,setSearchtext] = React.useState(); 
  const [currentPage, setCurrentpage] = React.useState(1);
  const [notesPerPage] = React.useState(5);
  const [pinnedNotesCount, setPinnedNotesCount] = React.useState(0)

   
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
      pinned : false,
      date : date.toLocaleDateString()
    }

    const newNotes = [newNote,...notes];
    setNotes(newNotes);
  }

  function deleteNote(id){
    const newNotes = notes.filter(note=>note.id !== id);
    setNotes(newNotes);
  }

  
  function pinNote(id){
    
    if(pinnedNotesCount < 6){
      
      setNotes(notes.map(oldnote =>{
        if(oldnote.id === id && oldnote.pinned === true){
          setPinnedNotesCount(oldcount=>oldcount-1);
        }
        else if(oldnote.id === id && oldnote.pinned === false){
          setPinnedNotesCount(oldcount=>oldcount+1);
        }
        return oldnote.id === id?{
          ...oldnote,
          pinned: !oldnote.pinned,
        }:oldnote;
      }))
    }
    else{
      alert("You cannot Pin More than 6 Notes");
    }
    
  }

  function RemoveNote(id){
    
    
      setNotes(notes.map(oldnote =>{
        
        return oldnote.id === id?{
          ...oldnote,
          pinned: !oldnote.pinned,
        }:oldnote;
      }))
      setPinnedNotesCount(oldcount=>oldcount-1); 
  }
  
  return <div className='container'>
    
    <div className='noteArea'>
    <Header setSearchtext={setSearchtext}/>
    
    <NotesList 
            notes = {searchtext?notes.filter((note)=>note.title.toLowerCase().includes(searchtext)):currentNotes} 
            handleSave = {handleSave} 
            deleteNote = {deleteNote}
            pinNote = {pinNote}
            />
          <Pagination notesPerPage={notesPerPage} totalNotes= {notes.length} paginate = {paginate } />
    </div>
    <SideBar notes = {notes.filter(note => note.pinned ===true)} removeNote = {RemoveNote} pinnedNotesCount ={pinnedNotesCount}/>
  </div>
}