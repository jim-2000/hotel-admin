import React from 'react';
import { useSelector } from 'react-redux';
//

 
const hotelData = {
    name:  '',
    description:' ',
    type:'1', // 1-hotel, 2-motel, 3-resort, 4-hostel, 5-guesthouse
    city: '',
    address: '',
    lat: '',
    long: '',
    photos : [],    
    cheapestPrice: 300,
    nearby: [
        // {
        //     name: 'Tiger Hill',
        //     distance: '800m'
        // }
    ], // {name : distance}
 
    // wifi, car,swimming pool etc..{string}
    Services:[], // free car 
    checkIn:'12.00 AM', // rulse
    checkOut:'11.30 AM', // rulse
    cancellation:'', // rulse
    faq:[
        // {
        //     question: 'can you help me?',
        //     answer: 'of course we can help you!'
        // },
        // {
        //     question: 'Unmarried couples allowed?',
        //     answer: 'No issues...provided they have a valid ID.'
        // },
        // {
        //     question: 'Do you provide car facility?',
        //     answer: 'Yes! I do provide car facilities for sightseeing, airport/railway station drop.'
        // },
        // {
        //     question: 'distance of batasia loop from the homestay?',
        //     answer: 'By car it will take around 7 minutes...and walking distance would be around 15 to 20 minutes.'
        // },
    ], // {question,answer } 
};

//
const HotelContext = React.createContext({});
export const useHotel = () => React.useContext(HotelContext);

export const HotelProvider = ({ children }) => {
    const {myhotel } = useSelector((state) => state.hotel);
    const [hotel, setHotel] = React.useState(hotelData); 
    // update form

    const updateHotelvalue = ()=>{
        setHotel(myhotel);
    }

    // Reset form null
    const ResetForm = () => {
        setHotel(hotelData);
        console.log(hotel);
    }

 

    const RemoveNearby = (name)=>{
        // setHotel({...hotel,nearby:hotel.near.filter(rom => (rom.name !== name))})
        // const filtered = room.roomFeature.filter(rom => (rom.name !== name));
        // setRoom({...room,roomFeature:[...room.roomFeature,filtered]})   
        // setRoom({...room,roomFeature:room.roomFeature.filter(rom => (rom.name !== name))})
    }
    return <HotelContext.Provider value={{ hotel,setHotel,RemoveNearby,ResetForm,updateHotelvalue}} >{children}</HotelContext.Provider>
};


export default HotelContext;