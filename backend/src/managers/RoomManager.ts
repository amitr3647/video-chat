import { User } from "./UserManager";

 export interface Room {
    user1: User,
    user2: User,
    
 }

let GLOBAL_ROOM_ID = 1;
export class RoomManager {
    private rooms: Map<string, Room>;
    constructor(){
        this.rooms =new Map<string, Room>();
    }

createRoom(user1: User,user2: User){
    console.log('insie create room')
const roomId   = this.generate().toString();
this.rooms.set(roomId.toString(), {
    user1,
    user2,
});

user1.socket.emit("send-offer", {
    roomId
})
} 


onOffer(roomId: string, sdp: string){
    console.log('inside onOffer function', roomId)
const user2 = this.rooms.get(roomId)?.user2;
user2?.socket.emit("offer",{
    sdp,
    roomId
})
}
onAnswer(roomId: string, sdp: string){
    console.log('inside on answer function ', roomId, sdp)
    const user1 = this.rooms.get(roomId)?.user1;
    user1?.socket.emit("answer",{
        sdp,
        roomId
    })
}




generate(){
    return GLOBAL_ROOM_ID++;  
}

}