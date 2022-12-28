import React from 'react'
import PropTypes from 'prop-types';
import ReactApexChart  from 'react-apexcharts';

import { Card, CardHeader, Box } from '@mui/material';
import { useChart } from '../../../components/chart';


const AppBookingChart = ({ title, subheader,  chartData, ...other }) => {
    const chartOptions = useChart(
      {        
        chart: {
            id: 'apexchart-example',
            stacked: true,
            animations: {
                enabled: true,
                easing: 'easeinout',
                speed: 800,
                animateGradually: {
                    enabled: true,
                    delay: 300
                },
                dynamicAnimation: {
                    enabled: true,
                    speed: 350
                }
            }
          },
          xaxis: {
            type: 'category',
          },
          labels: ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"],   
        tooltip: {
            shared: false,
            intersect: false,
            y: {
              formatter: (y) => {
                if (typeof y !== 'undefined') {
                  return `${y.toFixed(0)} visits`;
                }
                return y;
              },
            },
          
        },

    }
    );

  return (
    <Card {...other}>
        <CardHeader title={title} subheader={subheader} />
        <Box sx={{ p: 3, pb: 1 }} dir="ltr">
          <ReactApexChart  type="bar"         
            series={chartData}
            options={chartOptions}
            height={364}             
          />
        </Box>
    </Card>
  )
}

export default AppBookingChart