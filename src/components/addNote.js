import React from "react";



export default function AddNote(props){

    const [noteText,setNoteText] = React.useState({
        
        title : '',
        text : '',
    });
    const characterLimit = 300;

    function handleChange(event){
        const value = event.target.value;
        const count = noteText.title.length +noteText.text.length ;
        
        if(characterLimit - count >=0){
            setNoteText({
                ...noteText,
                [event.target.name] : value,
            });
        }
        else{
            alert("text Limit Exceeded")
        }
        
    }

    function onClickSave(){
        
        if(noteText.title.length > 0){
            props.handleSave(noteText);
            setNoteText({
                
                title: '',
                text: '',
            });
        }
        
    }
    return(
        <div className="note new">
            <textarea rows="1"
                      cols ="10"
                      value={noteText.title}
                      name = "title"
                      placeholder = "Add New Note"
                      onChange={handleChange}
                      className ="title"
                      />
            <textarea 
                rows="9" 
                cols="10" 
                value={noteText.text}
                name = "text"
                placeholder="Add Description" 
                onChange = {handleChange}
            ></textarea>
            <div className="notes-footer">
                <small>{characterLimit-noteText.text.length - noteText.title.length} Remaining</small>
                <button type="button" className="save" onClick={onClickSave}>Save</button>
            </div>
        </div>
    )
}