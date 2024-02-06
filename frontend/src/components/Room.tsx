import { useLocation } from "react-router-dom";
import { useEffect, useState} from "react";
import { Socket,io } from "socket.io-client";
// import  {Socket} from "socket.io"

// import { Socket, io } from "socket.io-client";

const URL = "http://localhost:3000";
const Room = ()=> {
    const location = useLocation();
const name = new URLSearchParams(location.search).get('name');
const [lobby, setLobby] = useState<boolean>(true);
const [socket, setSocket] = useState<null | Socket>(null);
// const [connected, setConnected] = useState<boolean>(false);


useEffect(()=> {
const socket = io(URL);
console.log('inside use Effect', socket)
  socket.on('send-offer',(roomId)=> {
    console.log('room id', roomId); 
    alert("send offer letter please");
    setLobby(false);
    // socket.emit("offer", {
    //     sdp: "",
    //     roomId,
    // })
  });
  socket.on("offer",({roomId, offer})=> {
    console.log('inside on offer')
      alert("send answer plz");
      setLobby(false)
socket.emit("answer", {
    sdp: "",
    roomId,
})
  });

  socket.on("answer",({roomId, answer})=> { 
    console.log('inside on answer')
      alert("connection done");
    setLobby(false); 
  });

  socket.on("lobby", ()=> {
setLobby(true);
  })
setSocket(socket);


},[name]);

if(lobby){
    return <div> waiting to connect you to someone!!!!</div>
}
    return (
        <div>
            hey {name}
            <video width={400}></video>
            <video width={400}></video>
        </div>
    )
}
export default Room;