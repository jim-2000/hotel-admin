import axios from "axios";

const base ='https://mern-hotel.onrender.com/api/';
// const base = `http://localhost:4000/api/`;
const config = {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      "Content-type":"application/json"
    }
  };
const API = axios.create({
    baseURL: base,
    config,
});

API.interceptors.request.use((req) => {
    if (localStorage.getItem("admin")) {
      req.headers.Authorization = `Bearer ${
        JSON.parse(localStorage.getItem("admin")).token
      }`;
    }
    return req;
  })


//config

 

// >>>>>>>>>>>>>>>>>>>>>>>> Admin  <<<<<<<<<<<<<<<<<<<<<<<<<<<<< 
export const loginAdmin = (form)=>API.post('admin/login', form);
export const createAdmin = (form)=>API.post('admin/register', form);


// >>>>>>>>>>>>>>>>>>>>>>>> User  <<<<<<<<<<<<<<<<<<<<<<<<<<<<<
export const ApiCreateUser = (form) => API.post("auth/register/",form);
export const ApiGetAllUser = () => API.get(`users/`);
export const ApiUpdateUser = (id,form) => API.patch(`users/update/${id}`,form);
export const ApiDeleteUser = (id) => API.delete(`users/delete/${id}`);

// >>>>>>>>>>>>>>>>>>>>>>>> Employe  <<<<<<<<<<<<<<<<<<<<<<<<<<<<<
export const ApiGetAllEmploye = () => API.get(`employe/`);
export const ApiCreateEmploye = (form) => API.post(`employe/add`,form);
export const ApiUpdateEmploye = (id, form) => API.patch(`employe/update/${id}`,form);
export const ApiDeleteEmploye = (id) => API.delete(`employe/delete/${id}`);
 

// >>>>>>>>>>>>>>>>>>>>>>>> Hotel  <<<<<<<<<<<<<<<<<<<<<<<<<<<<<
export const ApiHotel = () => API.get(`hottle/`);
export const ApiGetMyHotel = () => API.get(`hottle/myHotel/`);
export const ApiCreateHotel = (hotel)=>API.post('admin/create_hotel',hotel);
export const ApiupdateHotel = (form) => API.patch(`hottle/update`,form);
// hotel nearby  <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
export const ApiAddNearbyHotel = (id,form) => API.patch(`hottle/add/nearby/${id}`,form);
export const ApiRemoveNearbyHotel = (id,form) => API.patch(`hottle/remove/nearby/${id}`,form);
// hotel faq  <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
export const ApiAddFaqbyHotel = (id,form) => API.patch(`hottle/add/faq/${id}`,form);
export const ApiRemoveFaqHotel = (id,form) => API.patch(`hottle/remove/faq/${id}`,form);
// hotel faq  <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
export const ApiAddImagesHotel = (id,form) => API.patch(`hottle/add/img/${id}`,form);
export const ApiRemoveImageHotel = (id,form) => API.patch(`hottle/remove/img/${id}`,form);
//
export const ApiCheck = (form)=>API.patch('hottle/img',form)

  
// >>>>>>>>>>>>>>>>>>>>>>>> ROOM  <<<<<<<<<<<<<<<<<<<<<<<<<<<<<

export const ApiCreteRoom = (form)=>API.post('rooms/create/',form);
export const ApiGetAllRoom = ()=>API.get('rooms/');
export const ApiGetSingelRoom = (id)=>API.get(`rooms/${id}`);
export const ApiUpdateRoom = (id,form)=>API.patch(`rooms/${id}`,form)
export const ApiDeleteRoom = (id)=>API.delete(`rooms/${id}`);
export const ApiAddRoomFeacher = (id,form)=>API.patch(`rooms/add/feacher/${id}`,form);
export const ApiRemoveRoomFeacher = (id,form)=>API.patch(`rooms/remove/feacher/${id}/`,form);
export const ApiAddRoomImg = (id,form)=>API.patch(`rooms//img/add/${id}`,form);
export const ApiRemoveRoomImg = (id,form)=>API.patch(`rooms/img/remove/${id}`,form);

// >>>>>>>>>>>>>>>>>>>>>>>> ROOM  <<<<<<<<<<<<<<<<<<<<<<<<<<<<<

export const ApiGetAllBookings = ()=>API.get('booking');
export const ApiGetBooked = (form)=>API.post(`booking/booked`,form);
export const ApiDeleteBooked = (id)=> API.delete(`booking/booked/${id}`);
export const ApiConfirmBooked = (id)=> API.patch(`booking/booked/confirm/${id}`);