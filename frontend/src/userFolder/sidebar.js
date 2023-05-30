import React, { useReducer, useState, useEffect } from "react"
import "./sidebar.css"
import {BiLogOut} from "react-icons/bi"
import {GoChecklist} from "react-icons/go"
import {AiOutlineFileText} from "react-icons/ai"
import { useNavigate } from "react-router-dom"

const SideBar = ()=>{
    let navigate = useNavigate()
    let initial = {
        showLogOut : false ,
        showList : false ,
        showNotes : false
    }
    const reducer = (state, action)=>{
        if(action.type === "OnLogOut"){
            return {...state , showLogOut : true}
        }
        if(action.type === "OffLogOut"){
            return {...state , showLogOut :false}
        }
        if(action.type === "OnToDo"){
            return {...state , showList : true}
        }
        if(action.type === "OffToDo"){
            return {...state , showList : false}
        }
        if(action.type === "moveToList"){
            navigate("/List")
            return {initial}
        }
        if(action.type==="OnNotes"){
            return {...state, showNotes : true}
        }
        if(action.type==="OffNotes"){
            return {...state, showNotes : false}
        }
        if(action.type === "moveToNotes"){
            navigate("/notes")
            return {initial}
        }
        if(action.type==="logOut"){
            localStorage.removeItem("token")
            navigate("/login")
            return {...state}
        }
        if(action.type==="clear"){
            return {showList:false, showLogOut: false}
        }
    }
    const [state, dispatch] = useReducer(reducer, initial)
    return(
        // <div className="sideBar" style={{backgroundImage : `url(${bgImage})`}}>
            <div className="heading">
                <div className="opts" onMouseOut={()=>{dispatch({type : "clear"})}}>
                    <div className="logo">
                        <div className="center">
                            {!state.showList  &&    <GoChecklist 
                            onMouseOver={()=>{dispatch({type : "OnToDo"})}} 
                            color="white"/>} 
                        
                            <div className="text" 
                            onMouseOut={()=>{dispatch({type : "OffToDo"})}} 
                            onClick={()=>dispatch({type : "moveToList"})}>  
                                {state.showList && "Todo List"} 
                            </div>  
                        </div>    
                    </div>
                    <div className="logo">
                        <div className="center">
                            {!state.showNotes && <AiOutlineFileText color="white" style={{color : "white"}}
                            onMouseOver={()=>{dispatch({type: "OnNotes"})}} 
                            /> }
                        
                            <div className="text" onMouseOut={()=>{dispatch({type : "OffNotes"})}}
                             onClick={()=>dispatch({type : "moveToNotes"})}>  
                                {state.showNotes && "Notes"} 
                            </div> 
                        </div>
                    </div>    
                    <div className="logo">
                        <div className="center">
                            {!state.showLogOut && <BiLogOut color="white"
                            onMouseOver={()=>{dispatch({type: "OnLogOut"})}} 
                            onClick={()=>{dispatch({type : "logOut"})}}
                            /> }
                        
                            <div className="text" 
                            onMouseOut={()=>{dispatch({type : "OffLogOut"})}}
                            onClick={()=>{dispatch({type : "logOut"})}}>  
                                {state.showLogOut && "Log Out"} 
                            </div> 
                        </div>
                    </div>  
                </div>
            </div>
        // </div>
    )
}

export default SideBar