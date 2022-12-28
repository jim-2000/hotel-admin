import React from 'react';
//
const roomform = {
    title: '',
    description:'',
    roomNumber: '',
    roomType: '',
    price: '',
    maxGuests: '',
    img : [],
    coverImg:'',
    size: '',
    totalBed: '', // enum ['Single','Double','King']
    roomstatus:'',
    roomFeature:[],
    bedType:'',
};

//
const RoomContext = React.createContext({});
export const useRoom = () => React.useContext(RoomContext);

export const RoomProvider = ({ children }) => {
    const [room, setRoom] = React.useState(roomform);
    const RemoveFeacher = (name)=>{
        // const filtered = room.roomFeature.filter(rom => (rom.name !== name));
        // setRoom({...room,roomFeature:[...room.roomFeature,filtered]})   
        setRoom({...room,roomFeature:room.roomFeature.filter(rom => (rom.name !== name))})
    }
    return <RoomContext.Provider value={{ room,setRoom ,RemoveFeacher}} >{children}</RoomContext.Provider>
};


export default RoomContext;