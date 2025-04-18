import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Typography,
  Alert,
} from '@mui/material';
import { Upload as UploadIcon } from '@mui/icons-material';
import axios from 'axios';

function CVAnalysis() {
  const [file, setFile] = useState(null);
  const [analysis, setAnalysis] = useState('');
  const [loading, setLoading] = useState(false);
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

  const handleSubmit = async () => {
    if (!file) {
      setError('Please select a file first');
      return;
    }

    setLoading(true);
    setError('');

    const formData = new FormData();
    formData.append('cv', file);

    try {
      const response = await axios.post('http://localhost:5000/api/analyze-cv', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setAnalysis(response.data.analysis);
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred while analyzing the CV');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        CV Analysis
      </Typography>
      <Typography variant="body1" paragraph>
        Upload your CV in PDF format to get detailed feedback and improvement suggestions.
      </Typography>

      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Button
              variant="contained"
              component="label"
              startIcon={<UploadIcon />}
            >
              Upload CV
              <input
                type="file"
                hidden
                accept=".pdf"
                onChange={handleFileChange}
              />
            </Button>
            {file && (
              <Typography variant="body2">
                Selected file: {file.name}
              </Typography>
            )}
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              disabled={!file || loading}
            >
              {loading ? <CircularProgress size={24} /> : 'Analyze CV'}
            </Button>
          </Box>
        </CardContent>
      </Card>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {analysis && (
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Analysis Results
            </Typography>
            <Typography
              variant="body1"
              sx={{ whiteSpace: 'pre-line' }}
            >
              {analysis}
            </Typography>
          </CardContent>
        </Card>
      )}
    </Box>
  );
}

export default CVAnalysis; 