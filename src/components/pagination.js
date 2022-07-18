import React from 'react'

export default function pagination({notesPerPage,totalNotes, paginate}) {
    const pageNumber = [];
    for(let i =1;i<= Math.ceil(totalNotes/notesPerPage);i++){
        pageNumber.push(i);
    }

    
  return (
    <nav className='naviga'>
        <ul className='pagination'>
            {
            pageNumber.map(number =>{
               return  <li key={number} className="pageItem">
                    <a href='#' onClick={()=>paginate(number)} className='pageLink'>
                        {number}
                    </a>
               </li> 
            })}
        </ul>
    </nav>
  )
}
