import React from "react";



export default function AddNote(props){

    const [noteText,setNoteText] = React.useState('');
    const characterLimit = 200;

    function handleChange(event){
        if(characterLimit - event.target.value.length >=0){
            setNoteText(event.target.value);
        }
        else{
            alert("text Limit Exceeded")
        }
        
    }

    function onClickSave(){
        if(noteText.trim().length > 0){
            props.handleSave(noteText);
            setNoteText('');
        }
        
    }
    return(
        <div className="note new">
            <textarea 
                rows="9" 
                cols="10" 
                value={noteText}
                placeholder="Type to add new note" 
                onChange = {handleChange}
            ></textarea>
            <div className="notes-footer">
                <small>{characterLimit-noteText.length} Remaining</small>
                <button type="button" className="save" onClick={onClickSave}>Save</button>
            </div>
        </div>
    )
}