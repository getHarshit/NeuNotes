import React from "react";

export default function Modal({modal,setModal,note,handleSave}) {
  
    console.log(note);

  const toggleModal = () => {
    setModal(!modal);
  };

  if(modal) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }

  const [noteText,setNoteText] = React.useState({
    title : note[0].title,
    text : note[0].text,
});
console.log(noteText)
const characterLimit = 300;

function handleChange(event){
    const value = event.target.value;
    const count = noteText.title.length +noteText.text.length ;
    console.log(value)
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
    console.log(noteText.title);
    if(noteText.title.length > 0){
        handleSave(noteText);
        setNoteText({
            title: '',
            text: '',
        });
    }
    
}


  return (
    <>
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
            <div className="modal-content">
            <div className="popup">
            <textarea rows="1"
                      cols ="10"
                      name = "title"
                      value = {noteText.title}
                      placeholder = "Add New Note"
                      onChange={handleChange}
                      className ="textarea title"
                      ></textarea>
            <textarea 
                rows="9" 
                cols="10" 
                value={noteText.text}
                name = "text"
                placeholder="Add Description" 
                onChange = {handleChange}
                className ="textarea description"
            ></textarea>
        </div>
                <button className="close-modal" onClick={toggleModal}>
                CLOSE
                </button>
          </div>
        </div>
      
      </>
  );
}