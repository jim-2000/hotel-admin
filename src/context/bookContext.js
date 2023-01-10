import React from 'react';
//
const Bookform = {
    _id:'',
    name: '',
    email:'',
    phone: '',
    address: '',
    roomId: '886699222',
    roomName: '',
    roomNumber: '',
    paymentMethod: '', // 0-> paypal , 1 -> card, 2->cash 
    paymentId:'', //      
    cash: '',
    checkIn: null,
    checkOut: null,
    totalNight: '',   
};

//
const BookingContext = React.createContext({});
export const useBookForm = () => React.useContext(BookingContext);

export const BookingProvider = ({ children }) => {
    const [bookForm, setBookForm] = React.useState(Bookform);

    const resetBookForm = () => setBookForm(Bookform);
 

    return <BookingContext.Provider value={{ bookForm,setBookForm,resetBookForm}} >{children}</BookingContext.Provider>
};


export default BookingContext;