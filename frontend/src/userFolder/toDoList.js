import React, { useEffect, useState } from "react";
import "./toDo.css"
import {BiTrash } from "react-icons/bi";
import {MdCloudDone} from "react-icons/md"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import TopBar from "./topBarList";

const ToDoList = ()=>{
    let [tasks, setTasks] = useState([])
    let [completeTasks, setCompleted]  = useState([])
    let [newTask, setNewTask] = useState('')
    let [showCompleted, setShowCompleted] = useState(false)
    let navigate = useNavigate()
    let deleteTask = async(e)=>{
        let button = (e.target.closest('button'))
        let index ;
        if(button){
            index = Number(button.id.substr(2))
        }
        console.log(index)
        let response = await axios.delete("/tasks/delete", {
            headers : {
                Authorization : 'Bearer ' + localStorage.token
            }
            , data : {index : index}
        })
        console.log(response)
        getList();
    }
    let completedTask = async(e)=>{
        let button = (e.target.closest('button'))
        let index ;
        if(button){
            index = Number(button.id.substr(2))
        }
        console.log("Completed " + index);
        let response = await axios.patch("/tasks/completed", {index},{
            headers : {
                Authorization : 'Bearer ' + localStorage.token
            }
        })
        console.log(response)
        getList()
    }
    const getList = async()=>{
        try {
            let response = await axios.get("/auth/tasks", {
                headers : {
                    Authorization : 'Bearer ' + localStorage.token
                }
            })
            let pending = response.data.filter((x)=>x.completed===false)
            let completed = response.data.filter((x)=>x.completed===true)
            if(pending.length===0)setTasks([])
            else {
                    setTasks(pending.map((task, ind)=>{
                    return (
                            <div className="des" key={ind}>
                                <div className="taskDes" style={{display: "flex", justifyContent :"center"}}>{task.task}</div>
                                <div className="icons">
                                <div onClick={completedTask} style={{display: "grid", placeContent :"center"}}> 
                                    <button id={`c ${ind}`} style={{border : "none"}}>  
                                        <MdCloudDone style={{cursor : "pointer"}}/>
                                    </button>
                                </div>                            
                                <div onClick={deleteTask} style={{display: "grid", placeContent :"center"}}> 
                                    <button id={`t ${ind}`} style={{border : "none"}}><BiTrash style={{cursor : "pointer"}}/></button>
                                </div>
                                </div>
                            </div>
                    )
                }))
            }
            if(completed.length>0){
                setCompleted(completed.map((task, ind)=>{
                    let starting = task.createdAt
                    let sDate =  "", stime=""
                    let dashes=0;
                    for(let i=0;i<starting.length;i++){
                        if(starting[i]==='-')dashes++;
                        if(dashes<3){
                            sDate = sDate + starting[i]
                        }
                        else{
                            stime = starting.substr(i+1)
                            break;
                        }
                    }
                    dashes=0;
                    let compl = task.updatedAt
                    let date = "", time = ""
                    for(let i=0;i<compl.length;i++){
                        if(compl[i]==='-')dashes++;
                        if(dashes<3){
                            date = date + compl[i]
                        }
                        else if(dashes===3){
                            if(compl[i]!=='-')time = time + compl[i]
                        }
                    }
                    return(
                        <div className="des2" style={{borderRadius : "0.5rem"}}>
                            <div key={`l${ind}`}><b>Task : </b><span style={{color : "white"}}>{task.task}</span></div>
                            <div key={`0l${ind}`}><b>Started On : </b><span style={{color : "white"}}>{`${sDate}`}</span></div>
                                <div key={`0.l${ind}`}><b>Time of Starting : </b><span style={{color : "white"}}>{`${stime}`}</span></div>
                                <div key={`1l${ind}`}><b>Completed On : </b><span style={{color : "white"}}>{date}</span></div>
                                <div key={`2l${ind}`}><b>Time of Completion : </b><span style={{color : "white"}}>{time}</span></div>
                        </div>
                    )
                }))
            }
        } catch (error) {
            console.log(error)
            navigate("/")
        }
    }
    useEffect(()=>{
        getList()
        setShowCompleted(false)
    }, [])
    const handleChange = (e)=>{
        setNewTask(e.target.value)
    }
    const createNewTask = async()=>{
        if(newTask===''){
            return ;
        }
        let data = {task : newTask};
        let response = await axios.post("/add/newTask", {
            task : newTask 
            }, {
            headers : {
                Authorization : 'Bearer ' + localStorage.token
            }
        })
        getList();
    }

    return(
        <div className="Notes-Container">
            <TopBar showCompleted = {setShowCompleted} show={showCompleted}/>
            { !showCompleted && <div className="TaskZone">
                <div className="innerTaskZone">
                    <div className="taskInput">
                        <input type = "text" placeholder="e.g. Read a book" onChange={handleChange}
                         className="taskIn"/>
                        <input type = "button" className="sbtTask"value="Add" onClick={createNewTask}
                         style={{cursor : "pointer", border : "black"}}/>
                    </div>
                    <div className="tasks">
                        {tasks}
                    </div>
                </div>
            </div>}
            {
                showCompleted && 
                <div className="Comp"> 
                    <div style={{display : "grid", placeContent : "center"}}><h2 style={{color : "black"}}>Completed Tasks !!!</h2></div>
                    <div style={{display : "grid", placeContent : "center"}}>
                    <div className="compTasks" style={{display : "flex", flexWrap : "wrap", gap : "1rem", marginLeft : "1rem", flex : "25%"}}>
                        {completeTasks}
                    </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default ToDoList