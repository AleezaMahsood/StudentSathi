import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  Modal,
  Fade,
  CircularProgress,
  IconButton,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import RefreshIcon from '@mui/icons-material/Refresh';
import TimerIcon from '@mui/icons-material/Timer';
import SpaIcon from '@mui/icons-material/Spa';
import CloseIcon from '@mui/icons-material/Close';

const StyledModal = styled(Modal)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const ModalContent = styled(Card)(({ theme }) => ({
  position: 'relative',
  maxWidth: 400,
  margin: theme.spacing(2),
  padding: theme.spacing(3),
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: theme.shadows[5],
  outline: 'none',
}));

const StudyBreakGenerator = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [suggestion, setSuggestion] = useState(null);

  const handleOpen = async () => {
    setOpen(true);
    await generateSuggestion();
  };

  const handleClose = () => {
    setOpen(false);
    setSuggestion(null);
  };

  const generateSuggestion = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/generate-break', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      setSuggestion(data.suggestion);
    } catch (error) {
      console.error('Error:', error);
      setSuggestion('Take a 5-minute mindfulness break and focus on your breathing.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <SpaIcon sx={{ fontSize: 32, color: 'primary.main', mr: 2 }} />
          <Typography variant="h6">Study Break Suggestions</Typography>
        </Box>

        <Typography variant="body1" color="text.secondary" gutterBottom>
          Feeling overwhelmed? Take a mindful break to recharge your energy.
        </Typography>

        <Button
          variant="contained"
          color="primary"
          startIcon={<TimerIcon />}
          onClick={handleOpen}
          fullWidth
          sx={{ mt: 2 }}
        >
          Need a Break?
        </Button>

        <StyledModal
          open={open}
          onClose={handleClose}
          closeAfterTransition
        >
          <Fade in={open}>
            <ModalContent>
              <IconButton
                sx={{
                  position: 'absolute',
                  right: 8,
                  top: 8,
                }}
                onClick={handleClose}
              >
                <CloseIcon />
              </IconButton>

              <Box sx={{ textAlign: 'center', py: 2 }}>
                <SpaIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
                <Typography variant="h6" gutterBottom>
                  Take a Mindful Break
                </Typography>

                {loading ? (
                  <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
                    <CircularProgress />
                  </Box>
                ) : (
                  <Box>
                    <Typography variant="body1" sx={{ my: 3 }}>
                      {suggestion}
                    </Typography>
                    <Button
                      variant="outlined"
                      startIcon={<RefreshIcon />}
                      onClick={generateSuggestion}
                      sx={{ mt: 2 }}
                    >
                      Generate Another
                    </Button>
                  </Box>
                )}
              </Box>
            </ModalContent>
          </Fade>
        </StyledModal>
      </CardContent>
    </Card>
  );
};

export default StudyBreakGenerator; 