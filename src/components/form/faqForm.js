import { Alert, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,Typography } from '@mui/material';
import React from 'react'
import { useRoom } from '../../context/roomContext';
import { SimpleInput } from './simpleInput';

const FaqForm = ({widget,Func,title,info}) => { 
  const [open, setOpen] = React.useState(false); 
  const [Form, setForm] = React.useState( '');
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);    
  };
  const onChanged= (event) => {
    const {name,value} = event.target;
    setForm({...Form,[name]:value});  
  }

  return (
    <div>
        {
            widget === 'button' ?( <Button variant="outlined" onClick={handleClickOpen}>Open</Button>) :( <div onClick={handleClickOpen}>{widget}</div>)
        }
        <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {title}        
        </DialogTitle>
        <DialogContent>
            <Alert>
                {info}       
            </Alert>        
          <SimpleInput 
          label={"Question"}
          name={"question"}
          type={"text"}
          fullWidth={true}
          error={false}
          onChange={onChanged}
          placeholder="is this hotel good ?"   
          />
          <SimpleInput 
          label={"Answer"}
          name={"answer"}
          type={"text"}
          fullWidth={true}
          error={false}
          onChange={onChanged}
          placeholder="Yes"
          multiline
          maxrow={4}
          />        
             
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='error' variant='outlined'>Cancel</Button>
          <Button onClick={()=>{                   
              // dispatch(createUser({form,navigate}))                     
            Func(Form);                    
            setForm(null);              
            handleClose();                    
        }} color='success' variant='outlined' 
        >{'Create'}</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default FaqForm