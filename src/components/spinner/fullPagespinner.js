import React from 'react'
import BounceLoader from "react-spinners/BounceLoader";
const FullPagespinner = ({isloading=false}) => {
  return (
    <div className='h-screen w-full flex items-center justify-center'>
        <BounceLoader 
        color='#36d7b7'
        loading={isloading}
        size={50}
        aria-label="Loading Spinner"
        data-testid="loader"
        />
    </div>
  )
}

export default FullPagespinner