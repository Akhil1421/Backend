import React from "react";
import TopBar from "./topBarNotes";
import NotesContainer from "./notesContainer";
const Notes = ()=>{
    return(
        <div className="Notes-Container other">
            <TopBar/>
            <NotesContainer/>
        </div>
    )
}

export default Notes