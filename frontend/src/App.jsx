import axios from "axios";
import { useState } from "react";
import "./PDFUploader.css";

const PDFUploader = () => {
  const [file, setFile] = useState(null);
  const [response, setResponse] = useState(null);
  const [loading, setloading] = useState(false);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return;
    console.log("Button clicked");

    const formData = new FormData();
    formData.append("pdf", file);

    try {
      setloading(true);
      const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/pdf/`, formData);
      setResponse(res.data);
      setloading(false);
    } catch (error) {
      console.error("Error uploading PDF:", error);
      alert("Failed to upload PDF and generate questions.");
      setloading(false);
    }
  };

  return (
    <div className="pdf-uploader-container">
      <h1 className="title">Upload PDF to Generate Interview Questions</h1>
      <form className="upload-form" onSubmit={handleUpload}>
        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button  disabled={loading} type="submit">
          {!loading ? "Upload and Generate" : "Generating..."}
        </button>
      </form>

      {response && (
        <div className="results">
          {["basic", "medium", "advanced"].map((level) => (
            <div key={level} className="question-block">
              <h2 className="question-level">{level.toUpperCase()}</h2>
              {response[level].map((q, i) => (
                <div key={i} className="qa-pair">
                  <p><strong>Q:</strong> {q.question}</p>
                  <p><strong>A:</strong> {q.answer}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PDFUploader;
