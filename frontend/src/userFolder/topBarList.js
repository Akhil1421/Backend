import React from "react";
import { Link } from "react-router-dom";
import {ImHome} from "react-icons/im"
import { BiNote } from "react-icons/bi";
import {IoMdArrowBack} from "react-icons/io"
import {MdCloudDone} from "react-icons/md"

const TopBar = ({showCompleted, show})=>{
    let [color, setColor] = React.useState(["white", "white", "white"])
    return(
        <div className="topBar">
                <Link to="/">
                    <ImHome color = {color[0]} onMouseOver={()=>{setColor(["yellow",'white', "white"])}}  onMouseOut={()=>{setColor(["white","white", "white"])}}/>
                </Link>
                <span style={{color : "white"}}>To Do List</span>    
                <div className="internal">
                <Link to = "/notes">
                    <BiNote  color = {color[1]} 
                    onMouseOver={()=>{setColor(["white","yellow", "white"])}} onMouseOut={()=>{setColor(["white", "white","white"])}}></BiNote>     
                </Link>
                    {!show && <MdCloudDone style={{cursor : "pointer"}}color = {color[2]} onMouseOver={()=>{setColor(["white","white", "yellow"])}} 
                    onMouseOut={()=>{setColor(["white", "white","white"])}}
                    onClick={()=>showCompleted(true)}></MdCloudDone>}
                    {show && <IoMdArrowBack style={{cursor : "pointer"}}color = {color[2]} onMouseOver={()=>{setColor(["white","white", "yellow"])}} 
                    onMouseOut={()=>{setColor(["white", "white","white"])}}
                    onClick={()=>showCompleted(false)}></IoMdArrowBack>}
                </div>    
            </div>
    )
}

export default TopBar