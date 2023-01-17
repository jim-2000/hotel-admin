import React from 'react';
//
const Bookform = {
    _id:'',
    name: '',
    email:'',
    phone: '',
    address: '',
    roomId: '',
    checkIn: new Date(),
    checkOut: new Date(),
    token: null,
    // paymentMethod: 0, // 0-> paypal , 1 -> card, 2->cash 
    paymentId:'', //      
    totalAmount: 50,
    totalNight: 1,  
    address:'', 
    message:'',
    isCarNeed: false,
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