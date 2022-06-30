import React from "react";
import { MdDeleteForever,MdOutlinePushPin } from "react-icons/md";
export default function Notes(prop){
    return (
        <div className="note" >
            <div className="pinHeader">
            <h2 className="notetitle" onClick={()=>prop.editNote(prop.id)}>{prop.title}</h2>
            <MdOutlinePushPin className="pinIcon" onClick={()=>prop.pinNote(prop.id)}/>
            </div>
            <hr></hr>
            <div className="description" onClick={()=>prop.editNote(prop.id)}>{prop.text}</div>
            <div className="notes-footer">
                <small>{prop.date}</small>
                <MdDeleteForever className="delete-icon" size = '1.3em' onClick={() =>{prop.deleteNote(prop.id)}}/>
            </div>
        </div>
    )
}