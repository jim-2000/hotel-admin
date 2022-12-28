import { Button, MenuItem } from '@mui/material';
import React from 'react'
import ImageUploading from 'react-images-uploading';
import Iconify from '../iconify/Iconify';
import { useHotel } from '../../context/hotelContext';

const MultipleImage = ({widget, ismultiple=false, value=[] , setval}) => {
    const {hotel,setHotel} = useHotel()
    const [images, setImages] = React.useState(value ?? []);
    const maxNumber = 20;
    const onChange =  (imageList, addUpdateIndex) => { 
        setImages(imageList);
          let newimg = [];
          imageList.forEach(element => {
            // newimg.push(element);
            const photo = element.data_url;
            newimg.push(photo);                     
          });
          setHotel({...hotel,photos:newimg}) ;         
    };

   
  return (
    <div className="w-full">
      <ImageUploading
        multiple={ismultiple}
        value={images}
        onChange={onChange}
        maxNumber={maxNumber}
        dataURLKey="data_url"
      >
        {(
        
        {
          imageList,
          onImageUpload,
          onImageRemoveAll,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps,
        }) => (
            <>
              <div className=" flex flex-col h-96 overflow-y-scroll">
                <div onClick={onImageUpload} className='sticky w-full flex justify-center items-center' >
                    {widget}
                </div>
               
                 <>
                  <div className='grid grid-cols-2  gap-3 mt-10' >
                      {
                          imageList.map((img,i)=>{                         
                              return (
                              <div className='relative' key={i}>
                              {
                               value.length >0 ? <img src={img['url']} className='w-60 h-60 border-2 object-cover'/>  :   <img src={img['data_url']} className='w-60 h-60 border-2 object-cover'/>
                              }
                                  <MenuItem sx={{ color: 'error.main',position:'absolute',zIndex:999 ,top:10,right:0}}
                                      onClick={()=>onImageRemove(i)}
                                  >
                                  <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />                             
                                  </MenuItem>
                              </div>
                            )
                          })
                      }
                    </div>
                  </>
              </div>
           </>
        )          
      }
      </ImageUploading>
    </div>
  )
}

export default MultipleImage