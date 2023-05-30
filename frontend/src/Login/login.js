import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = ()=>{
    let [inputValues, setInputValues] = useState({
        email : "",
        password : ""
    })
    let navigate = useNavigate()
    const handleClick = async()=>{
        try {
            let response = await axios.post('/auth/login', inputValues)
            console.log(response)
            localStorage.setItem("token", response.data.token)
            console.log(localStorage.getItem("token"));
            navigate('/')
        } catch (error) {
            alert('Wrong inputs')
        }
    }
    const handleChange = (e)=>{
        let entry = e.target.name
        setInputValues({...inputValues, [entry] : e.target.value})
        console.log(inputValues)
    }
    return(
        <div className="outer-container">
            <div className="inner-container">
                <div style={{display: "flex", justifyContent: "center", alignContent: "center"}}>
                    <h1>SIGN IN</h1>
                </div>
                <div className="form second">
                    <input type="email" name="email" placeholder="Your email"  onChange={handleChange}></input>
                    <input type="password" name="password" placeholder="Password" onChange={handleChange}></input>
                    <input type="button" name="submitButton" value="LOG IN" className="btn" onClick={handleClick}></input>
                </div>
                <div style={{display: "flex", justifyContent: "center", alignContent: "center"}}>
                    <p className="message">Don't have an account ? <Link to="/registeration"><b>Register here</b></Link></p>
                </div>
            </div>
        </div>
    )
}

export default Login