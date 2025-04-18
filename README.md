# Student Saathi - AI-Powered Career Assistant

Student Saathi is a comprehensive web application designed to assist students in their career development journey. It provides various AI-powered tools to help with CV analysis, interview preparation, cover letter generation, quiz creation, and mental health support.

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

## Project Structure


student-saathi/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/        # Page components
│   │   ├── App.js        # Main application component
│   │   └── index.js      # Entry point
│   └── package.json      # Frontend dependencies
│
├── server/                # Backend Node.js application
│   ├── server.js         # Main server file
│   └── package.json      # Backend dependencies
│
└── package.json          # Root project configuration


## Setup Instructions

1. Clone the repository:
bash
git clone https://github.com/yourusername/student-saathi.git
cd student-saathi


2. Install dependencies:
bash
npm run install-all


3. Set up environment variables:
   - Create a .env file in the server directory
   - Add your Cohere API key:
   
   COHERE_API_KEY=your_api_key_here
   

4. Start the development servers:
bash
npm start


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