import React from 'react'
import Iconify from '../../../components/iconify/Iconify'
 

const Roomservices = ({item}) => {
  return (
    <>
        <div className='flex flex-wrap items-center justify-start p-2  border-dotted border-2 border-teal-300 m-[2px]'>
          <div className='px-2'>
              <Iconify icon={item.icon} color="teal" />                                
          </div>
          <p className='text-[12px] font-semibold uppercase' style={{color:"gray"}} >{item.name}</p>
        </div>
    </>
  )
}
 

export default Roomservices