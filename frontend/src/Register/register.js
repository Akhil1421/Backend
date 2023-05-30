import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./register.css"
import axios from "axios"
import { useNavigate } from "react-router-dom";

const Register = ()=>{
    let [inputValues, setInputValues] = useState({
        name : "",
        email : "",
        password : "",
        repeatedPassword : ""
    })
    let navigate = useNavigate()
    const handleClick = async()=>{
        try {
            let response = await axios.post('/register', inputValues)
            localStorage.setItem("token", response.data.token)
            // console.log(response)            
            navigate('/')
        } catch (error) {
            console.log(error)
            if(error.code==='ERR_BAD_REQUEST'){
                alert("Incomplete information")
            }
            else{
                alert("Email Already exists")
            }
        }
    }
    const handleChange = (e)=>{
        let entry = e.target.name
        setInputValues({...inputValues, [entry]: e.target.value})
        // console.log(inputValues)
    }
    return(
        <div className="outer-container">
            <div className="inner-container">
            <div style={{display: "flex", justifyContent: "center", alignContent: "center"}}>
                <h1>CREATE ACCOUNT</h1>
            </div>
                <div className="form">
                    <input type="text" name="name" placeholder="John Doe" onChange={handleChange}></input>
                    <input type="email" name="email" placeholder="Your email" onChange={handleChange}></input>
                    <input type="password" name="password" placeholder="Password" onChange={handleChange}></input>
                    <input type="password" name="repeat" placeholder="Repeat your password" onChange={handleChange}></input>
                    <input type="button" name="submitButton" value="SIGN UP" className="btn" onClick={handleClick}></input>
                </div>
                <div style={{display: "flex", justifyContent: "center", alignContent: "center"}}>
                    <p className="message">Already have an account ? <Link to="/login"><b>Login here</b></Link></p>
                </div>
            </div>
        </div>
    )
}

export default Register