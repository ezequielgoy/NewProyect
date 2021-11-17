
export default function RoomBox({room, setInChat, leaveRoom, deleteMsg, socket}) {

    const joinRoom = () => {
        socket?.emit("join_room", room)
        setInChat(true);
       }
    return (
        <div>
            <h3>{room}</h3>
            <button onClick={joinRoom}>Join Room</button>
        </div>
    )
}
