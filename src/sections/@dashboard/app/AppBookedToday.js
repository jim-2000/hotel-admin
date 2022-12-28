import React from 'react'
import PropTypes from 'prop-types';
import ReactApexChart  from 'react-apexcharts';

import { Card, CardHeader, Box } from '@mui/material';
import { useChart } from '../../../components/chart';
const AppBookedToday = () => {
    const chartOptions = useChart({
        tooltip: {
          marker: { show: false },
          y: {
            formatter: (seriesName) => fNumber(seriesName),
            title: {
              formatter: () => '',
            },
          },
        },
        plotOptions: {
          bar: { horizontal: true, barHeight: '28%', borderRadius: 2 },
        },
        
      });
    
  return (
    <div></div>
  )
}

export default AppBookedToday