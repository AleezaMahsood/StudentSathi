const express = require('express');
const cors = require('cors');
const multer = require('multer');
const pdfParse = require('pdf-parse');
const cohere = require('cohere-ai');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Cohere
cohere.init(process.env.COHERE_API_KEY);

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Helper function to extract text from PDF
async function extractTextFromPDF(buffer) {
    try {
        const data = await pdfParse(buffer);
        return data.text;
    } catch (error) {
        throw new Error('Error extracting text from PDF');
    }
}

// CV Analysis endpoint
app.post('/api/analyze-cv', upload.single('cv'), async (req, res) => {
    try {
        const cvText = await extractTextFromPDF(req.file.buffer);
        
        const prompt = `Analyze this CV and provide specific feedback on:
        1. Strengths
        2. Areas for improvement
        3. Missing elements
        4. Suggestions to make it stand out
        
        CV Content:
        ${cvText}
        
        Please provide detailed, constructive feedback.`;

        const response = await cohere.generate({
            prompt: prompt,
            max_tokens: 500,
            temperature: 0.7,
            k: 0,
            stop_sequences: [],
            return_likelihoods: 'NONE'
        });

        res.json({ analysis: response.body.generations[0].text });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Job Description Generator endpoint
app.post('/api/generate-jd', async (req, res) => {
    try {
        const { role, experience } = req.body;
        
        const prompt = `Generate a detailed job description for a ${role} position requiring ${experience} years of experience.
        Include:
        1. Job title and overview
        2. Key responsibilities
        3. Required qualifications
        4. Preferred skills
        5. Company culture and benefits`;

        const response = await cohere.generate({
            prompt: prompt,
            max_tokens: 500,
            temperature: 0.7,
            k: 0,
            stop_sequences: [],
            return_likelihoods: 'NONE'
        });

        res.json({ jobDescription: response.body.generations[0].text });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Cover Letter Generator endpoint
app.post('/api/generate-cover-letter', upload.single('cv'), async (req, res) => {
    try {
        const cvText = await extractTextFromPDF(req.file.buffer);
        const { jobDescription, companyName } = req.body;
        
        const prompt = `Generate a professional cover letter based on the following information:
        
        CV Content:
        ${cvText}
        
        Job Description:
        ${jobDescription}
        
        Company Name: ${companyName}
        
        Create a compelling cover letter that:
        1. Addresses the specific job requirements
        2. Highlights relevant experience
        3. Shows enthusiasm for the role
        4. Maintains a professional tone`;

        const response = await cohere.generate({
            prompt: prompt,
            max_tokens: 800,
            temperature: 0.7,
            k: 0,
            stop_sequences: [],
            return_likelihoods: 'NONE'
        });

        res.json({ coverLetter: response.body.generations[0].text });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Quiz Generator endpoint
app.post('/api/generate-quiz', upload.single('notes'), async (req, res) => {
    try {
        const notesText = await extractTextFromPDF(req.file.buffer);
        const { quizType } = req.body;
        
        const systemPrompt = `You are a quiz generator that ONLY outputs valid JSON arrays. 
        Your response must start with '[' and end with ']'.
        Do not include any other text or explanation.`;
        
        let prompt = '';
        switch (quizType) {
            case 'multiple-choice':
                prompt = `${systemPrompt}
                Generate 5 multiple choice questions based on these notes:
                ${notesText}
                
                Each question must follow this EXACT format:
                {
                  "question": "Write the question here?",
                  "options": ["First option", "Second option", "Third option", "Fourth option"],
                  "answer": "The correct option text",
                  "explanation": "Brief explanation of the answer"
                }`;
                break;
            case 'fill-blanks':
                prompt = `${systemPrompt}
                Generate 5 fill-in-the-blank questions based on these notes:
                ${notesText}
                
                Each question must follow this EXACT format:
                {
                  "question": "Complete sentence with _____ for the blank",
                  "answer": "The word that goes in the blank",
                  "explanation": "Brief explanation of why this is correct"
                }`;
                break;
            case 'short-answer':
                prompt = `${systemPrompt}
                Generate 5 short answer questions based on these notes:
                ${notesText}
                
                Each question must follow this EXACT format:
                {
                  "question": "Write the question here?",
                  "answer": "The correct answer",
                  "explanation": "Brief explanation of the answer"
                }`;
                break;
            default:
                throw new Error('Invalid quiz type');
        }

        const response = await cohere.generate({
            prompt: prompt,
            max_tokens: 1000,
            temperature: 0.7,
            k: 0,
            stop_sequences: ['\n\n'],
            return_likelihoods: 'NONE'
        });

        // Clean and parse the response
        let responseText = response.body.generations[0].text.trim();
        
        // Remove any markdown code blocks or extra text
        responseText = responseText.replace(/```json\n?|\n?```/g, '').trim();
        
        // Ensure the response starts with [ and ends with ]
        if (!responseText.startsWith('[') || !responseText.endsWith(']')) {
            console.error('Invalid response format:', responseText);
            throw new Error('Invalid response format from AI');
        }

        // Parse the JSON
        const questions = JSON.parse(responseText);

        // Validate the questions array
        if (!Array.isArray(questions) || questions.length === 0) {
            throw new Error('Invalid questions format: expected non-empty array');
        }

        res.json({ questions });
    } catch (error) {
        console.error('Quiz generation error:', error);
        res.status(500).json({ error: error.message });
    }
});

// Mood Analysis endpoint
app.post('/api/analyze-mood', async (req, res) => {
    try {
        const { text } = req.body;
        
        const prompt = `As an empathetic AI counselor, analyze this message and provide a supportive, encouraging response. Consider the emotional state and offer appropriate guidance or comfort.

        User's message: ${text}

        Respond in a warm, understanding tone and keep the response concise (2-3 sentences).`;

        const response = await cohere.generate({
            prompt: prompt,
            max_tokens: 150,
            temperature: 0.7,
            k: 0,
            stop_sequences: [],
            return_likelihoods: 'NONE'
        });

        res.json({ response: response.body.generations[0].text.trim() });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Study Break Suggestion endpoint
app.post('/api/generate-break', async (req, res) => {
    try {
        const prompt = `Generate a short, practical mindfulness or study break suggestion that:
        1. Takes 2-5 minutes
        2. Helps reduce stress and improve focus
        3. Can be done at a study desk
        4. Is specific and actionable
        
        Format the response as a single paragraph (2-3 sentences).`;

        const response = await cohere.generate({
            prompt: prompt,
            max_tokens: 100,
            temperature: 0.7,
            k: 0,
            stop_sequences: [],
            return_likelihoods: 'NONE'
        });

        res.json({ suggestion: response.body.generations[0].text.trim() });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Motivation Generator endpoint
app.post('/api/generate-motivation', async (req, res) => {
    try {
        const { context } = req.body;
        
        const prompt = `Generate a personalized motivational message for a student with this context: ${context || 'studying and working towards their goals'}

        The message should be:
        1. Personal and specific to their context
        2. Encouraging and positive
        3. Action-oriented
        4. Concise (2-3 sentences)

        Make it sound natural and inspiring, not cliché.`;

        const response = await cohere.generate({
            prompt: prompt,
            max_tokens: 150,
            temperature: 0.7,
            k: 0,
            stop_sequences: [],
            return_likelihoods: 'NONE'
        });

        res.json({ message: response.body.generations[0].text.trim() });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
}); 