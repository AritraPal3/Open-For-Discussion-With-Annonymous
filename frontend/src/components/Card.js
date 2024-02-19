import React, { useState } from 'react';
import axios from 'axios';

async function sendReq(username) {
    try {
        await axios.post("http://localhost:8000/chat", {
            name:username
        }, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        console.log("Sent Successfully");
    } catch (err) {
        console.error(err);
    }
}

function Card() {
    const [username, setUsername] = useState("");

    function modify(event) {
        setUsername(event.target.value); 
    }

    function handleSubmit() {
        if(username!=="")
            sendReq(username);
        setUsername("");
    }

    return (
        <>
            <div>
                <h1>WHO ARE YOU</h1>
            </div>
            <div>
                
                <input type='text' name='name' placeholder='Enter your name' required onChange={modify}></input>
            </div>
            
            <button type='submit' onClick={handleSubmit}>Submit</button>
        </>
    );
}

export default Card;
