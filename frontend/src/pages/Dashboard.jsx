import {
  FaFileAlt,
  FaRobot,
  FaUpload,
  FaCheckCircle,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import StatCard from "../components/StatCard";
import { getDashboardData } from "../services/documentService";

import "../styles/dashboard.css";

function Dashboard() {

  const navigate = useNavigate();

  const [dashboard, setDashboard] = useState({
    total_documents: 0,
    latest_document: "No Documents",
    supported_formats: "PDF / DOCX / TXT",
    ai_status: "Ready"
  });

  useEffect(() => {

    loadDashboard();

  }, []);

  const loadDashboard = async () => {

    try {

      const data = await getDashboardData();

      setDashboard(data);

    } catch (error) {

      console.error(error);

    }

  };

  return (

    <div>

      {/* Welcome */}

      <div className="welcome-card">

        <h1>Welcome 👋</h1>

        <p>

          Upload your documents and ask AI questions.

        </p>

      </div>

      {/* Statistics */}

      <div className="stats-grid">

        <StatCard
          title="Uploaded Documents"
          value={dashboard.total_documents}
          icon={<FaFileAlt />}
        />

        <StatCard
          title="AI Assistant"
          value={dashboard.ai_status}
          icon={<FaRobot />}
        />

        <StatCard
          title="Supported Files"
          value={dashboard.supported_formats}
          icon={<FaUpload />}
        />

        <StatCard
          title="Latest Document"
          value={dashboard.latest_document}
          icon={<FaCheckCircle />}
        />

      </div>

      {/* Dashboard Grid */}

      <div className="dashboard-grid">

        <div className="dashboard-card">

          <h2>Quick Actions</h2>

          <button
            onClick={() => navigate("/upload")}
          >
            📤 Upload Document
          </button>

          <button
            onClick={() => navigate("/chat")}
          >
            🤖 AI Assistant
          </button>

          <button
            onClick={() => navigate("/documents")}
          >
            📄 View Documents
          </button>

        </div>

        <div className="dashboard-card">

          <h2>Latest Uploaded Document</h2>

          {

            dashboard.total_documents === 0 ?

              <>

                <p>No documents uploaded yet.</p>

                <p
                  style={{
                    marginTop: "15px",
                    color: "#777"
                  }}
                >

                  Upload your first document to start using AI.

                </p>

              </>

              :

              <>

                <h3
                  style={{
                    color: "#2563EB",
                    marginTop: "15px"
                  }}
                >

                  📄 {dashboard.latest_document}

                </h3>

              </>

          }

        </div>

      </div>

      {/* AI Tips */}

      <div className="dashboard-card tips">

        <h2>AI Tips</h2>

        <ul>

          <li>Upload PDF, DOCX or TXT documents.</li>

          <li>Ask clear and specific questions.</li>

          <li>Upload multiple documents for better answers.</li>

          <li>Use "Summarize this document" for quick summaries.</li>

        </ul>

      </div>

    </div>

  );

}

export default Dashboard;