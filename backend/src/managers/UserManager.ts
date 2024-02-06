import { Socket } from "socket.io";
import { RoomManager } from "./RoomManager";
export  interface User{
    socket: Socket,
    name: string,
    
}

export class UserManager {
    
    private users: User[];
    private queue: string[];
    private roomManager: RoomManager;
    constructor(){
this.users = [];
this.queue = [];
this.roomManager = new RoomManager();
    }

addUser(name: string , socket: Socket){
    console.log('inside add user')
this.users.push({
    name,
    socket
});
// push the new user to the queue
this.queue.push(socket.id);
console.log('queue',this.queue)
socket.send("lobby");

this.clearQueue();
this.initHandlers(socket);

}

removeUser(socketId: string){
    const user = this.users.find(x=>x.socket.id === socketId);
this.users = this.users.filter(x=> x.socket.id !== socketId);
this.queue = this.queue.filter(x=> x === socketId);
}

clearQueue(){
    console.log('inside clear queue', this.queue.length)
    if(this.queue.length<2){
        return;
    };
    const id1 = this.queue.pop();
    const id2 = this.queue.pop();  
    const user1 = this.users.find(x=>x.socket.id === id1);
    const user2 = this.users.find(x=>x.socket.id === id2);
  
if(!user1 || !user2) return;
//create room for 2 user
console.log('creating room');
    const room = this.roomManager.createRoom(user1,user2)
    
this.clearQueue();
 
}


initHandlers(socket: Socket){
    console.log('inside init handler')
socket.on("offer", ({sdp, roomId}: {sdp: string, roomId: string})=> {
    console.log('inside socket offer')
    this.roomManager.onOffer(roomId,sdp);
})
socket.on("answer", ({sdp, roomId}: {sdp: string, roomId: string})=> {
    console.log('inside socket answer');
    this.roomManager.onAnswer(roomId,sdp);
})

}



}