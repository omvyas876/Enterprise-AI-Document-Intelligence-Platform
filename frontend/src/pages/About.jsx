import {
  FaFileUpload,
  FaComments,
  FaSearch,
  FaShieldAlt,
  FaClock,
  FaLaptopCode,
} from "react-icons/fa";

import "../styles/dashboard.css";

function About() {
  return (
    <div>

      {/* Header */}

      <div className="welcome-card">

        <h1>About the Platform</h1>

        <p style={{ marginTop: "15px" }}>
          Enterprise AI Document Intelligence Platform is a smart document
          assistant that helps users upload documents, search important
          information, and receive accurate AI-powered answers in seconds.
          Instead of manually reading large files, users can simply ask
          questions in natural language and quickly find the required
          information.
        </p>

      </div>

      {/* Features */}

      <div className="dashboard-card" style={{ marginTop: "25px" }}>

        <h2>Platform Features</h2>

        <br />

        <div className="stats-grid">

          <div className="stat-card">
            <div className="stat-icon">
              <FaFileUpload />
            </div>

            <div>
              <h4>Document Upload</h4>
              <p>
                Upload PDF, DOCX and TXT documents quickly and securely.
              </p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <FaComments />
            </div>

            <div>
              <h4>AI Assistant</h4>
              <p>
                Ask questions in natural language and receive intelligent
                answers.
              </p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <FaSearch />
            </div>

            <div>
              <h4>Smart Search</h4>
              <p>
                Instantly locate important information from uploaded
                documents.
              </p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <FaShieldAlt />
            </div>

            <div>
              <h4>Secure Processing</h4>
              <p>
                Documents are processed safely within the application.
              </p>
            </div>
          </div>

        </div>

      </div>

      {/* Uses */}

      <div className="dashboard-card" style={{ marginTop: "25px" }}>

        <h2>Platform Uses</h2>

        <br />

        <ul style={{ lineHeight: "2" }}>

          <li>📄 Read large documents without manually searching.</li>

          <li>📚 Quickly summarize reports, manuals and policies.</li>

          <li>🏢 Search company documents efficiently.</li>

          <li>🎓 Analyze academic notes and study materials.</li>

          <li>⚖️ Find important information from legal documents.</li>

          <li>📑 Understand business reports faster.</li>

          <li>🔍 Get accurate answers from uploaded files.</li>

        </ul>

      </div>

      {/* Benefits */}

      <div className="dashboard-card" style={{ marginTop: "25px" }}>

        <h2>Benefits</h2>

        <br />

        <div className="stats-grid">

          <div className="stat-card">

            <div className="stat-icon">
              <FaClock />
            </div>

            <div>
              <h4>Saves Time</h4>
              <p>
                Find required information within seconds instead of reading
                entire documents.
              </p>
            </div>

          </div>

          <div className="stat-card">

            <div className="stat-icon">
              <FaComments />
            </div>

            <div>
              <h4>Easy Interaction</h4>
              <p>
                Communicate with documents using simple natural language.
              </p>
            </div>

          </div>

          <div className="stat-card">

            <div className="stat-icon">
              <FaShieldAlt />
            </div>

            <div>
              <h4>Reliable Results</h4>
              <p>
                Provides answers based on uploaded documents.
              </p>
            </div>

          </div>

        </div>

      </div>

      {/* Developer */}

      <div className="dashboard-card" style={{ marginTop: "25px" }}>

        <h2>Developer Information</h2>

        <br />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
          }}
        >

          <div
            style={{
              width: "80px",
              height: "80px",
              background: "#2563EB",
              color: "white",
              borderRadius: "50%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "32px",
            }}
          >
            <FaLaptopCode />
          </div>

          <div>

            <h3>Om Vyas</h3>

            <p>
              Final Year Computer Science Engineering Student
            </p>

            <p>
              Developer of the Enterprise AI Document Intelligence Platform
            </p>
            
          </div>

        </div>

      </div>

    </div>
  );
}

export default About;