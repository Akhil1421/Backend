import React, { useEffect, useState } from "react";
import axios from "axios"
import { useNavigate } from "react-router-dom";
import "./userFolder.css"
import SideBar from "./sidebar.js"
import "./sidebar.css"
import {MainContainer} from "./mainHome";

const Dashboard = ()=>{
    let navigate = useNavigate()
    const getAuth = async()=>{
        try{
            let response = await axios.get('/auth/tasks', {
                headers : {
                    Authorization : 'Bearer ' + localStorage.token
                }
            })
        }
        catch(err){
            navigate('/login')
        }
    }
    useEffect(()=>{
        getAuth()
    }, [])
    
    return(
            <div className="sideBar">
                <SideBar/>
                <MainContainer/>
            </div>
    )
}
export default Dashboard