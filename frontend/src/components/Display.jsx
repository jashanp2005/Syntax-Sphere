import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useTheme } from '@mui/material/styles';
import { LineChart, axisClasses } from '@mui/x-charts';
import { Box, Typography } from '@mui/material';

const Display = () => {
  const [arr, setArr] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get('/api/book/scores', { withCredentials: true });
        setArr(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  const theme = useTheme();

  // Generate a unique color for each language
  const colors = theme.palette.augmentColor({
    color: { main: theme.palette.primary.main },
  });

  const languageColors = arr.reduce((acc, item) => {
    if (!acc[item.language]) {
      acc[item.language] = colors[(Object.keys(acc).length % 10)];
    }
    return acc;
  }, {});

  // Transform the data to match the chart requirements
  const transformedData = arr.map((item, index) => ({
    language: item.language,
    score: item.score,
    index: index, // Use index as the x-axis value
  }));

  return (
    <React.Fragment>
      <div style={{ width: '100%', flexGrow: 1, overflow: 'hidden', height: '400px' }}>
        <LineChart
          dataset={transformedData}
          height={400}
          margin={{
            top: 16,
            right: 20,
            left: 70,
            bottom: 30,
          }}
          xAxis={[
            {
              scaleType: 'point', // Scale type can be point since language is categorical
              dataKey: 'index',
              tickNumber: arr.length, // Set the number of ticks to match the number of languages
              tickLabelStyle: theme.typography.body2,
              label: 'Index',
              labelStyle: theme.typography.body1,
            },
          ]}
          yAxis={[
            {
              scaleType: 'linear', // Linear scale for score
              label: 'Score',
              labelStyle: {
                ...theme.typography.body1,
                fill: theme.palette.text.primary,
              },
              tickLabelStyle: theme.typography.body2,
              max: Math.max(...arr.map(item => item.score)) + 10,
              tickNumber: 3,
            },
          ]}
          series={[
            {
              dataKey: 'score',
              showMark: true,
              markStyle: { 
                fill: theme.palette.primary.dark, 
                r: 3, 
              },
              lineStyle: { 
                strokeWidth: 2, 
              },
              color: (d) => languageColors[d.language],
            },
          ]}
          sx={{
            [`.${axisClasses.root} line`]: { stroke: theme.palette.text.secondary },
            [`.${axisClasses.root} text`]: { fill: theme.palette.text.secondary },
            [`& .${axisClasses.left} .${axisClasses.label}`]: {
              transform: 'translateX(-25px)',
            },
            // Additional custom styles for the chart
            '& .MuiChart-series': {
              stroke: theme.palette.secondary.main,
            },
            '& .MuiChart-mark': {
              fill: theme.palette.secondary.dark,
              stroke: theme.palette.secondary.main,
              strokeWidth: 1,
            },
            '& .MuiChart-axis': {
              stroke: theme.palette.divider,
            },
            '& .MuiChart-axis-label': {
              fill: theme.palette.text.primary,
              ...theme.typography.subtitle2,
            },
          }}
        />
      </div>
      {/* Custom Legend */}
      <Box display="flex" justifyContent="center" mt={2}>
        {Object.keys(languageColors).map((language) => (
          <Box key={language} display="flex" alignItems="center" mx={1}>
            <Box
              sx={{
                width: 14,
                height: 14,
                backgroundColor: languageColors[language],
                marginRight: theme.spacing(1),
              }}
            />
            <Typography variant="body2">{language}</Typography>
          </Box>
        ))}
      </Box>
    </React.Fragment>
  );
};

export default Display;