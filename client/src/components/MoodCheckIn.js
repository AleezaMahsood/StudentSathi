import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Paper,
  Typography,
  Card,
  CardContent,
  Avatar,
  Fade,
  CircularProgress,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import SendIcon from '@mui/icons-material/Send';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import MoodIcon from '@mui/icons-material/Mood';

const MessageBubble = styled(Paper)(({ theme, isBot }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
  maxWidth: '80%',
  borderRadius: theme.spacing(2),
  backgroundColor: isBot ? theme.palette.primary.light : theme.palette.grey[100],
  color: isBot ? theme.palette.primary.contrastText : theme.palette.text.primary,
  alignSelf: isBot ? 'flex-start' : 'flex-end',
  position: 'relative',
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    [isBot ? 'left' : 'right']: -8,
    width: 0,
    height: 0,
    borderStyle: 'solid',
    borderWidth: '8px 8px 0 8px',
    borderColor: `${isBot ? theme.palette.primary.light : theme.palette.grey[100]} transparent transparent transparent`,
  },
}));

const MoodCheckIn = () => {
  const [userInput, setUserInput] = useState('');
  const [messages, setMessages] = useState([
    {
      text: "Hi! How are you feeling today? Feel free to share your thoughts with me.",
      isBot: true,
    },
  ]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    const userMessage = userInput.trim();
    setUserInput('');
    setMessages(prev => [...prev, { text: userMessage, isBot: false }]);
    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/analyze-mood', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: userMessage }),
      });

      const data = await response.json();
      
      setMessages(prev => [...prev, { text: data.response, isBot: true }]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, {
        text: "I'm having trouble understanding right now. Can you try again?",
        isBot: true,
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
            <SmartToyIcon />
          </Avatar>
          <Typography variant="h6">Mental Health Check-In</Typography>
        </Box>

        <Box sx={{ 
          height: '400px', 
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          mb: 2,
          p: 2,
          backgroundColor: '#f5f5f5',
          borderRadius: 1,
        }}>
          {messages.map((message, index) => (
            <Fade in={true} key={index}>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                {message.isBot && (
                  <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
                    <SmartToyIcon sx={{ fontSize: 18 }} />
                  </Avatar>
                )}
                <MessageBubble isBot={message.isBot} elevation={1}>
                  <Typography variant="body1">{message.text}</Typography>
                </MessageBubble>
                {!message.isBot && (
                  <Avatar sx={{ bgcolor: 'secondary.main', width: 32, height: 32 }}>
                    <MoodIcon sx={{ fontSize: 18 }} />
                  </Avatar>
                )}
              </Box>
            </Fade>
          ))}
          {loading && (
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <CircularProgress size={24} />
            </Box>
          )}
        </Box>

        <form onSubmit={handleSubmit}>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Share how you're feeling..."
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              disabled={loading}
            />
            <Button
              type="submit"
              variant="contained"
              disabled={!userInput.trim() || loading}
              endIcon={<SendIcon />}
            >
              Send
            </Button>
          </Box>
        </form>
      </CardContent>
    </Card>
  );
};

export default MoodCheckIn; 