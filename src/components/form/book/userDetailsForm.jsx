import React from 'react'
import { SimpleInput } from '../simpleInput'
import { useBookForm } from '../../../context/bookContext'
import { Stack } from '@mui/material'

const UserDetailsForm = () => {
    const {bookForm,setBookForm} = useBookForm()

    const onChange = (e)=>{
        const {name,value} = e.target;
        setBookForm({...bookForm, [name]: value})   
      }

  return (
    <div className='pb-8'>
        <Stack   direction={{ xs: 'column', sm: 'row' }}  >
            <SimpleInput 
            fullWidth={true}
            label="Name"
            name="name"
            value={bookForm.name ?? ''}
            onChange={onChange}
            placeholder="John Smith"
            sx={{
                marginRight: '0.5rem',
              }}
            />
            <SimpleInput 
            fullWidth={true}
            label="Email"
            name="email"
            value={bookForm.email ?? ''}
            onChange={onChange}
            placeholder="john.smith@gmail.com"
            />
        </Stack>
        <Stack   direction={{ xs: 'column', sm: 'row' }} >
            <SimpleInput 
            fullWidth={true}
            label="Phone"
            name="phone"
            value={bookForm.phone ?? ''}
            onChange={onChange}
            placeholder="+880 199662233"
            sx={{
                marginRight: '0.5rem',
              }}
            />
            <textarea 
            // fullWidth={true}
            className='w-full outline-none p-2 text-gray-400 border border-gray-300'
            label="Address"
            name="address"
            value={bookForm.address ?? ''}
            onChange={onChange}
            placeholder="32 east 6th St Place"
            />
        </Stack>
    </div>
  )
}

export default UserDetailsForm