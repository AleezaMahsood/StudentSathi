import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  TextField,
  IconButton,
  Paper,
  Fade,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import FlipIcon from '@mui/icons-material/Flip';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

const FlashCard = styled(Paper)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  minHeight: 400,
  perspective: '1000px',
  borderRadius: theme.shape.borderRadius * 2,
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[3],
  transition: 'transform 0.6s, box-shadow 0.3s',
  '&:hover': {
    boxShadow: theme.shadows[6],
  },
}));

const CardInner = styled(Box)(({ flipped }) => ({
  position: 'relative',
  width: '100%',
  height: '100%',
  minHeight: 400,
  transformStyle: 'preserve-3d',
  transition: 'transform 0.6s',
  transform: flipped ? 'rotateY(180deg)' : 'rotateY(0)',
}));

const CardSide = styled(Box)({
  position: 'absolute',
  width: '100%',
  height: '100%',
  backfaceVisibility: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '2rem',
});

const CardFront = styled(CardSide)({
  transform: 'rotateY(0)',
});

const CardBack = styled(CardSide)({
  transform: 'rotateY(180deg)',
});

const ProgressBar = styled(Box)(({ theme, progress }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '4px',
  backgroundColor: theme.palette.grey[200],
  '&::after': {
    content: '""',
    position: 'absolute',
    height: '100%',
    width: `${progress}%`,
    backgroundColor: theme.palette.primary.main,
    transition: 'width 0.3s ease',
  },
}));

const FlashcardQuiz = ({ questions }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [userAnswer, setUserAnswer] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsFlipped(false);
      setUserAnswer('');
      setShowResult(false);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setIsFlipped(false);
      setUserAnswer('');
      setShowResult(false);
    }
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleAnswerSubmit = () => {
    const isCorrect = currentQuestion.options
      ? userAnswer === currentQuestion.answer
      : userAnswer.toLowerCase().trim() === currentQuestion.answer.toLowerCase().trim();
    
    if (isCorrect) {
      setScore(score + 1);
    }
    setShowResult(true);
    setTimeout(() => setIsFlipped(true), 500);
  };

  const renderQuestion = () => {
    if (currentQuestion.options) {
      return (
        <FormControl component="fieldset" sx={{ width: '100%' }}>
          <RadioGroup
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
          >
            {currentQuestion.options.map((option, index) => (
              <FormControlLabel
                key={index}
                value={option}
                control={<Radio />}
                label={option}
                disabled={showResult}
              />
            ))}
          </RadioGroup>
        </FormControl>
      );
    } else {
      return (
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Type your answer here"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          disabled={showResult}
        />
      );
    }
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', mt: 4, px: 2 }}>
      <ProgressBar progress={progress} />
      
      <Typography variant="h6" gutterBottom align="center" sx={{ mb: 3 }}>
        Question {currentIndex + 1} of {questions.length}
      </Typography>

      <FlashCard elevation={3}>
        <CardInner flipped={isFlipped}>
          <CardFront>
            <Typography variant="h5" gutterBottom align="center">
              {currentQuestion.question}
            </Typography>
            <Box sx={{ width: '100%', mt: 4 }}>
              {renderQuestion()}
            </Box>
            {!showResult && (
              <Button
                variant="contained"
                color="primary"
                onClick={handleAnswerSubmit}
                disabled={!userAnswer}
                sx={{ mt: 4 }}
              >
                Check Answer
              </Button>
            )}
            {showResult && (
              <Fade in={showResult}>
                <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                  {userAnswer.toLowerCase().trim() === currentQuestion.answer.toLowerCase().trim() ? (
                    <>
                      <CheckCircleIcon color="success" />
                      <Typography color="success.main">Correct!</Typography>
                    </>
                  ) : (
                    <>
                      <CancelIcon color="error" />
                      <Typography color="error.main">Incorrect</Typography>
                    </>
                  )}
                </Box>
              </Fade>
            )}
          </CardFront>
          <CardBack>
            <Typography variant="h6" gutterBottom color="primary">
              Answer:
            </Typography>
            <Typography variant="body1" gutterBottom align="center">
              {currentQuestion.answer}
            </Typography>
            {currentQuestion.explanation && (
              <>
                <Typography variant="h6" gutterBottom color="primary" sx={{ mt: 3 }}>
                  Explanation:
                </Typography>
                <Typography variant="body1" align="center">
                  {currentQuestion.explanation}
                </Typography>
              </>
            )}
          </CardBack>
        </CardInner>
      </FlashCard>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
        <IconButton onClick={handlePrevious} disabled={currentIndex === 0}>
          <NavigateBeforeIcon />
        </IconButton>
        <IconButton onClick={handleFlip}>
          <FlipIcon />
        </IconButton>
        <IconButton onClick={handleNext} disabled={currentIndex === questions.length - 1}>
          <NavigateNextIcon />
        </IconButton>
      </Box>

      <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 2 }}>
        Score: {score} / {questions.length}
      </Typography>
    </Box>
  );
};

export default FlashcardQuiz; 