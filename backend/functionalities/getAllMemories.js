const {user} = require("../register&verifyUser/modelUser")

const getAllTasks = async(req,res)=>{
    const {id} = req.user
    try {
        let currUser = await user.findOne({_id : id}) 
        //console.log(currUser)  
        let {memories} = currUser
        return res.status(200).json(memories)
    } catch (error) {
        return res.status(500).json({"msg" : error.message})
    }
}

const postNewTask = async(req,res)=>{
    const {id} = req.user
    // console.log(id)
    // console.log(req.user)
    try {
        let currUser = await user.findOne({_id : id})  
        console.log(req.body)
        let {task:newTask} = req.body
        if(newTask){
            let {memories} = currUser
            let date = new Date().getDate()
            let time = `${new Date().getHours()}:${new Date().getMinutes()}`
            let full = {task : newTask, createdAt : `${date}-${new Date().getMonth() + 1}-${new Date().getFullYear()}-${time}`, completed : false}
            memories.push(full)
            let pending = memories.filter((x)=>x.completed==false)
            let completed= memories.filter((x)=>x.completed===true)
            memories = [...pending, ...completed]
            const updatedMem = await user.findByIdAndUpdate({_id : id},{
                memories : memories
             },{new: true})
             res.status(201).json(updatedMem)
        }
        else{
            return res.status(400).json({"msg" : "Bad Request"})
        }
    }
    catch(error){
        return res.status(400).json({"msg" : "Bad request"})
    }
}

const deleteTask = async(req,res)=>{
    try {
        let {id} = req.user
        console.log(req.body)
        let index = req.body.index
        console.log(index)
        let currUser = await user.findOne({_id : id})
        let {memories} = currUser
        let newMemories = []
        //console.log(memories)
        if(index>=memories.length){
            return res.status(204).json({"msg" : "processed"})
        }
        for(let i=0;i<memories.length;i++){
            if(i!==index){
                newMemories.push(memories[i])
            }
            else{
                console.log(memories[i])
            }
        }
        const updatedMem = await user.findByIdAndUpdate({_id : id},{
            memories : newMemories
         },{new: true})
         //console.log(index)
         res.status(201).json(updatedMem)
    } catch (error) {
        res.status(500).json({msg : error.message})
    }
}

const taskCompleted = async(req,res)=>{
    const {id} = req.user
    console.log(req.body)
    const {index} = req.body
    console.log("index"+index)
    try {
        let currUser = await user.findOne({_id : id})
        let {memories} = currUser
        if(index>=memories.length){
            return res.status(204).json({"msg" : "Processed Successfully"})
        }
        let newList = [...memories]
        newList[index].completed = true;
        newList[index].updatedAt = `${new Date().getDate()}-${new Date().getMonth() + 1}-${new Date().getFullYear()}-${new Date().getHours()}:${new Date().getMinutes()}`
        let completed=[], pending = [];
        completed = newList.filter((x)=>x.completed===true)
        pending = newList.filter((x)=>x.completed===false)
        console.log(completed)
        for(let i=0;i<completed.length+pending.length;i++){
            if(i<pending.length)newList[i] = pending[i];
            else newList[i] = completed[i-pending.length]
            console.log(newList[i])
        }
        console.log(memories[index])
        const updatedMem = await user.findByIdAndUpdate({_id : id},{
            memories : newList
         },{new: true})   
         res.status(200).json({"msg" : "Done"})
    } catch (error) {
        return res.status(500).json({"msg" : error.message})
    }
}

const getNotes = async(req,res)=>{
    let {id} = req.user
    try {
        let {notes} = await user.findOne({_id : id})
        res.status(200).json({notes}) 
    } catch (error) {
        return res.status(500).json({err : error.message})
    }
}

const newNote = async(req,res)=>{
    let {id} = req.user
    let note = req.body
    console.log(note)
    try {
        let {notes} = await user.findOne({_id : id})
        if(!note){
            return res.status(400).json({err : "Bad Request"})
        }
        let final = [...notes]
        final.push(note)
        console.log(final[final.length-1])
        const newNotes = await user.findByIdAndUpdate({_id : id},{
            notes : [...notes, note]
         },{new: true})  
        res.status(201).json({"msg" : "Added Successfully"}) 
    } catch (error) {
        return res.status(500).json({err : error.message})
    }
}

const deleteNote = async(req,res)=>{
    let {id} = req.user
    let {id:noteId} = req.body
    console.log("noteId")
    console.log(req.body)
    try {
        let {notes} = await user.findOne({_id:id})
        let final = notes.filter((x)=>{
            return (x._id.toString() !== noteId)
        })
        const newNotes = await user.findByIdAndUpdate({_id : id},{
            notes : final
         },{new: true})  
        return res.status(201).json({"h" : final})
    } catch (error) {
        return res.status(500).json({err : error.message})
    }
}
module.exports = {getAllTasks, postNewTask, deleteTask, taskCompleted, getNotes, newNote, deleteNote}