import { Accordion, AccordionDetails, AccordionSummary, Card, IconButton, Stack, Typography } from '@mui/material';
import React from 'react'
import { Controller, useForm } from 'react-hook-form';
import Iconify from '../iconify/Iconify';


const TaskFaq = ({list,widget,handleDelete,...other})=>{
   
    return (
        <Card {...other}  sx={{
          padding: 2,          
        }}>
         <div className='py-2'>
            {widget}
         </div>        
         <>
                {list && list.map((task,i) => (
                  <TaskFaqUI
                    key={i}
                    task={task}
                    handleDelete={handleDelete}
                  />
                ))}
        </>
      </Card>
    );
}

const TaskFaqUI = ({task,handleDelete}) => {
 
    return (
        <>
          <Accordion  TransitionProps={{ unmountOnExit: true }}>
            <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
            <Stack direction={'row'} alignItems={"center"} 
            sx={{ flexGrow: 1 }}
            >
              <Iconify icon={'material-symbols:arrow-right-rounded'}
              color="gray" sx={{   m: 1 }} />
              <Typography variant='subtitle2' 
               textTransform={'uppercase'}>
                {task.question + ' ?'}
              </Typography>
            </Stack>
            <IconButton size="large" color="inherit" sx={{ opacity: 0.48 }} onClick={()=>handleDelete(task._id)}>
              <Iconify icon={'eva:trash-2-outline'} color="red" />
            </IconButton>
            </AccordionSummary>
            <AccordionDetails
            sx={{
              m:1,
              flexGrow: 1,
            }}
            >
            <Typography>
              {task.answer}
            </Typography>
          </AccordionDetails>
          </Accordion> 
        </>
      );
}

export default TaskFaq