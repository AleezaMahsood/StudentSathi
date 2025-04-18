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
  Stack,
  Alert,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const AnswerBox = styled(Box)(({ theme, status }) => ({
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  marginTop: theme.spacing(2),
  backgroundColor: status === 'correct' ? '#e8f5e9' : status === 'incorrect' ? '#ffebee' : 'transparent',
  border: `1px solid ${status === 'correct' ? '#66bb6a' : status === 'incorrect' ? '#ef5350' : 'transparent'}`,
}));

const QuizTest = ({ questions }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showAnswer, setShowAnswer] = useState(false);

  const handleAnswerSelect = (answer) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestion]: answer,
    });
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setShowAnswer(false);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setShowAnswer(false);
    }
  };

  const handleSubmitAnswer = () => {
    setShowAnswer(true);
  };

  const isAnswerCorrect = () => {
    const currentAnswer = selectedAnswers[currentQuestion];
    if (!currentAnswer) return null;
    
    if (questions[currentQuestion].options) {
      // For multiple choice questions
      return currentAnswer === questions[currentQuestion].answer;
    } else {
      // For fill in the blanks and short answer questions
      return currentAnswer.toLowerCase().trim() === questions[currentQuestion].answer.toLowerCase().trim();
    }
  };

  const renderQuestion = () => {
    const question = questions[currentQuestion];
    const isMultipleChoice = Boolean(question.options);

    return (
      <Box>
        <Typography variant="h6" gutterBottom>
          Question {currentQuestion + 1} of {questions.length}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {question.question}
        </Typography>

        <AnswerBox status={showAnswer ? (isAnswerCorrect() ? 'correct' : 'incorrect') : null}>
          {isMultipleChoice ? (
            <FormControl component="fieldset">
              <RadioGroup
                value={selectedAnswers[currentQuestion] || ''}
                onChange={(e) => handleAnswerSelect(e.target.value)}
              >
                {question.options.map((option, index) => (
                  <FormControlLabel
                    key={index}
                    value={String.fromCharCode(65 + index)}
                    control={<Radio />}
                    label={option}
                    disabled={showAnswer}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          ) : (
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Type your answer here"
              value={selectedAnswers[currentQuestion] || ''}
              onChange={(e) => handleAnswerSelect(e.target.value)}
              disabled={showAnswer}
            />
          )}

          {showAnswer && (
            <Box sx={{ mt: 2 }}>
              {isAnswerCorrect() ? (
                <Alert icon={<CheckCircleOutlineIcon />} severity="success">
                  Correct!
                </Alert>
              ) : (
                <Alert icon={<ErrorOutlineIcon />} severity="error">
                  Incorrect. The correct answer is: {question.answer}
                </Alert>
              )}
            </Box>
          )}
        </AnswerBox>
      </Box>
    );
  };

  return (
    <Card sx={{ maxWidth: 800, mx: 'auto', mt: 4 }}>
      <CardContent>
        {renderQuestion()}

        <Stack direction="row" spacing={2} sx={{ mt: 3 }} justifyContent="space-between">
          <Button
            variant="outlined"
            startIcon={<NavigateBeforeIcon />}
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
          >
            Previous
          </Button>
          
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmitAnswer}
            disabled={!selectedAnswers[currentQuestion] || showAnswer}
          >
            Check Answer
          </Button>

          <Button
            variant="outlined"
            endIcon={<NavigateNextIcon />}
            onClick={handleNext}
            disabled={currentQuestion === questions.length - 1}
          >
            Next
          </Button>
        </Stack>

        <Box sx={{ mt: 3 }}>
          <Typography variant="body2" color="text.secondary">
            Progress: {currentQuestion + 1} / {questions.length} questions
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default QuizTest; 