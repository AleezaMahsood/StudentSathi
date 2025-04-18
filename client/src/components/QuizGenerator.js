import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import FlashcardQuiz from './FlashcardQuiz';

const QuizGenerator = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [quizType, setQuizType] = useState('multiple-choice');
  const [questions, setQuestions] = useState(null);
  const [error, setError] = useState('');

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
      setError('');
    } else {
      setError('Please upload a PDF file');
      setFile(null);
    }
  };

  const generateQuiz = async () => {
    if (!file) {
      setError('Please upload a PDF file first');
      return;
    }

    setLoading(true);
    setError('');

    const formData = new FormData();
    formData.append('notes', file);
    formData.append('quizType', quizType);

    try {
      const response = await fetch('http://localhost:5000/api/generate-quiz', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to generate quiz');
      }

      const data = await response.json();
      setQuestions(data.questions);
    } catch (err) {
      setError('Error generating quiz. Please try again.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFile(null);
    setQuestions(null);
    setError('');
  };

  if (questions) {
    return (
      <Box>
        <Button 
          variant="outlined" 
          onClick={handleReset}
          sx={{ mb: 2, ml: 2 }}
        >
          Generate New Quiz
        </Button>
        <FlashcardQuiz questions={questions} />
      </Box>
    );
  }

  return (
    <Card sx={{ maxWidth: 800, mx: 'auto', mt: 4 }}>
      <CardContent>
        <Typography variant="h5" component="h2" gutterBottom>
          Quiz Generator
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Upload your study notes and let AI generate practice questions
        </Typography>

        <Box sx={{ mt: 3 }}>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Quiz Type</InputLabel>
            <Select
              value={quizType}
              label="Quiz Type"
              onChange={(e) => setQuizType(e.target.value)}
            >
              <MenuItem value="multiple-choice">Multiple Choice</MenuItem>
              <MenuItem value="fill-blanks">Fill in the Blanks</MenuItem>
              <MenuItem value="short-answer">Short Answer</MenuItem>
            </Select>
          </FormControl>

          <Button
            component="label"
            variant="contained"
            startIcon={<CloudUploadIcon />}
            sx={{ mb: 2 }}
            fullWidth
          >
            Upload Notes
            <input
              type="file"
              hidden
              accept=".pdf"
              onChange={handleFileChange}
            />
          </Button>

          {file && (
            <Typography variant="body2" sx={{ mb: 2 }}>
              Selected file: {file.name}
            </Typography>
          )}

          {error && (
            <Typography color="error" sx={{ mb: 2 }}>
              {error}
            </Typography>
          )}

          <Button
            variant="contained"
            color="primary"
            onClick={generateQuiz}
            disabled={!file || loading}
            fullWidth
          >
            {loading ? <CircularProgress size={24} /> : 'Generate Quiz'}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default QuizGenerator; 