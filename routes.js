const express = require("express")

const router = express.Router()

const {register} = require("./register&verifyUser/register")

const {login} = require("./register&verifyUser/login")

const {verifyToken} = require("./register&verifyUser/verifyToken")

const {getAllTasks, postNewTask, deleteTask, taskCompleted, getNotes, newNote, deleteNote} = require("./functionalities/getAllMemories");

router.route("/register").post(register)

router.route("/auth/login").post(login)
router.route("/auth/tasks").get(verifyToken, getAllTasks)
router.route("/add/newTask").post(verifyToken, postNewTask)
router.route("/tasks/delete").delete(verifyToken, deleteTask)
router.route("/tasks/completed").patch(verifyToken, taskCompleted)
router.route("/auth/notes").get(verifyToken, getNotes).post(verifyToken, newNote)
router.route("/auth/notes/delete").post(verifyToken, deleteNote)
module.exports = {router}

