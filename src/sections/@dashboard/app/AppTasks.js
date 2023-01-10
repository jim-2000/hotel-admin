import PropTypes from 'prop-types';
import React, { useState } from 'react';
// form
import { useForm, Controller } from 'react-hook-form';
// @mui
import {
  Card,
  Stack,
  Divider,
  Popover,
  Checkbox,
  MenuItem,
  IconButton,
  CardHeader,
  FormControlLabel,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
// components
import Iconify from '../../../components/iconify';
import { useRoom } from '../../../context/roomContext';

// ----------------------------------------------------------------------

AppTasks.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
  list: PropTypes.array.isRequired,
};

export default function AppTasks({ title, subheader,  list,handleDelete, ...other }) {
  const { control } = useForm({
    defaultValues: {
      taskCompleted: ['2'],
    },
  });

  return (
    <Card {...other} sx={{
      padding: 2,
      
    }}>
      {title ? <CardHeader title={title} subheader={subheader} /> : other.widget}
   
            <>
              {list && list.map((task,i) => (
                <TaskItem
                  key={i}
                  task={task}
                  handleDelete={handleDelete}                  
                />
              ))}
            </>
        
     
    </Card>
  );
}

// ----------------------------------------------------------------------

TaskItem.propTypes = {
  checked: PropTypes.bool,
  onChange: PropTypes.func,
  task: PropTypes.shape({
    id: PropTypes.string,
    label: PropTypes.string,
  }),
};

function TaskItem({ task , handleDelete }) {
  const [expanded, setExpanded] = React.useState(false);
  const {room,setRoom,RemoveFeacher} = useRoom()
 
  if (task.answer && task.question) {
    return (
      <>
        <Accordion>
          <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
               <Iconify icon={'material-symbols:arrow-right-rounded'} color="gray" sx={{   m: 1 }} />
            <Stack>
               <Typography variant='caption'>{task.question}</Typography>
            </Stack>
          </AccordionSummary>
          <AccordionDetails>
          <Typography>
            {task.answer}
          </Typography>
        </AccordionDetails>
        </Accordion> 
      </>
    );
  }else{

  return (
    <Stack
      direction="row"
      sx={{
        px: 2,
        py: 0.75,       
      }}
    >
     { task.icon ?  <Iconify icon={task.icon} color="teal" sx={{   m: 1 }} /> : <Iconify icon={'material-symbols:arrow-right-rounded'} color="gray" sx={{   m: 1 }} />}
      {
      task.distance ?  <Stack
      sx={{ flexGrow: 1, m: 1 }}
      >
        <Typography
        
        >{task.name}
        </Typography>
        <span className='text-[12px] text-gray-400'>{task.distance}</span>
        </Stack> : <Typography sx={{ flexGrow: 1, m: 1 }}>{task.name}</Typography>
        
      }
      <IconButton size="large" color="inherit" sx={{ opacity: 0.48 }} onClick={()=>handleDelete(task)}>
        <Iconify icon={'eva:trash-2-outline'} color="red" />
      </IconButton>

      
    </Stack>
  );
    }
}
