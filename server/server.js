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

// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
}); 