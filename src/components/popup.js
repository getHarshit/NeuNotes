import React from "react";
import { AiFillCloseSquare } from "react-icons/ai";

export default function Modal({modal,setModal,note,handleSave,deleteNote}) {
  
  const noteData = note[0];
  const toggleModal = () => {
    setModal(!modal);
  };

  if(modal) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }

  const [noteText,setNoteText] = React.useState({
    id:noteData.id,
    title : noteData.title,
    text : noteData.text,
    pinned:noteData.pinned
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
      console.log(noteText)
        handleSave(noteText);
        toggleModal();

    }
    
}


  return (
    <>
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
            <div className="modal-content">
            <div className="popup">
              <div className="editHeader">
              <textarea rows="1"
                      cols ="40"
                      name = "title"
                      value = {noteText.title}
                      placeholder = "Add New Note"
                      onChange={handleChange}
                      className ="textarea title"
                      ></textarea>
                      <hr className="line"/>
              </div>
                
            <textarea 
                rows="15" 
                cols="10" 
                value={noteText.text}
                name = "text"
                placeholder="Add Description" 
                onChange = {handleChange}
                className ="editDescription"
            ></textarea>
            <div className="notes-footer">
                <small className="limit">{characterLimit-noteText.text.length - noteText.title.length} Remaining</small>
                <button type="button" className="save" onClick={onClickSave}>Save</button>
            </div>
        </div>
                <button className="close-modal" top= "14px" onClick={toggleModal}>
                <AiFillCloseSquare className="closeIcon"/>
                </button>
          </div>
        </div>
      
      </>
  );
}