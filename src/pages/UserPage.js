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
} from '@mui/material';
// components
import Label from '../components/label';
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
// sections
import { UserListHead, UserListToolbar } from '../sections/@dashboard/user';
// mock
import { deleteUser, fetchUser, updateUser } from '../redux/slice/UserSlice';
import SimpleModal from '../components/modalBox/simpleModal';
import FormDialog from '../components/modalBox/formDialog';
import ConfirmDialog from '../components/modalBox/confirmDialog';
import { toast } from 'react-hot-toast';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'email', label: 'Email', alignRight: false },
  { id: 'phone', label: 'Phone', alignRight: false },
  { id: 'country', label: 'Country', alignRight: false },
  { id: 'isVerified', label: 'Verified', alignRight: false },
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

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function UserPage() {
  const [open, setOpen] = useState(null);

  const [editpage, setEditpage] = useState(false);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);
  const { users ,uerror} = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };
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

 

  // const handleClick = (event, name) => {
  //   const selectedIndex = selected.indexOf(name);
  //   let newSelected = [];
  //   if (selectedIndex === -1) {
  //     newSelected = newSelected.concat(selected, name);
  //   } else if (selectedIndex === 0) {
  //     newSelected = newSelected.concat(selected.slice(1));
  //   } else if (selectedIndex === selected.length - 1) {
  //     newSelected = newSelected.concat(selected.slice(0, -1));
  //   } else if (selectedIndex > 0) {
  //     newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
  //   }
  //   setSelected(newSelected);
  // };

 

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };
 

  useEffect(() => {
    dispatch(fetchUser(toast));
  }, []);


  const newData = {
    username: '',
    email: '',
    phone: '',
    img: '',
  }
  return (
    <>
      <Helmet>
        <title> User | Hotel luner </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            User
          </Typography>
           
            <FormDialog widget={
              <Button variant="outlined" startIcon={<Iconify icon="eva:plus-fill" />} >New User</Button>
            } data={newData}
            
            />
        </Stack>

        <Card>
          <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 ,paddingX:2}} >
              <Table  sx={{ paddingX:2}}>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={users.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
           
                />
                <TableBody>
                  
                  {                 
                  users.map((row) => {
                    const { _id, username, phone, email, country, img, isBlocked,isVerified,role } = row;
                    const data = { _id, username, phone, email, country, img, isBlocked,isVerified };
                    const selectedUser = selected.indexOf(_id) !== -1;                   

                    return (
                      <TableRow hover key={_id} className={`${role === 'admin' ? 'bg-teal-600' : 'bg-gray-400'} rounded-md px-1`}>
                        

                        <TableCell component="th" scope="row" padding="none">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Avatar alt={username} src={img} />
                            <Typography variant="subtitle2" noWrap>
                              {username}
                            </Typography>
                          </Stack>
                        </TableCell>
                        <TableCell align="left">{email}</TableCell>

                        <TableCell align="left">{phone}</TableCell>

                        <TableCell align="left">{country}</TableCell>


                        <TableCell align="left">
                          <Label color={isVerified ?   'success' : 'error'}>{isVerified ? 'Yes' : 'No'}</Label>
                        </TableCell>

                        <TableCell align="right">                         
                          <Stack direction={'row'}>
                                <FormDialog widget={
                                    <MenuItem>
                                      <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />                              
                                    </MenuItem>
                                  } data={data}                                  
                                  isupdate={true}
                                  onFun={(form)=>{
                                    console.log(form,_id);
                                    dispatch(updateUser({form,id:_id,toast}))
                                  }}
                                />
                              <ConfirmDialog 
                              id={_id}
                              alert={`You want to delete ${username} Permanently.`}
                              Func={()=>{
                                console.log(_id);
                                dispatch(deleteUser({id:_id,toast}));
                              }}
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
                   
                </TableBody>

                {users.length < 0  && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <Paper
                          sx={{
                            textAlign: 'center',
                          }}
                        >
                          <Typography variant="h6" paragraph>
                            Not found
                          </Typography>

                          <Typography variant="body2">
                            No results found for &nbsp;
                            <strong>&quot;{filterName}&quot;</strong>.
                            <br /> Try checking for typos or using complete words.
                          </Typography>
                        </Paper>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

         
        </Card>
      </Container>
     

     
    </>
  );
}
