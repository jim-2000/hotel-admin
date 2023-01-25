import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,Typography } from '@mui/material';
import React from 'react'
import { useRoom } from '../../context/roomContext';
import { SimpleInput } from './simpleInput';

const RoomFeacher = ({widget ,Fun=()=>{} , isupdate=false}) => {
  const {room,setRoom} = useRoom()
  const [open, setOpen] = React.useState(false); 
  const [ndescription, setDescription] = React.useState('');
  const [Nname, setName] = React.useState( '');
  const [NIcon, setIcon] = React.useState('');
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);    
  };

  return (
    <div>
        {
            widget === 'button' ?( <Button variant="outlined" onClick={handleClickOpen}>Open</Button>) :( <div onClick={handleClickOpen}>{widget}</div>)
        }
        <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {
              isupdate ? 'Update Feacher' : 'Add new Feacher'
          }
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
          {
              isupdate ? 'Update your feacher ' : 'Add new Feacher'
          }
          </DialogContentText>          
       
          <SimpleInput 
          label={"Title"}
          name={"title"}
          type={"text"}
          fullWidth={true}
          error={false}
          value={Nname}
          onChange={(e)=>{setName(e.target.value)}}
          placeholder="Air condition"
          />
          <SimpleInput 
          label={"Description"}
          name={"description"}
          type={"text"}
          fullWidth={true}
          error={false}
          value={ndescription}
          onChange={(e)=>{setDescription(e.target.value)}}
          placeholder="Cool Air condition"
          />
        
          <SimpleInput 
          label={"Icon Name"}
          name={"icon"}
          type={"text"}
          fullWidth={true}
          error={false}
          value={NIcon}
          onChange={(e)=>{setIcon(e.target.value)}}
          placeholder="eva:plus-fill"
          />
          
         
                 
                       
          
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='error' variant='outlined'>Cancel</Button>
          <Button onClick={()=>{
            let form ={
              name:Nname,
              description:ndescription,
              icon: NIcon ?? 'eva:plus-fill',
              // img:nimg,  
            }        
       
              setRoom({...room,roomFeature:[...room.roomFeature,form]})   
              Fun(form)
               console.log(room.roomFeature);                         
               setName('');
               setDescription('');
               setIcon('');
               handleClose();

                    
          }} color='success' variant='outlined' >{'Create'}</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default RoomFeacher