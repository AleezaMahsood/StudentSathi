import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  TextField,
  CircularProgress,
  Chip,
  Collapse,
  IconButton,
  Paper,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import RefreshIcon from '@mui/icons-material/Refresh';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import WorkIcon from '@mui/icons-material/Work';
import SchoolIcon from '@mui/icons-material/School';
import CloseIcon from '@mui/icons-material/Close';

const MotivationCard = styled(Paper)(({ theme }) => ({
  position: 'relative',
  padding: theme.spacing(3),
  marginTop: theme.spacing(3),
  background: `linear-gradient(135deg, ${theme.palette.primary.light}, ${theme.palette.primary.main})`,
  color: theme.palette.primary.contrastText,
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: theme.shadows[4],
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[8],
  },
}));

const ContextChip = styled(Chip)(({ theme }) => ({
  margin: theme.spacing(0.5),
  backgroundColor: 'rgba(255, 255, 255, 0.2)',
  color: theme.palette.primary.contrastText,
  '& .MuiChip-icon': {
    color: theme.palette.primary.contrastText,
  },
}));

const MotivationGenerator = () => {
  const [context, setContext] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [showContext, setShowContext] = useState(false);

  const generateMotivation = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/generate-motivation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ context }),
      });

      const data = await response.json();
      setMessage(data.message);
    } catch (error) {
      console.error('Error:', error);
      setMessage("You've got this! Every small step counts towards your bigger goals.");
    } finally {
      setLoading(false);
    }
  };

  const predefinedContexts = [
    { label: 'Study Goals', icon: <SchoolIcon />, text: 'Preparing for upcoming exams' },
    { label: 'Career Goals', icon: <WorkIcon />, text: 'Looking for internship opportunities' },
    { label: 'Learning', icon: <LocalLibraryIcon />, text: 'Learning new programming skills' },
  ];

  const handleContextSelect = (text) => {
    setContext(text);
    setShowContext(false);
  };

  return (
    <Card sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <EmojiObjectsIcon sx={{ fontSize: 32, color: 'primary.main', mr: 2 }} />
          <Typography variant="h6">Personalized Motivation</Typography>
        </Box>

        <Button
          variant="outlined"
          color="primary"
          onClick={() => setShowContext(!showContext)}
          fullWidth
          sx={{ mb: 2 }}
        >
          {showContext ? 'Hide Context Options' : 'Choose Context'}
        </Button>

        <Collapse in={showContext}>
          <Box sx={{ mb: 2 }}>
            {predefinedContexts.map((item, index) => (
              <Button
                key={index}
                variant="outlined"
                startIcon={item.icon}
                onClick={() => handleContextSelect(item.text)}
                sx={{ mr: 1, mb: 1 }}
              >
                {item.label}
              </Button>
            ))}
          </Box>
        </Collapse>

        <TextField
          fullWidth
          multiline
          rows={2}
          variant="outlined"
          placeholder="What's your current goal or challenge? (Optional)"
          value={context}
          onChange={(e) => setContext(e.target.value)}
          sx={{ mb: 2 }}
        />

        <Button
          variant="contained"
          color="primary"
          onClick={generateMotivation}
          disabled={loading}
          fullWidth
        >
          Motivate Me
        </Button>

        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 3 }}>
            <CircularProgress />
          </Box>
        )}

        {message && !loading && (
          <MotivationCard elevation={3}>
            <IconButton
              size="small"
              sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                color: 'rgba(255, 255, 255, 0.7)',
              }}
              onClick={() => setMessage(null)}
            >
              <CloseIcon />
            </IconButton>

            <Typography variant="body1" sx={{ mb: 2, fontSize: '1.1rem' }}>
              {message}
            </Typography>

            {context && (
              <Box sx={{ mt: 2 }}>
                <ContextChip
                  icon={<LocalLibraryIcon />}
                  label={`Context: ${context}`}
                  size="small"
                />
              </Box>
            )}

            <Button
              variant="text"
              startIcon={<RefreshIcon />}
              onClick={generateMotivation}
              sx={{
                color: 'inherit',
                mt: 2,
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                },
              }}
            >
              Generate Another
            </Button>
          </MotivationCard>
        )}
      </CardContent>
    </Card>
  );
};

export default MotivationGenerator; 