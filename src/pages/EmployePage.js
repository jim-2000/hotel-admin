import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// @mui
import {
  Card,
  Table,
  Stack,
  Paper,
  Avatar,
  Button,
  Popover,
  Checkbox,
  TableRow,
  MenuItem,
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,
  Box,
  Grid,
} from '@mui/material';
// components
import Label from '../components/label';
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
// sections
import { UserListHead, UserListToolbar } from '../sections/@dashboard/user';
// mock
import USERLIST from '../_mock/user';
import { fetchUser } from '../redux/slice/UserSlice';
import SimpleModal from '../components/modalBox/simpleModal';
import FormDialog from '../components/modalBox/formDialog';
import ConfirmDialog from '../components/modalBox/confirmDialog';
import AddEmployeForm from '../components/form/addEmployeForm';
import { AppWidgetSummary } from '../sections/@dashboard/app';
import { DelteEmploye, getEmployees } from '../redux/slice/employeSlice';
import FullPagespinner from '../components/spinner/fullPagespinner';
import { toast } from 'react-hot-toast';
// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'email', label: 'Email', alignRight: false },
  { id: 'phone', label: 'Phone', alignRight: false },
  { id: 'jobtitle', label: 'JobTitle', alignRight: false },
  { id: 'role', label: 'Role', alignRight: false },
  { id: 'button' ,label: '', alignRight: false,},
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

 
 
export default function EmployePage() {
  const [open, setOpen] = useState(null);

  const [editpage, setEditpage] = useState(false);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);
  const { employees,eloading } = useSelector((state) => state.employe);

  const dispatch = useDispatch();

  
  const handleCloseEditpage = () => {
    setEditpage(false);
  };
  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = USERLIST.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };
 

 
  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

 

  useEffect(() => {
    dispatch(getEmployees());
  }, []);

  const data = {
    name: 'jim',
    email: 'johnW@mow.com',
    phone:'+880 1552354022',
    jobtitle:'manager',   
    img:'https://source.unsplash.com/random',
    sallary: 5000,
  }

  if(eloading){
    return <FullPagespinner isloading={eloading} />
  }
  return (
    <>
      <Helmet>
        <title> Employe | Hotel luner </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Employe
          </Typography>
          <AddEmployeForm isupdate={false} />          
        </Stack>
        <Grid container justifyContent="center" sx={{ mt: 3 }} spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
              <AppWidgetSummary title="Total Employe" total={872} color="success" icon={'ant-design:home-filled'} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
              <AppWidgetSummary title="Total Sellary" total={872} color="warning" icon={'ant-design:home-filled'} subtitle="monthly" />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
              <AppWidgetSummary title="Leave Employe" total={872} color="error" icon={'ant-design:home-filled'} />
          </Grid>
        </Grid>

        <Card>
          <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 ,paddingX:2}}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={USERLIST.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody >
                  {
                    editpage && <SimpleModal close={handleCloseEditpage} visible={editpage} />
                  }
                  {
                  // filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    employees &&  employees.map((row) => {
                    const { _id, name, phone, email,img,sallary,role,jobTitle } = row;
                    const data = { _id, name, phone, email,img,sallary,role,jobTitle};
                    const selectedUser = selected.indexOf(_id) !== -1;                   

                    return (
                      <TableRow hover key={_id} tabIndex={-1} role="checkbox" selected={selectedUser}>
                        {/* <TableCell padding="checkbox">
                          <Checkbox checked={selectedUser} onChange={(event) => handleClick(event, _id)} />
                        </TableCell> */}

                        <TableCell component="th" scope="row" padding="none">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Avatar alt={name} src={img} />
                            <Typography variant="subtitle2" noWrap>
                              {name}
                            </Typography>
                          </Stack>
                        </TableCell>
                        <TableCell align="left">{email}</TableCell>

                        <TableCell align="left">{phone}</TableCell>

                        <TableCell align="left">
                          <Label color={'success'}>{jobTitle}</Label>
                        </TableCell>

                        <TableCell align="left">
                          <Label color={'secondary'}>{role}</Label>
                        </TableCell>

                        <TableCell align="right">                         
                          <Stack direction={'row'}>
                          <AddEmployeForm isupdate={true} data={data} />  
                                {/* <FormDialog widget={
                                    <MenuItem>
                                      <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />                              
                                    </MenuItem>
                                  } data={data}
                                /> */}
                              <ConfirmDialog
                              alert={`Are you sure you want to delete this employee ${name}`} 
                              Func={()=>{
                                dispatch(DelteEmploye({id:_id, toast}))
                              }}
                              id={_id}
                              widget={
                                <MenuItem sx={{ color: 'error.main' }}>
                                <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />                             
                              </MenuItem>
                              }
                              />
                          </Stack>
                        </TableCell>
                      </TableRow>
                    );

                    
                  })
                }
                {
                  !employees && (
                    <TableRow>
                      <TableCell colSpan={6} align="center">
                        <Typography variant="subtitle1" sx={{ py: 3 }}>
                          No Employee Found
                        </Typography>
                      </TableCell>
                    </TableRow>
                  )
                }
                
                </TableBody>                
              </Table>
            </TableContainer>
          </Scrollbar>        
        </Card>
       

      

      </Container>
     

   
      
    </>
  );
}
