import React from 'react'
import { IconButton, InputAdornment, TextField } from "@mui/material"
import { Stack } from "@mui/system"
import Iconify from '../iconify/Iconify';

export const SimplePasswordInput =({label, name, type,  variant, value, onChange, error, helperText, icon, iconPosition, ...props})=>{
    const [showPassword, setShowPassword] = React.useState(false);
    return(
        <> 
        <TextField
          margin='dense'
          name={name}
          label={label}
          type={showPassword ? 'text' : 'password'}
          fullWidth={true}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
 
        </>
        
    )
}

export const SimpleInput = ({label, name, type, fullWidth, variant, value, onChange, error, helperText, icon, iconPosition ,placeholder, ...props}) => {
    return (
        <>
            <TextField
                className='text-gray-400'
                margin='dense'
                label={label}
                name={name}
                type={type}
                fullWidth={fullWidth}
                variant={variant}
                value={value}
                onChange={onChange}
                error={error}
                helperText={helperText}
                placeholder={placeholder}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <Iconify icon={icon} />
                        </InputAdornment>
                    ),
                }}
                {...props}
            />
        </>
    )
}
 