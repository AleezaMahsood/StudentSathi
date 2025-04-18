# Student Sathi - AI-Powered Student's Career Assistant

Student Sathi is a comprehensive web application designed to assist students in their career development journey. It provides various AI-powered tools to help with CV analysis, interview preparation, cover letter generation, quiz creation, and mental health support.

## Features

### 1. CV Analysis
- Upload your CV in PDF format
- Get detailed feedback on strengths and areas for improvement
- Receive suggestions to make your CV stand out
- Identify missing elements in your CV

### 2. Interview Questions
- Generate job-specific interview questions
- Get detailed job descriptions for various roles
- Prepare for technical and behavioral interviews

### 3. Cover Letter Generator
- Create personalized cover letters
- Match your skills with job requirements
- Generate professional and compelling content
- Customize for specific companies and roles

### 4. Quiz Generator
- Create different types of quizzes:
  - Multiple Choice Questions
  - Fill in the Blanks
  - Short Answer Questions
- Upload study materials in PDF format
- Get instant quiz generation with answers and explanations

### 5. Mental Health Support
- Mood analysis and support
- Get empathetic responses to your concerns
- Receive encouraging guidance
- Access study break suggestions

## Tech Stack

### Frontend
- React.js
- Material-UI (MUI) for UI components
- React Router for navigation
- Axios for API calls
- Emotion for styling

### Backend
- Node.js
- Express.js
- Cohere AI for natural language processing
- PDF-parse for PDF text extraction
- Multer for file uploads

## Setup Instructions

1. Clone the repository:
bash
git clone https://github.com/AleezaMahsood/StudentSathi.git

2. Install dependencies:
`npm run install-all`


3. Set up environment variables:
   - Create a .env file in the server directory
   - Add your Cohere API key:
   
   COHERE_API_KEY=your_api_key_here
   

4. Start the development servers:
`npm start`

The application will be available at:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

## API Endpoints

- POST /api/analyze-cv - Analyze CV content
- POST /api/generate-jd - Generate job descriptions
- POST /api/generate-cover-letter - Create cover letters
- POST /api/generate-quiz - Generate quizzes
- POST /api/analyze-mood - Analyze mood and provide support

## Contributing

1. Fork the repository
2. Create your feature branch (git checkout -b feature/amazing-feature)
3. Commit your changes (git commit -m 'Add some amazing feature')
4. Push to the branch (git push origin feature/amazing-feature)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Cohere AI for providing the natural language processing capabilities
- Material-UI for the beautiful UI components
- The open-source community for various tools and libraries used in this project

## Achievements

### Gen AI Creathon Hackathon Winner- TECHFEST 2025

We are proud to announce that Student Sathi was developed as part of the Gen AI Creathon Hackathon, organized by AI Alliance during TECHFEST 2025 at NED University. This event was a free-form innovation challenge that encouraged participants to experiment with generative AI technologies to create something creative, useful, or surprising.

Our team participated in this hackathon and emerged victorious, showcasing the unique capabilities of Student Sathi. The application was judged on its novelty, impact, relevance, and feasibility, and it stood out among numerous entries for its innovative approach to assisting students in their career development journey.

The hackathon allowed us to push the boundaries of generative AI and create a product that not only solves real-world problems but also supports students in a meaningful way.