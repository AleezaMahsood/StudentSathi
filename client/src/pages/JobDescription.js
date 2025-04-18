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
import axios from 'axios';

function JobDescription() {
  const [role, setRole] = useState('');
  const [experience, setExperience] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (!role || !experience) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:5000/api/generate-jd', {
        role,
        experience: parseInt(experience),
      });
      setJobDescription(response.data.jobDescription);
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred while generating the job description');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Job Description Generator
      </Typography>
      <Typography variant="body1" paragraph>
        Generate detailed job descriptions for any role by providing the position and required experience.
      </Typography>

      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Job Role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="e.g., Software Engineer"
              fullWidth
            />
            <TextField
              label="Years of Experience Required"
              type="number"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              inputProps={{ min: 0, max: 20 }}
              fullWidth
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : 'Generate Job Description'}
            </Button>
          </Box>
        </CardContent>
      </Card>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {jobDescription && (
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Generated Job Description
            </Typography>
            <Typography
              variant="body1"
              sx={{ whiteSpace: 'pre-line' }}
            >
              {jobDescription}
            </Typography>
          </CardContent>
        </Card>
      )}
    </Box>
  );
}

export default JobDescription; 