import React, { useState } from 'react'
import {nanoid} from 'nanoid'
import NotesList from './components/notesList'
import Header from './components/header';
import Pagination from './components/pagination';
import SideBar from './components/sideBar';
import Toasts from './components/toasts';
import Popup from './components/popup'
export default function App(){

  const [notes,setNotes] = useState([
    {
      id : nanoid(),
      title : "Introduction", 
      text : 'Hello There this Is Notes App ',
      date: '12/02/23',
      pinned : true,
    },
    {
      id : nanoid(),
      title : "Introduction", 
      text : 'This App uses NeuBrutalism CSS Theme ',
      date: '12/02/23',
      pinned : false,
    },
    {
      id : nanoid(),
      title : "Pin Notes", 
      text : 'You can Pin Notes By clicking On them ',
      date: '12/02/23',
      pinned : false,
    },
    {
      id : nanoid(),
      title : "Saving and Editing Notes ", 
      text : 'you can editing Notes by clicking Them and Then press save',
      date: '12/02/23',
      pinned : false,
    }
    
  ]);

  //pagination States
  const [searchtext,setSearchtext] = React.useState(); 
  const [currentPage, setCurrentpage] = React.useState(1);
  const notesPerPage = 5;
  const [pinnedNotesCount, setPinnedNotesCount] = React.useState(1)

  //modal State
  const [modal, setModal] = useState(false);
  const [editableNote,seteditablenote] = useState({})

  //finding First and Last Index of a note on a page
  const indexOfLastNote = currentPage*notesPerPage;
  const indexOfFirstNote = indexOfLastNote - notesPerPage;
  const currentNotes = notes.slice(indexOfFirstNote,indexOfLastNote);

  const paginate =(pageNumber)=> setCurrentpage(pageNumber)

  React.useEffect(() => {

    console.log(notes,pinnedNotesCount)
    localStorage.setItem('react-notes-app-data',JSON.stringify({notes,pinnedNotesCount}))
    
  }, [notes,pinnedNotesCount])

 React.useEffect(() => {

    if(localStorage.getItem('react-notes-app-data') != null){
      const savedNotes = JSON.parse(localStorage.getItem('react-notes-app-data'))
      if(savedNotes[0]){
        setNotes(savedNotes[0]);
      }
      if(savedNotes[1]){
        setPinnedNotesCount(savedNotes[1]);
      }
    }
    
  }, [])
  


  
  function handleSave(noteData){
    const date = new Date();
      const newNote = {
        id: nanoid(),
        title : noteData.title,
        text : noteData.text,
        pinned : noteData.pinned,
        date : date.toLocaleDateString()
        
      }
      const newNotes = [newNote,...notes];
    
      if(noteData.id){
        clearDup(noteData.id,newNotes)
      }
      else{
        setNotes(newNotes);
      }
      
  }

  function editNote(id){
    seteditablenote(notes.filter(note => note.id === id));
    setModal(true);
  }

  function clearDup(id,obj){
    
    const newNotes = obj.filter(note=>note.id !== id);
    setNotes(newNotes);
  }

  function deleteNote(id){
    console.log(notes.filter(note=>note.id !== id))
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
      alert("You cannot Pin More than 6  Notes");
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
    {modal && <Popup modal = {modal} setModal = {setModal} note = {editableNote} handleSave = {handleSave} deleteNote ={deleteNote} />}
    <div className='noteArea'>
    <Header setSearchtext={setSearchtext}/>
    
    <NotesList 
            notes = {searchtext?notes.filter((note)=>note.title.toLowerCase().includes(searchtext)):currentNotes} 
            handleSave = {handleSave} 
            deleteNote = {deleteNote}
            pinNote = {pinNote}
            editNote = {editNote}
            currentPage = {currentPage}
            />
          <Pagination notesPerPage={notesPerPage} totalNotes= {notes.length} paginate = {paginate } />
    </div>
    <SideBar notes = {notes.filter(note => note.pinned ===true)} removeNote = {RemoveNote} pinnedNotesCount ={pinnedNotesCount} editNote={editNote}/>
  </div>
}