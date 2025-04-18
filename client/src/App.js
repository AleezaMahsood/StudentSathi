import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Layout from './components/Layout';
import CVAnalysis from './pages/CVAnalysis';
import JobDescription from './pages/JobDescription';
import QuizGenerator from './components/QuizGenerator'
import CoverLetter from './pages/CoverLetter';
import Home from './pages/Home';
import MentalHealthPage from './pages/MentalHealthPage';
import InterviewQuestions from './pages/InterviewQuestions';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2c3e50',
    },
    secondary: {
      main: '#3498db',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="cv-analysis" element={<CVAnalysis />} />
            <Route path="job-description" element={<JobDescription />} />
            <Route path="cover-letter" element={<CoverLetter />} />
            <Route path="quiz-generator" element={<QuizGenerator />} />
            <Route path="mental-health" element={<MentalHealthPage />} />
            <Route path="interview-questions" element={<InterviewQuestions />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App; 