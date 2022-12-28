import { Button, MenuItem } from '@mui/material';
import React, { useEffect } from 'react'
import ImageUploading from 'react-images-uploading';
import { useRoom } from '../../context/roomContext';
import Iconify from '../iconify/Iconify';

const ImageUp = ({widget, ismultiple=false, value=[] , setval}) => {
  const {room,setRoom} = useRoom();
    const [images, setImages] = React.useState(room.img);
    const maxNumber = 20;
    const onChange =  (imageList, addUpdateIndex) => {
 
        // setBooking({...booking, work: true})
        // data for submit
        // console.log(imageList, room,value);
        setImages(imageList);
        if (ismultiple) {
          let newimg = [];
          imageList.forEach(element => {
            newimg.push(element.data_url);
            setval({})
          });
          setRoom({...room,img:newimg})
        }else{
          setval(imageList[0]['data_url']);
          setRoom({...room,coverImg:imageList[0]['data_url']});

        }
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
               
                {
                  ismultiple ? (<><div className='grid grid-cols-2  gap-3 mt-10' >
                  {
                      imageList.map((img,i)=>{
                         
                          return (
                          <div className='relative' key={i}>
                            <img src={img['data_url']} className='w-60 h-60 border-2 object-cover'/>
                              <MenuItem sx={{ color: 'error.main',position:'absolute',zIndex:999 ,top:10,right:0}}
                                   onClick={()=>onImageRemove(i)}
                              >
                               <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />                             
                              </MenuItem>
                          </div>
                        )
                      })
                  }
              </div></>) : (<>
                <div className='w-full' >
                    {
                       imageList.map((img,i)=>{
                            return(
                            <div className='relative py-2' key={i}>
                              <img src={img['data_url']} className='w-full h-60 border-2 object-cover'/>
                                <MenuItem sx={{ color: 'error.main',position:'absolute',zIndex:999 ,top:10,right:0}}
                                onClick={()=>onImageRemove(i)}
                                >
                                 <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />                             
                                </MenuItem>
                            </div>
                            )
                        })
                    }
                </div></>)
                }
            </div>
            </>
        )
        // (
        //   // write your building UI
        //   <div className=" flex flex-col">
        //    <Button variant="outlined"  startIcon={<Iconify icon="eva:plus-fill" />} onClick={onImageUpload} >Add Image</Button>
            
        //     {imageList.map((image, index) => (
        //       <div key={index} className='grid grid-cols-3'  >
        //         <img src={image['data_url']} className='w-40 h-40'/>
        //         {/* <div className=""
        //         style={{
        //             // backgroundImage:`${image['dataURL']}`
        //             backgroundImage:`url("${image['dataURL']}")`,
        //         }}
        //         >
        //             <MenuItem>
        //                 <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />                              
        //             </MenuItem>
        //             <MenuItem sx={{ color: 'error.main' }}>
        //                 <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />                             
        //             </MenuItem>
        //         </div> */}
        //       </div>
        //     ))}
        //   </div>
        // )
        }
      </ImageUploading>
    </div>
  )
}

export default ImageUp