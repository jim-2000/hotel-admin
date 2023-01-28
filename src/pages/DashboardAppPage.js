import { Helmet } from 'react-helmet-async';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
// import AppBookingChart from 'src/sections/@dashboard/app/AppBookingChart';
// components
import Iconify from '../components/iconify';
// sections
import {
  AppTasks,
  AppNewsUpdate,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppWidgetSummary,
  AppCurrentSubject,
  AppConversionRates,
  AppBookingChart,
} from '../sections/@dashboard/app';
import { useDispatch, useSelector } from 'react-redux';
import { Allroom } from '../redux/slice/roomSlice';
import { useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { getAllHotels, getHotel } from '../redux/slice/hotelSlice';
import {  getAllBookings } from '../redux/slice/bookinSlice';
import { getEmployees } from '../redux/slice/employeSlice';
import {format} from 'date-fns'

// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  const theme = useTheme();
  const {user} = useSelector((state)=>state.auth)
  const {users} = useSelector((state)=>state.user)
  const {Booking} = useSelector((state)=>state.book)
  const {rooms} = useSelector((state)=>state.room)
  const {employees} = useSelector((state)=>state.employe)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getHotel());
    dispatch(getAllHotels(toast));
    dispatch(Allroom(toast));    
    dispatch(getAllBookings(toast)); 
    dispatch(getEmployees());
  }, [ ])
  
const onlinePayment = Booking?.filter((book)=>book.IsOnlinepaid === true)
const offlinePayment = Booking?.filter((book)=>book.IscashOn === true)
console.log(offlinePayment.length);
  return (
    <>
      <Helmet>
        <title> Dashboard | Hotel Lunar</title>

      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome back {user?.username}
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Total Booking" total={Booking?.length} color="success" icon={'ant-design:home-filled'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Users" total={users?.length} color="info" icon={'material-symbols:supervised-user-circle'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Total Room" total={rooms?.length} color="success" icon={'arcticons:booking'}  />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Total Employe" total={employees?.length} color="success" icon={'mi-log-in'} />  
          </Grid>
          
          <Grid item xs={12} md={6} lg={8}>
            <AppBookingChart 
            chartData={
              [
                {
                name: format(Date.now(),'LLL'),                
                data:[
                {
                    x: 'Jan',
                    y: 150,
                }, 
                {
                    x: 'Feb',
                    y: 2000
                },             
                {
                  x: 'Mar',
                  y: 660
                },
                {
                  x: 'Apr',
                  y: 850
                },
                {
                  x: 'May ',
                  y: 320
                },
                {
                  x: 'Jun',
                  y: 550,
                },
                {
                  x: 'Jul',
                  y: 985
                },
                {
                  x: 'Aug',
                  y: 470
                },
                {
                  x: 'Sep ',
                  y: 700
                },
                {
                  x: 'Oct',
                  y: 550,
                },
                {
                  x: 'Nov ',
                  y: 1800
                },
                {
                  x: 'Dec',
                  y: 2180,
                },
              ],              
               
              },
               
            ]}
            //  chartData={Booking}
            title="Booking Chart"
            subheader="(+43%) than last month"
            />
             
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits
              title="Payment Methods"
              chartData={[
                { label: 'Stripe', value: onlinePayment.length ??33 },
                { label: 'Cash On', value: offlinePayment.length ??66 },

              ]}
              chartColors={[
                theme.palette.success.main,
                theme.palette.grey[500],
                theme.palette.warning.main,
              ]}
              subheader="Uses 80% Cash On"
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppConversionRates
              title="Conversion Rates"
              subheader="(+43%) than last year"
              chartData={
                [
                { label: 'Banglades', value: 400 },
                { label: 'India', value: 430 },
                { label: 'China', value: 448 },
                { label: 'Canada', value: 470 },
                { label: 'France', value: 540 },
                { label: 'Germany', value: 580 },
                { label: 'South Korea', value: 690 },
                { label: 'Netherlands', value: 1100 },
                { label: 'United States', value: 1200 },
                { label: 'United Kingdom', value: 1380 },
              ]
            }
            />
          </Grid>

  

          
           

          <Grid item xs={12} md={6} lg={4}>
            <AppTrafficBySite
              title="Traffic by Site"
              list={[
                {
                  name: 'FaceBook',
                  value: 323234,
                  icon: <Iconify icon={'eva:facebook-fill'} color="#1877F2" width={32} />,
                },
                {
                  name: 'Google',
                  value: 341212,
                  icon: <Iconify icon={'eva:google-fill'} color="#DF3E30" width={32} />,
                },
                {
                  name: 'Linkedin',
                  value: 411213,
                  icon: <Iconify icon={'eva:linkedin-fill'} color="#006097" width={32} />,
                },
                {
                  name: 'Twitter',
                  value: 443232,
                  icon: <Iconify icon={'eva:twitter-fill'} color="#1C9CEA" width={32} />,
                },
              ]}
            />
          </Grid>

 
        </Grid>
      </Container>
    </>
  );
}
