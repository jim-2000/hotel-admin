import React from 'react'

import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";

const ConfirmDialog = ({widget, id,Func}) => {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
    return (
        <>
            {
            widget === 'button' ?( <Button variant="outlined" onClick={handleClickOpen}>Open</Button>) :( <div onClick={handleClickOpen}>{widget}</div>)
        }
        <Dialog open={open} >
             <DialogTitle>Are you Sure You wan't to Delete This User</DialogTitle>
            <DialogContent></DialogContent>
            <DialogActions>
          <Button onClick={handleClose} color='success' variant='outlined'>Cancel</Button>
          <Button onClick={()=>{
            Func()
            handleClose()
          }} color='error' variant='outlined' >Delete</Button>
        </DialogActions>
        </Dialog>
        </>
    );
};

export default ConfirmDialog;