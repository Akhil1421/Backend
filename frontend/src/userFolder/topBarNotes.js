import React from "react";
import { BiLogOut } from "react-icons/bi";
import {GoChecklist} from "react-icons/go"
import { ImHome } from "react-icons/im";
import {Link} from "react-router-dom"

const TopBar = ()=>{
    let [color, setColor] = React.useState(["white", "white", "white"])
    return(
        <div className="topBar">
                <Link to="/">
                    <ImHome color = {color[0]} onMouseOver={()=>{setColor(["yellow",'white', 'white'])}}  onMouseOut={()=>{setColor(["white","white", 'white'])}}/>
                </Link>
                <span style={{color : "white"}}>Notes</span>    
                <div className="internal">
                <Link to = "/List">
                    <GoChecklist  color = {color[1]} style={{marginRight : "0.3rem"}}
                    onMouseOver={()=>{setColor(["white","yellow", "white"])}} onMouseOut={()=>{setColor(["white", "white", "white"])}}></GoChecklist>     
                </Link>
                <Link to = "/login">
                <BiLogOut color = {color[2]}
                    onClick={()=>{localStorage.removeItem("token")}}
                    onMouseOver={()=>{setColor(["white","white", "yellow"])}} onMouseOut={()=>{setColor(["white", "white", "white"])}}></BiLogOut>
                </Link>
                </div>    
            </div>
    )
}

export default TopBar