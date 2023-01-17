import React from 'react';
//
const roomform = {
    // _id:'',
    title: '',
    description:'',
    roomNumber: '',
    roomType: '',
    price: '',
    maxGuests: '',
    img : [],
    coverImg:'',
    size: '',
    totalBed: '', // enum ['0 Single','1 Double','2 King']
    roomFeature:[],
    bedType:'',
};

//
const RoomContext = React.createContext({});
export const useRoom = () => React.useContext(RoomContext);

export const RoomProvider = ({ children }) => {
    const [room, setRoom] = React.useState(roomform);

    const resetRoom = () => setRoom(roomform);

    const RemoveFeacher = (name)=>{
        // const filtered = room.roomFeature.filter(rom => (rom.name !== name));
        // setRoom({...room,roomFeature:[...room.roomFeature,filtered]})   
        setRoom({...room,roomFeature:room.roomFeature.filter(rom => (rom.name !== name))})
    }
    const DeleteFeacher = (name)=>{
        // const filtered = room.roomFeature.filter(rom => (rom.name !== name));
        // setRoom({...room,roomFeature:[...room.roomFeature,filtered]})   
        setRoom({...room,roomFeature:room.roomFeature.filter(rom => (rom.name !== name))})
    }
   

    return <RoomContext.Provider value={{ room,setRoom ,RemoveFeacher,resetRoom,DeleteFeacher}} >{children}</RoomContext.Provider>
};


export default RoomContext;