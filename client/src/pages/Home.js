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
    // {
    //   title: 'Job Description Generator',
    //   description: 'Generate comprehensive job descriptions for any role by specifying the position and required experience.',
    //   icon: <WorkIcon sx={{ fontSize: 60, color: '#2c3e50' }} />,
    //   path: '/job-description',
    // },
    {
      title: 'Cover Letter Creator',
      description: 'Create personalized cover letters by combining your CV with job requirements and company information.',
      icon: <EmailIcon sx={{ fontSize: 60, color: '#2c3e50' }} />,
      path: '/cover-letter',
    },
    {
      title: 'Interview Questions',
      description: 'Prepare for your interviews with a curated list of common questions and expert tips.',
      icon: <WorkIcon sx={{ fontSize: 60, color: '#2c3e50' }} />,
      path: '/interview-questions',
    },
    {
      title: 'Mental Health',
      description: 'Access resources and tools to help manage stress and maintain mental well-being.',
      icon: <EmailIcon sx={{ fontSize: 60, color: '#2c3e50' }} />,
      path: '/mental-health',
    },
    {
      title: 'Quiz Generator',
      description: 'Create and take quizzes to test your knowledge on various subjects.',
      icon: <DescriptionIcon sx={{ fontSize: 60, color: '#2c3e50' }} />,
      path: '/quiz-generator',
    },
  ];

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', mt: 4 }}>
      <Typography variant="h3" gutterBottom align="center">
        Welcome to Student Sathi
      </Typography>
      <Typography variant="h5" paragraph align="center" color="text.secondary">
        Your AI-powered career assistant
      </Typography>

      <Grid container spacing={4} sx={{ mt: 2, justifyContent: 'center', alignItems: 'center' }}>
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
          Student Sathi leverages cutting-edge AI technology to assist you in crafting professional documents and receiving insightful feedback for your career development. 
          Whether you're looking to analyze your CV, generate job descriptions, create cover letters, prepare for interviews, take quizzes, or access mental health resources, our tools are designed to streamline the process. 
          Simply select a feature, input the necessary details, and let our AI guide you in producing high-quality career documents and resources tailored to your needs.
        </Typography>
      </Box>
    </Box>
  );
}

export default Home; 