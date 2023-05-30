import React, {useEffect, useState} from "react"
import quotes from "./quotes"

const MainContainer = ()=>{
    let [time, setTime] = useState(new Date())
    useEffect(()=>{
        setInterval(()=>setTime(new Date()), 1000)
    }, [])
    let quote = 'Start your day with planning out what you want to achieve today !!!'
    const decideQuote = ()=>{
        if(time.getHours()>=4 && time.getHours()<12){
            quote = quotes[0].quote
        }
        if(time.getHours()>=12 && time.getHours()<16){
            quote = quotes[1].quote
        }
        if(time.getHours()>=16 && time.getHours()<20){
            quote = quotes[2].quote
        }
        if(time.getHours()>=20 || time.getHours()<4){
            quote = quotes[3].quote
        }
    }
    decideQuote()
    return(
            <div className="main-container">
                <center>
                <div style={{fontFamily : "'Cedarville Cursive', cursive"}}>
                    <h1>Welcome ! ! !</h1>
                </div>
                    <h2>Its {`${time.getHours()} : ${time.getMinutes()}`}</h2>
                    <div style={{display : "flex", justifyContent : "center"}} className="quote"><h4>{quote}</h4></div>
                </center>
            </div>
    )
}

export {MainContainer}