import { FormControl, FormControlLabel, FormLabel, InputLabel, MenuItem, Radio, RadioGroup, Select } from '@mui/material'
import { pink } from '@mui/material/colors'
import React from 'react'

const DropDownInput = ({label,name , mapData, isdisable=false , val ,setval,defaultValue}) => {   
  return (
    
    <FormControl fullWidth margin='dense' >
        <InputLabel id="demo-simple-select-label">{label}</InputLabel>
        <Select
            disabled={isdisable}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={val}
            label="Age"
            name={name ?? 'drop'}
            onChange={(e)=>setval(e)}
            defaultValue={defaultValue? defaultValue : mapData[0].value}
        >
            {
                mapData.map((item,i)=>{
                    return <MenuItem value={item.value} key={i}>{item.name}</MenuItem>
                })
            }
        </Select>
    </FormControl>
  )
}

export default DropDownInput

export const RadioButtonGrp = ({label, arryofGrp, isrow=false, val , setval,})=>{
    return (
        <>
            <FormControl>
                <FormLabel id="demo-radio-buttons-group-label">{label}</FormLabel>
                <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="female"
                    name="radio-buttons-group"
                    row={isrow}           
                    onChange={setval}        
                >
                   {
                    arryofGrp.map((item,i)=>{
                        return (
                            <FormControlLabel value={item.value} control={<Radio size='small'
                            sx={{
                                color: pink[800],
                                '&.Mui-checked': {
                                color: pink[600],
                                },
                            }}
                            />} label={item.name}  />
                        )
                    })
                   }
                </RadioGroup>
                </FormControl>
        </>
    )
}