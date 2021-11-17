import { useRef, useContext, useState, useEffect } from "react";
import RoomBox from "../components/RoomBox";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import Room from "./Room";
import {io} from "socket.io-client";


function Main() {
    const [inChat, setInChat] = useState(false);
    const [userRooms, setUserRooms] = useState([]);
    const [currentRoom, setCurrentRoom] = useState(null);
    const [socket,setSocket] = useState(null);
    const {user} = useContext(AuthContext);
    const roomName = useRef();
    const roomJoinName =useRef();


    useEffect(()=>{
        setSocket(io("ws://localhost:8900"))
    }, [])
    
    useEffect(()=>{
        const getUserRooms = async () =>{
            try{
                const res = await axios.get("/room/"+user._id)
                setUserRooms(res.data);    
            }catch(err){
                console.log(err);
            }
       
        };
        getUserRooms();
    }, [user])


    const handleCreateRoom = async (e)=>{
        e.preventDefault();
        const room = {
            name: roomName.current.value
        }
        try {
            await axios.post("/room/"+user._id+"/createroom", room);
            setUserRooms((rooms) => [...rooms, room]);
        } catch (err) {
            console.log(err);
        }
    }

    const handleJoinRoom = async (e)=>{
        e.preventDefault();
        const room = {
            name: roomJoinName.current.value
        }
        try {
            await axios.put("/user/"+user._id+"/join",room);
            const roomInfo = await axios.get("/room", room);
            console.log(roomInfo);
            setUserRooms((rooms) => [...rooms, roomInfo]);
        } catch (err) {
            console.log(err);
        }
    }


    const leaveRoom = () =>{

    }

    return (
        <div> 
            { !inChat ? 
            (<div>
                <h1>Welcome {user.username}</h1>
                <div className="createRoom">
                    <form onSubmit={handleCreateRoom}>
                        <input type="text" placeholder="room name" ref={roomName}/>
                        <button type="submit">Create Room</button>
                    </form>
                </div>
                <div>
                    <form onSubmit={handleJoinRoom}>
                        <input type="text" placeholder="room name" ref={roomJoinName}/>
                        <button type="submit">Join Room</button>
                    </form>
                </div>
            
                {userRooms.map((c) => (
                    <div onClick={() => setCurrentRoom(c)}>
                        <RoomBox room={c.name} setInChat={setInChat} leaveRoom={leaveRoom} socket={socket}/>
                    </div>
                ))}
            </div>)
            : (<Room room={currentRoom}setInChat={setInChat} socket={socket}/>)
            }
        </div>
    )
}

export default Main
