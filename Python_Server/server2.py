from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from PyPDF2 import PdfReader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_google_genai import GoogleGenerativeAIEmbeddings, ChatGoogleGenerativeAI
from langchain.chains.question_answering import load_qa_chain
from langchain.prompts import PromptTemplate
from langchain_community.vectorstores import FAISS
import google.generativeai as genai
import os
from werkzeug.utils import secure_filename

app = Flask(__name__)
CORS(app)

# Load environment variables
os.environ["GOOGLE_API_KEY"] = "AIzaSyD3CTt1kgEN_9ags46QbV9r0COuyznPfkk"
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

# Directory to save uploaded PDFs and FAISS index
UPLOAD_FOLDER = 'uploads'
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

def get_pdf_text(pdf_docs):
    text = ""
    for pdf in pdf_docs:
        pdf_reader = PdfReader(pdf)
        for page in pdf_reader.pages:
            text += page.extract_text() or ""
    return text

def get_text_chunks(text):
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=10000, chunk_overlap=1000)
    chunks = text_splitter.split_text(text)
    return chunks

def get_vector_store(text_chunks, file_path="faiss_index"):
    embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001")
    vector_store = FAISS.from_texts(text_chunks, embedding=embeddings)
    vector_store.save_local(file_path)
    return file_path

def get_conversational_chain():
    prompt_template = """
    Answer the question as detailed as possible from the provided context, make sure to provide all the details, if the answer is not in
    provided context just say, "answer is not available in the context", don't provide the wrong answer\n\n
    Context:\n {context}?\n
    Question: \n{question}\n

    Answer:
    """

    model = ChatGoogleGenerativeAI(model="gemini-pro", temperature=0.3)
    prompt = PromptTemplate(template=prompt_template, input_variables=["context", "question"])
    chain = load_qa_chain(model, chain_type="stuff", prompt=prompt)

    return chain

@app.route('/upload', methods=['POST'])
def upload_files():
    if 'pdf_docs' not in request.files:
        return jsonify({"error": "No file part"}), 400

    files = request.files.getlist('pdf_docs')
    for file in files:
        if file:
            filename = secure_filename(file.filename)
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))

    # Process PDFs right away or just save them, depending on your app's logic
    file_paths = [os.path.join(app.config['UPLOAD_FOLDER'], f) for f in os.listdir(app.config['UPLOAD_FOLDER']) if f.endswith('.pdf')]
    raw_text = get_pdf_text(file_paths)
    text_chunks = get_text_chunks(raw_text)
    get_vector_store(text_chunks)

    return jsonify({"message": "Files successfully uploaded and processed"}), 200

@app.route('/ask', methods=['POST'])
def ask_question():
    data = request.json
    user_question = data['question']
   
    embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001")
    new_db = FAISS.load_local("faiss_index", embeddings, allow_dangerous_deserialization=True)
    docs = new_db.similarity_search(user_question)


    chain = get_conversational_chain()
    response = chain({"input_documents": docs, "question": user_question}, return_only_outputs=True)

    return jsonify({"reply": response["output_text"]})

if __name__ == '__main__':
    app.run(debug=True)
