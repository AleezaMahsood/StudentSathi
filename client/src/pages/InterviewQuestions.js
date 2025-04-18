import React, { useState } from 'react';
import axios from 'axios';
import { Box, Typography, TextField, Button, Select, MenuItem, FormControl, InputLabel, CircularProgress } from '@mui/material';

const InterviewQuestions = () => {
  const [jobDescription, setJobDescription] = useState('');
  const [difficulty, setDifficulty] = useState('easy');
  const [questionType, setQuestionType] = useState('technical');
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setQuestions([]);

    try {
      if (!jobDescription.trim()) {
        throw new Error('Please enter a job description');
      }

      const response = await axios.post('http://localhost:5000/api/interview-questions', {
        jobDescription,
        difficulty,
        questionType
      });

      if (response.data.error) {
        throw new Error(response.data.error);
      }

      setQuestions(response.data.questions);
    } catch (err) {
      console.error('Error details:', err);
      setError(err.response?.data?.details || err.message || 'Failed to generate questions. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Interview Question Generator
      </Typography>
      
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <TextField
          fullWidth
          multiline
          rows={6}
          label="Job Description"
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          required
          sx={{ mb: 3 }}
        />

        <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
          <FormControl fullWidth>
            <InputLabel>Difficulty Level</InputLabel>
            <Select
              value={difficulty}
              label="Difficulty Level"
              onChange={(e) => setDifficulty(e.target.value)}
            >
              <MenuItem value="easy">Easy</MenuItem>
              <MenuItem value="medium">Medium</MenuItem>
              <MenuItem value="hard">Hard</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>Question Type</InputLabel>
            <Select
              value={questionType}
              label="Question Type"
              onChange={(e) => setQuestionType(e.target.value)}
            >
              <MenuItem value="technical">Technical</MenuItem>
              <MenuItem value="behavioral">Behavioral</MenuItem>
              <MenuItem value="situational">Situational (STAR Method)</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Button
          type="submit"
          variant="contained"
          fullWidth
          disabled={loading}
          sx={{ mb: 3 }}
        >
          {loading ? <CircularProgress size={24} /> : 'Generate Questions'}
        </Button>

        {error && (
          <Typography color="error" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}

        {questions.length > 0 && (
          <Box>
            <Typography variant="h6" gutterBottom>
              Generated Questions:
            </Typography>
            {questions.map((question, index) => (
              <Box
                key={index}
                sx={{
                  p: 2,
                  mb: 2,
                  bgcolor: 'background.paper',
                  borderRadius: 1,
                  boxShadow: 1
                }}
              >
                <Typography>{question}</Typography>
              </Box>
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default InterviewQuestions;