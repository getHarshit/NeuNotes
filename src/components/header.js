import React from "react";
import Search from "./search";

export default function header({setSearchtext}){
    return (
        <div className="header">
            <h1>NeuNotes</h1>
            <Search handleSearch ={setSearchtext}/>
        </div>
    )
}