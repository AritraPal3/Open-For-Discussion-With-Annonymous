import React, { useState } from 'react';
import axios from 'axios';

const url = process.env.REACT_APP_BASE_URL;

async function sendReq(username) {
    try {
        await axios.post(url, {
            name: username
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
        event.preventDefault();
        setUsername(event.target.value);
    }

    async function handleSubmit() {
        if (username !== "")
            sendReq(username);
        setUsername("");
    }

    return (
        <>
            <div>
                <h1>WHO ARE YOU</h1>
            </div>
            <div>
                <input type='text' value={username} name='name' placeholder='Enter your name' required onChange={modify}></input>
            </div>

            <button type='submit' onClick={handleSubmit}>Submit</button>
        </>
    );
}

export default Card;
