import React, { useEffect, useState } from "react";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { 
    Paper,
    TextareaAutosize,
    Button
} from "@mui/material"


const client = new W3CWebSocket("ws://127.0.0.1:8000/chat/2929");

const Chat = () => {

    const [msgList, setMsgList] = useState([]);
    const [msg, setMsg] = useState("");


    useEffect(() => {
        client.onerror = function() {
            console.log('Connection Error');
        };
        
        client.onopen = function() {
            console.log('WebSocket Client Connected');
        };
        client.onmessage = function(e) {
            if (typeof e.data === 'string') {
                let data = JSON.parse(e.data)
                console.log(data)
                setMsgList(prev => [...prev, data["message"]])
            }
        };
    }, [client])
    
    // client.onclose = function() {
    //     console.log('echo-protocol Client Closed');
    // };
    

    const handleClick = e => {
        client.send(JSON.stringify({"message": msg}))
        setMsg("")
    }

    const handleChange = e => {
        const { value } = e.currentTarget;
        setMsg(value)
    }
    return (
        <div style={{maxWidth: "50vw", margin: "0 auto"}}>
            <Paper variant="outlined">
                {msgList.map((m, i) => {
                    return (
                        <p key={i} style={{marginBottom: "1em"}}>{m}</p>
                    )
                })}
            </Paper>
            <TextareaAutosize value={msg} onChange={handleChange}/>
            <Button onClick={handleClick}>Send</Button>
        </div>
    )
}


export default Chat;