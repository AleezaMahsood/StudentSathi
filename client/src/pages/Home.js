import React from 'react';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  Button,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {
  Description as DescriptionIcon,
  Work as WorkIcon,
  Email as EmailIcon,
} from '@mui/icons-material';

function Home() {
  const navigate = useNavigate();

  const features = [
    {
      title: 'CV Analysis',
      description: 'Upload your CV to get detailed feedback on strengths, areas for improvement, and suggestions to make it stand out.',
      icon: <DescriptionIcon sx={{ fontSize: 60, color: '#2c3e50' }} />,
      path: '/cv-analysis',
    },
    {
      title: 'Job Description Generator',
      description: 'Generate comprehensive job descriptions for any role by specifying the position and required experience.',
      icon: <WorkIcon sx={{ fontSize: 60, color: '#2c3e50' }} />,
      path: '/job-description',
    },
    {
      title: 'Cover Letter Creator',
      description: 'Create personalized cover letters by combining your CV with job requirements and company information.',
      icon: <EmailIcon sx={{ fontSize: 60, color: '#2c3e50' }} />,
      path: '/cover-letter',
    },
  ];

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', mt: 4 }}>
      <Typography variant="h3" gutterBottom align="center">
        Welcome to Student Saathi
      </Typography>
      <Typography variant="h5" paragraph align="center" color="text.secondary">
        Your AI-powered career assistant
      </Typography>

      <Grid container spacing={4} sx={{ mt: 2 }}>
        {features.map((feature) => (
          <Grid item xs={12} md={4} key={feature.title}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'scale(1.02)',
                },
              }}
            >
              <CardMedia
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  pt: 3,
                }}
              >
                {feature.icon}
              </CardMedia>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2" align="center">
                  {feature.title}
                </Typography>
                <Typography paragraph color="text.secondary" align="center">
                  {feature.description}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => navigate(feature.path)}
                  >
                    Try Now
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ mt: 6, textAlign: 'center' }}>
        <Typography variant="h5" gutterBottom>
          How It Works
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Student Saathi uses advanced AI to help you create professional documents and get valuable feedback for your career journey.
          Simply choose a tool, provide the required information, and let our AI assist you in creating high-quality career documents.
        </Typography>
      </Box>
    </Box>
  );
}

export default Home; 