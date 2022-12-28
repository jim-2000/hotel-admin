import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import SimpleInput from '../form/simpleInput';

const SimpleModal = ({widget,title,description, handleOk,openwidget} ) => {
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
            openwidget === 'button' ?( <Button variant="outlined" onClick={handleClickOpen}>Open</Button>) :( <div onClick={handleClickOpen}>{openwidget}</div>)
        }
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>{title ?? ''}</DialogTitle>
            <DialogContent>
            
            <DialogContentText>
            {description ?? ''}
            </DialogContentText>
            {
                widget
            }        
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color='error' variant='outlined'>Cancel</Button>           
                <Button onClick={handleOk} color='info' variant='outlined'>Done</Button>           
            </DialogActions>
      </Dialog>
        </>
    );
}
export default SimpleModal;