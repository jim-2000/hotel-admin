import React from 'react'
import BeatLoader from "react-spinners/BeatLoader";

const SmallSpinner = ({isloading=false}) => {
  return (
    <div className='h-full w-full flex items-center justify-center'>
        <BeatLoader 
        color='#36d7b7'
        loading={isloading}
        size={50}
        aria-label="Loading Spinner"
        data-testid="loader"
        />
    </div>
  )
}

export default SmallSpinner