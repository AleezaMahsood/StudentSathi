import streamlit as st
import cohere
import os
from dotenv import load_dotenv
import PyPDF2
import io

# Load environment variables
load_dotenv()

# Initialize Cohere client
co = cohere.Client(os.getenv('COHERE_API_KEY'))

# Custom CSS for better styling
st.markdown("""
    <style>
    .main {
        background-color: #f5f5f5;
    }
    .stButton>button {
        width: 100%;
        border-radius: 20px;
        height: 3em;
        background-color: #4CAF50;
        color: white;
        font-weight: bold;
    }
    .stTextInput>div>div>input {
        border-radius: 20px;
    }
    .stTextArea>div>div>textarea {
        border-radius: 20px;
    }
    .sidebar .sidebar-content {
        background-color: #2c3e50;
        color: white;
    }
    </style>
    """, unsafe_allow_html=True)

def extract_text_from_pdf(uploaded_file):
    pdf_reader = PyPDF2.PdfReader(io.BytesIO(uploaded_file.getvalue()))
    text = ""
    for page in pdf_reader.pages:
        text += page.extract_text()
    return text

def analyze_cv(cv_text):
    prompt = f"""Analyze this CV and provide specific feedback on:
    1. Strengths
    2. Areas for improvement
    3. Missing elements
    4. Suggestions to make it stand out
    
    CV Content:
    {cv_text}
    
    Please provide detailed, constructive feedback."""
    
    response = co.generate(
        prompt=prompt,
        max_tokens=500,
        temperature=0.7,
        k=0,
        stop_sequences=[],
        return_likelihoods='NONE'
    )
    return response.generations[0].text

def generate_job_description(role, experience):
    prompt = f"""Generate a detailed job description for a {role} position requiring {experience} years of experience.
    Include:
    1. Job title and overview
    2. Key responsibilities
    3. Required qualifications
    4. Preferred skills
    5. Company culture and benefits"""
    
    response = co.generate(
        prompt=prompt,
        max_tokens=500,
        temperature=0.7,
        k=0,
        stop_sequences=[],
        return_likelihoods='NONE'
    )
    return response.generations[0].text

def generate_cover_letter(cv_text, job_description, company_name):
    prompt = f"""Generate a professional cover letter based on the following information:
    
    CV Content:
    {cv_text}
    
    Job Description:
    {job_description}
    
    Company Name: {company_name}
    
    Create a compelling cover letter that:
    1. Addresses the specific job requirements
    2. Highlights relevant experience
    3. Shows enthusiasm for the role
    4. Maintains a professional tone"""
    
    response = co.generate(
        prompt=prompt,
        max_tokens=800,
        temperature=0.7,
        k=0,
        stop_sequences=[],
        return_likelihoods='NONE'
    )
    return response.generations[0].text

# Main App Layout
st.set_page_config(
    page_title="Student Saathi",
    page_icon="🎓",
    layout="wide"
)

# Sidebar Navigation
st.sidebar.title("🎓 Student Saathi")
st.sidebar.markdown("---")
page = st.sidebar.radio(
    "Select a Tool",
    ["CV Analysis", "Job Description Generator", "Cover Letter Creator"],
    label_visibility="collapsed"
)

# Main Content Area
st.title("Student Saathi - Career Assistant")
st.markdown("---")

if page == "CV Analysis":
    st.header("📄 CV Analysis")
    st.markdown("Upload your CV to get detailed feedback and improvement suggestions.")
    
    col1, col2 = st.columns([2, 1])
    with col1:
        uploaded_file = st.file_uploader("Upload your CV (PDF)", type="pdf")
        
        if uploaded_file is not None:
            cv_text = extract_text_from_pdf(uploaded_file)
            if st.button("Analyze CV"):
                with st.spinner("Analyzing your CV..."):
                    analysis = analyze_cv(cv_text)
                    st.subheader("Analysis Results")
                    st.markdown("---")
                    st.write(analysis)
    
    with col2:
        st.markdown("### Tips for a Great CV")
        st.markdown("""
        - Keep it concise (1-2 pages)
        - Use clear headings
        - Highlight achievements
        - Include relevant skills
        - Proofread carefully
        """)

elif page == "Job Description Generator":
    st.header("💼 Job Description Generator")
    st.markdown("Create detailed job descriptions for any role.")
    
    col1, col2 = st.columns(2)
    with col1:
        role = st.text_input("Job Role", placeholder="e.g., Software Engineer")
        experience = st.number_input("Years of Experience Required", min_value=0, max_value=20)
        
        if st.button("Generate Job Description"):
            if role and experience:
                with st.spinner("Generating job description..."):
                    jd = generate_job_description(role, experience)
                    st.subheader("Generated Job Description")
                    st.markdown("---")
                    st.write(jd)
    
    with col2:
        st.markdown("### Tips for Job Descriptions")
        st.markdown("""
        - Be specific about requirements
        - Include both technical and soft skills
        - Mention growth opportunities
        - Highlight company culture
        - Be clear about responsibilities
        """)

elif page == "Cover Letter Creator":
    st.header("✉️ Cover Letter Creator")
    st.markdown("Generate personalized cover letters for your job applications.")
    
    col1, col2 = st.columns([2, 1])
    with col1:
        uploaded_file = st.file_uploader("Upload your CV (PDF)", type="pdf")
        job_description = st.text_area("Job Description", height=200, 
                                     placeholder="Paste the job description here...")
        company_name = st.text_input("Company Name", placeholder="e.g., Google")
        
        if st.button("Generate Cover Letter"):
            if uploaded_file and job_description and company_name:
                cv_text = extract_text_from_pdf(uploaded_file)
                with st.spinner("Generating cover letter..."):
                    cover_letter = generate_cover_letter(cv_text, job_description, company_name)
                    st.subheader("Generated Cover Letter")
                    st.markdown("---")
                    st.write(cover_letter)
    
    with col2:
        st.markdown("### Tips for Cover Letters")
        st.markdown("""
        - Address the hiring manager
        - Show enthusiasm
        - Match skills to requirements
        - Keep it concise
        - Proofread carefully
        """)

# Footer
st.markdown("---")
st.markdown("Made with ❤️ by Student Saathi") 