# Student Saathi - Career Assistant

A Streamlit application that helps students with their career development by providing CV analysis, job description generation, and cover letter creation using Cohere's AI.

## Features

- **CV Analysis**: Upload your CV and get detailed feedback on strengths, areas for improvement, and suggestions to make it stand out
- **Job Description Generator**: Generate detailed job descriptions for various roles and experience levels
- **Cover Letter Creator**: Create customized cover letters based on your CV and job requirements

## Setup

1. Clone this repository
2. Install the required dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Create a `.env` file in the root directory and add your Cohere API key:
   ```
   COHERE_API_KEY=your_cohere_api_key_here
   ```
   You can get a Cohere API key by signing up at [cohere.ai](https://cohere.ai/)

## Usage

1. Run the Streamlit app:
   ```bash
   streamlit run app.py
   ```
2. Open your web browser and navigate to the URL shown in the terminal (usually http://localhost:8501)
3. Use the sidebar to navigate between different features:
   - CV Analysis
   - Job Description Generator
   - Cover Letter Creator

## Requirements

- Python 3.7+
- Streamlit
- Cohere API
- PyPDF2
- python-dotenv

## Note

Make sure to keep your API keys secure and never commit them to version control.