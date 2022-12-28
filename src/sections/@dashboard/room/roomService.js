import React from 'react'
import Iconify from '../../../components/iconify/Iconify'
 

const Roomservices = () => {
  return (
    <>
        <div className='flex flex-wrap items-center justify-start p-2  border-dotted border-2 border-teal-300 m-[2px]'>
                            <div className='px-2'>
                                <Iconify icon="mdi:bed" color="#a1925" />                                
                            </div>
                            <p className='text-sm text-text font-semibold' >{"services"}</p>
        </div>
    </>
  )
}

export default Roomservices