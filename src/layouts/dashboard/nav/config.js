// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: icon('ic_analytics'),
  },
  {
    title: 'user',
    path: '/dashboard/user',
    icon: icon('ic_user'),
  },
  {
    title: 'employe',
    path: '/dashboard/employe',
    icon: icon('ic_user'),
  },
  {
    title: 'Hotel',
    path: '/dashboard/hotel/',
    icon: icon('ic_setting'),
  },
  {
    title: 'room',
    path: '/dashboard/room',
    icon: icon('ic_blog'),
  },
  {
    title: 'Booking',
    path: '/dashboard/booking',
    icon: icon('ic_booking'),
  },
  {
    title: 'Calendar',
    path: '/dashboard/check-calender',
    icon: icon('ic_calender'),
  },
  // {
  //   title: 'Not found',
  //   path: '/404',
  //   icon: icon('ic_disabled'),
  // },
];

export default navConfig;
