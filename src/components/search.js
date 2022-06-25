import React from 'react'
import {} from 'react-icons'
import { MdSearch } from 'react-icons/md'
export default function Search({handleSearch}){


    return (
        <div className='search'>
            <MdSearch className='searchIcon' size="1.3em"/>
            <input onChange = {(event)=>{handleSearch(event.target.value)}} 
                type="text" 
                className = "searchBar" 
                name="searchBar"
                placeholder='Type to Search'/>
        </div>
    )
}