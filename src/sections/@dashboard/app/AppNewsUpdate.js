// @mui
import PropTypes from 'prop-types';
import { Box, Stack, Link, Card, Button, Divider, Typography, CardHeader } from '@mui/material';
// utils
import { fToNow } from '../../../utils/formatTime';
// components
import Iconify from '../../../components/iconify';
import Scrollbar from '../../../components/scrollbar';

// ----------------------------------------------------------------------

AppNewsUpdate.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
  list: PropTypes.array.isRequired,
};
// text sort function
const sortText= (str,max)=>{
  if (str.length >max) {
    str = `${str.substring(0, max)}...`;     
  }
  return str;
}

export default function AppNewsUpdate({ title, subheader, list, ...other }) {
  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      {/* <Scrollbar>
       
      </Scrollbar> */}
       <Stack spacing={3} sx={{ p: 3, pr: 0 }} >
          {list.map((news) => (
            <NewsItem key={news.id} news={news} />
          ))}
        </Stack>

      <Divider />

      <Box sx={{ p: 2, textAlign: 'right' }}>
        <Button size="small" color="inherit" endIcon={<Iconify icon={'eva:arrow-ios-forward-fill'} />}>
          View all
        </Button>
      </Box>
    </Card>
  );
}

// ----------------------------------------------------------------------

NewsItem.propTypes = {
  news: PropTypes.shape({
    description: PropTypes.string,
    image: PropTypes.string,
    postedAt: PropTypes.instanceOf(Date),
    title: PropTypes.string,
  }),
};

function NewsItem({ news }) {
  const { image, title, description, postedAt } = news;

  return (
    <Card elevation={8}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ p: 2 }} >
        <Stack spacing={1}>
        <Box component="img" alt={title} src={image} sx={{ width: 48, height: 48, borderRadius: 1.5, flexShrink: 0 }} />
            <Link color="inherit" variant="subtitle2" underline="hover" noWrap>
              {title}
            </Link>
            <Typography variant="caption" sx={{ pr: 3, flexShrink: 0, color: 'text.secondary' }}>
            {fToNow(postedAt)}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' ,flexShrink:0, }}  >
              {description}
            </Typography>    
        </Stack>
        <Stack  direction={"row"}  spacing={1} >
              <Button variant="outlined">Outlined</Button>
              <Button variant="outlined">Outlined</Button>
              <Button variant="outlined">Outlined</Button>
          </Stack>
      </Stack>
        {/* <Stack direction="row" alignItems="center" spacing={2}    justifyContent={"end" } justifyItems="end" >
          <Box component="img" alt={title} src={image} sx={{ width: 48, height: 48, borderRadius: 1.5, flexShrink: 0 }} />

          <Stack  direction={"column"} flexWrap>
            <Link color="inherit" variant="subtitle2" underline="hover" noWrap>
              {title}
            </Link>
            
            <Typography variant="caption" sx={{ pr: 3, flexShrink: 0, color: 'text.secondary' }}>
            {fToNow(postedAt)}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' ,flexShrink:0, }}  >
              {description}
            </Typography>       
          </Stack>
          <Stack  direction={"row"} sx={{ flexGrow: 1 }} >
              <Button variant="outlined">Outlined</Button>
              <Button variant="outlined">Outlined</Button>
              <Button variant="outlined">Outlined</Button>
          </Stack>

          
        </Stack> */}
    </Card>
  );
}

