import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  TextField,
  Typography,
  Alert,
} from '@mui/material';
import { Upload as UploadIcon } from '@mui/icons-material';
import axios from 'axios';

function CoverLetter() {
  const [file, setFile] = useState(null);
  const [jobDescription, setJobDescription] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [coverLetter, setCoverLetter] = useState('');
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
    if (!file || !jobDescription || !companyName) {
      setError('Please fill in all fields and upload your CV');
      return;
    }

    setLoading(true);
    setError('');

    const formData = new FormData();
    formData.append('cv', file);
    formData.append('jobDescription', jobDescription);
    formData.append('companyName', companyName);

    try {
      const response = await axios.post('http://localhost:5000/api/generate-cover-letter', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setCoverLetter(response.data.coverLetter);
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred while generating the cover letter');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Cover Letter Generator
      </Typography>
      <Typography variant="body1" paragraph>
        Generate a personalized cover letter by uploading your CV and providing the job details.
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
            <TextField
              label="Job Description"
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              multiline
              rows={4}
              placeholder="Paste the job description here..."
              fullWidth
            />
            <TextField
              label="Company Name"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="e.g., Google"
              fullWidth
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : 'Generate Cover Letter'}
            </Button>
          </Box>
        </CardContent>
      </Card>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {coverLetter && (
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Generated Cover Letter
            </Typography>
            <Typography
              variant="body1"
              sx={{ whiteSpace: 'pre-line' }}
            >
              {coverLetter}
            </Typography>
          </CardContent>
        </Card>
      )}
    </Box>
  );
}

export default CoverLetter; 