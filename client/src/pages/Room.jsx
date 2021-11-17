import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import {Link} from "react-router-dom"
import ScrollToBottom from "react-scroll-to-bottom"
import axios from "axios"
import Message from '../components/Message'


export default function Room({room, setInChat, socket}) {
    const [message, setMessage] = useState([])
    const [currentMessage, setCurrentMessage] = useState("")
    const {user} = useContext(AuthContext);

    useEffect(() => {
        const getMessages = async()=>{
            try{
                const res = await axios.get("/message/"+room._id);
                setMessage(res.data);
            }catch (err){
             console.log(err);   
            }
        };
        getMessages();
    }, [room]);



    const handleSubmit = async (e) =>{
        e.preventDefault()
        const newCurrentMessage = {
            roomId: room._id,
            roomName: room.name,
            sender: user.username,
            text:currentMessage,
        };
        try{
            socket.emit("send_message", newCurrentMessage);
            const res= await axios.post("/message", newCurrentMessage);
            await setMessage((message) => [...message, newCurrentMessage])
        }catch(err){
            console.log(err);
        }
    }


    const handleDeleteMsg = async(e) =>{
        const roomId = room._id;
        const sender = user.username;
 /*       const modifyMessageList = (c) =>{
            if (c.sender !== sender && c.roomId === roomId){
                setMessage((message) => [...message, c]);
            }

        }
        */
        try{
            const res = await axios.delete("/message/delmsg/"+roomId+"/"+sender);
        }catch(err){
            console.log(err);
        }
    }

    useEffect(() => {
        socket.on("receive_message", (data) => {
          setMessage((message) => [...message, data]);
        });
      }, [socket]);


    return (
        <div>
            <h1>{room.name}</h1>
            <ScrollToBottom>
                <div>
                        {message.map((c)=>(
                            <Message message={c.text} sender={c.sender}/>
                        ))}
                    <div className="chatFooter">
                        <input  type="text" placeholder="Hey..." onChange={(e)=>setCurrentMessage(e.target.value)}></input>
                        <button onClick={handleSubmit}>Send</button>
                    </div>
            
                    <div>

                        <button onClick={() => setInChat(false)} >Back to Main</button>
                        <button onClick={handleDeleteMsg}>Delete my Msg</button>

                    </div>
                </div>
            </ScrollToBottom>
        </div>
    )
}
