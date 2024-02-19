import React, { useState } from 'react';
import axios from 'axios';

async function sendReq(username) {
    try {
        axios.post("http://localhost:8000/chat", {
            body:{
                name: username,
            }
        }, {
            headers: {
                "Content-Type": "x-www-form-urlencoded",
            },
        });
        console.log("Sent Successfully");
    } catch (err) {
        console.error(err);
    }
}

function Card() {
    const [username, setUsername] = useState(""); // Initialize with an empty string

    function modify(event) {
        setUsername(event.target.value); // Update the username state with input value
    }

    function handleSubmit() {
        sendReq(username); // Pass the username to sendReq function
    }

    return (
        <>
            <div>
                <h1>WHO ARE YOU</h1>
            </div>
            <div>
                {/* Pass reference to modify function */}
                <input type='text' name='name' placeholder='Enter your name' required onChange={modify}></input>
            </div>
            {/* Pass handleSubmit function to onClick */}
            <button type='submit' onClick={handleSubmit}>Submit</button>
        </>
    );
}

export default Card;
