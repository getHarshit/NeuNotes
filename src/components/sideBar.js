import React from 'react'
import { MdPushPin } from 'react-icons/md'


export default function sideBar({notes,removeNote,pinnedNotesCount}) {

    const pinnedNotes = notes.map(note=>{
        return <div className='card' key={note.id}>
            
        <div className='pinHeader'>
            <span className='pintitle'>{note.title}</span>
            <MdPushPin className='pinnedIcon' cursor= "pointer" onClick={()=>removeNote(note.id)}/>
        </div>
        <span className='tagline'>{note.text.slice(0,20)}......</span>
    </div>
    })

  return (
    <div className='sideBar'>
        <h2 className='sidebar-heading'>Pinned Notes</h2>
        {pinnedNotesCount !== 0 ?pinnedNotes: <h4 >No Pinned Notes</h4>}

    </div>
  )
}
