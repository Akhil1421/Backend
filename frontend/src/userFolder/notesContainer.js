import axios from "axios";
import React, { useEffect, useState } from "react";
import {GrAdd} from "react-icons/gr"
import { BiTrash } from "react-icons/bi";
import "./notes.css"
import {IoMdArrowBack} from "react-icons/io"
import { useRef } from "react";


const NotesContainer = ()=>{
    // let [showCaseNotes,setShowCaseNotes] = useState([])
    let [notesArray, setNotesArray] = useState([])
    let [showFull, setShowFull] = useState(false)
    let [single, setSingle] = useState([])
    let inputTitleRef = useRef(null)
    let inputBodyRef = useRef(null)

    let showFullNote = (e)=>{
        let index = Number(e.target.id.substr(4));
        console.log(index)
        console.log(notesArray)
        setShowFull(true)
        setSingle(notesArray[index])
    }
    let showCaseNotes = (notesArray.map((note, index)=>{            
        return(
            <div className="noteBlock" key={index} id={`note${index}`} onClick={showFullNote}>
                    <h3>{note.title}</h3>
                    </div>
                )
            }
        )
    )
    console.log(single)
    let getNotes = async()=>{
        let response = await axios.get("/auth/notes",{
        headers : {
            Authorization : 'Bearer ' + localStorage.token
        }
    })
        console.log(response.data)
        let x = [...response.data.notes]
        setNotesArray(x);
    }
    useEffect(()=>{
        getNotes();
    }, [showFull])
    let [showWarning, setShowWarning] = useState(false)
    const timerId = useRef(null);
    useEffect(() => {
        if (showWarning) {
  
            //Creating a timeout
            timerId.current = setTimeout(() => {
                setShowWarning(false);
            }, 5000);
        }
  
        return () => {
            //Clearing a timeout
            clearTimeout(timerId.current);
        };
    }, [showWarning]);
    let postNewNote = async()=>{
        try {
            if(inputBodyRef.current.value){
                let response = await axios.post("/auth/notes", {
                    title : inputTitleRef.current.value,
                    note : inputBodyRef.current.value
                }, {headers : {
                    Authorization : 'Bearer ' + localStorage.token
                }
            })            
                getNotes()
                setShowNew(true)
            }
            else {
                setShowWarning(true)
                //alert("Empty Note not allowed")
            }
        } catch (error) {
            alert("Something went wrong!!!")
        }
    }
    let deleteNote = async()=>{
        let response = await axios.post("/auth/notes/delete",{id : single._id},{headers : {
            Authorization : 'Bearer ' + localStorage.token
        }
    })
        console.log(response)
        setShowFull(false)
        //setNotesArray(response)
    }
    let [color, setColor] = useState("white")
    let [showNew , setShowNew] = useState(true)
    return(
        <>
        {!showFull &&    <div className="notesShow">
                <div className="addBlock" style={{background : color}}>
                { showNew && <div onClick={()=>{setShowNew(false); setColor("coral")}}><GrAdd style={{cursor : "pointer"}}/> </div>}
                { !showNew &&   
                    <div className="new-note">
                        <input type = 'text' placeholder="Title...." ref={inputTitleRef} style={{backgroundColor : "white", color : "black",
                        borderRadius : "0.25rem"}}></input>
                        <textarea placeholder="Content...." ref={inputBodyRef} 
                        style={{color :"black", background : "white", borderRadius : "0.25rem"}}
                        className="note-content-textarea"></textarea>
                        {showWarning && <div style = {{color : "red"}}>Note Can't be empty</div>
                        }
                        <div style={{display : "flex", justifyContent : "space-between"}} className="bw">           
                        <button onClick={postNewNote} style={{cursor : "pointer"}}>Save</button>
                        <button onClick = {()=>{setShowNew(true);setColor("white")}}>Cancel</button>
                        </div>
                    </div>
                }
                </div>
                {showCaseNotes}
            </div>}
            {
                showFull && <div style={{display : "grid", placeContent :"center", minHeight : "320px"}}>
                    <div className="single-note">
                        <div  style={{border : "solid black", borderRadius : "0.25rem", marginLeft:"1rem", marginRight : "1rem",
                                    background : "rgb(84, 0, 53)", color : "white"}}>
                        <div className="title" style={{marginTop : "1rem", fontFamily : "'Cedarville Cursive', cursive", gap : "0.05rem"}}>
                            {<h2>{single.title}</h2>}
                        </div>
                        <div className="content" style={{marginBottom : "0.5rem", fontFamily : "'Lora' serif"}}>
                            <span>{single.note}</span>
                        </div>
                        </div>
                        <div className="options">
                            <button onClick={()=>{setShowFull(false);}}><IoMdArrowBack/></button>
                            <button onClick={deleteNote}><BiTrash/></button>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default NotesContainer