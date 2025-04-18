import React from 'react';
import { Box, Container, Tab, Tabs, Typography } from '@mui/material';
import MoodCheckIn from '../components/MoodCheckIn';
import StudyBreakGenerator from '../components/StudyBreakGenerator';
import MotivationGenerator from '../components/MotivationGenerator';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import SpaIcon from '@mui/icons-material/Spa';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`mental-health-tabpanel-${index}`}
      aria-labelledby={`mental-health-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ py: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `mental-health-tab-${index}`,
    'aria-controls': `mental-health-tabpanel-${index}`,
  };
}

const MentalHealthPage = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ mb: 4 }}>
          Mental Health Support
        </Typography>

        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={value}
            onChange={handleChange}
            variant="fullWidth"
            aria-label="mental health features"
            sx={{
              '& .MuiTab-root': {
                minHeight: 64,
                fontSize: '1rem',
              },
            }}
          >
            <Tab 
              icon={<SentimentSatisfiedAltIcon />} 
              label="Mood Check-In" 
              {...a11yProps(0)}
              sx={{ textTransform: 'none' }}
            />
            <Tab 
              icon={<SpaIcon />} 
              label="Study Break" 
              {...a11yProps(1)}
              sx={{ textTransform: 'none' }}
            />
            <Tab 
              icon={<EmojiObjectsIcon />} 
              label="Motivation" 
              {...a11yProps(2)}
              sx={{ textTransform: 'none' }}
            />
          </Tabs>
        </Box>

        <TabPanel value={value} index={0}>
          <MoodCheckIn />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <StudyBreakGenerator />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <MotivationGenerator />
        </TabPanel>
      </Box>
    </Container>
  );
};

export default MentalHealthPage; 