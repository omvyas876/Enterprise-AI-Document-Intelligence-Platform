import { useState } from "react";

import {
  FaPaperPlane,
  FaRobot,
  FaUser,
  FaCopy,
  FaGlobe,
  FaFileAlt,
} from "react-icons/fa";

import { toast } from "react-toastify";

import { askQuestion } from "../services/chatService";

import "../styles/chat.css";
function Chat() {

  const [question, setQuestion] = useState("");

  const [messages, setMessages] = useState([]);

  const [loading, setLoading] = useState(false);
    const sendQuestion = async () => {

    if (!question.trim()) {

      toast.warning("Please enter a question.");

      return;

    }

    const userQuestion = question;

    setMessages((prev) => [

      ...prev,

      {
        type: "user",
        text: userQuestion,
      },

    ]);

    setQuestion("");

    setLoading(true);

    try {

      const response = await askQuestion(userQuestion);

      setMessages((prev) => [

        ...prev,

        {
          type: "ai",
          answer: response.answer,
          source: response.source,
          page: response.page,
          mode: response.mode,
        },

      ]);

    }

    catch (error) {

      console.error(error);

      toast.error("Unable to get AI response.");

    }

    finally {

      setLoading(false);

    }

  };
    const copyAnswer = (text) => {

    navigator.clipboard.writeText(text);

    toast.success("Answer copied.");

  };
    return (

    <div className="chat-page">

      <div className="page-header">

        <h1>AI Assistant</h1>

        <p>
          Ask questions about your uploaded documents.
        </p>

      </div>

      <div className="chat-box">

        {messages.length === 0 && !loading && (

          <div className="empty-chat">

            <FaRobot className="robot-icon" />

            <h3>Ask anything...</h3>

            <p>
              AI will first search your uploaded documents.
            </p>

            <p>
              If nothing is found, it will answer using General AI Knowledge.
            </p>

          </div>

        )}

        {messages.map((msg, index) => (

          <div
            key={index}
            className={
              msg.type === "user"
                ? "user-message"
                : "ai-message"
            }
          >

            {msg.type === "user" ? (

              <>

                <div className="message-title">

                  <FaUser />

                  <span>You</span>

                </div>

                <p
                  style={{
                    color: "white",
                    marginTop: "10px",
                    whiteSpace: "pre-wrap",
                    wordBreak: "break-word",
                    lineHeight: "1.7",
                  }}
                >
                  {msg.text}
                </p>

              </>

            ) : (

              <>

                <div className="message-title">

                  <FaRobot />

                  <span>AI Assistant</span>

                </div>

                <div
                  style={{
                    whiteSpace: "pre-wrap",
                    lineHeight: "1.8",
                    color: "#374151",
                    fontSize: "16px",
                  }}
                >
                  {msg.answer}
                </div>

                <div className="source-box">

                  {msg.mode === "document" ? (

                    <>

                      <div className="source-item">

                        <FaFileAlt />

                        <span>

                          <strong>Source:</strong>{" "}

                          {msg.source}

                        </span>

                      </div>

                      <div className="source-item">

                        📄

                        <span>

                          <strong>Page:</strong>{" "}

                          {msg.page}

                        </span>

                      </div>

                    </>

                  ) : (

                    <div className="source-item general-source">

                      <FaGlobe />

                      <span>

                        <strong>Source:</strong>{" "}

                        General AI Knowledge

                      </span>

                    </div>

                  )}

                </div>

                <button
                  className="copy-btn"
                  onClick={() => copyAnswer(msg.answer)}
                >

                  <FaCopy />

                  Copy Answer

                </button>

              </>

            )}

          </div>

        ))}

        {loading && (

          <div className="thinking-box">

            <FaRobot className="thinking-icon" />

            <div>

              <h4>AI is thinking...</h4>

              <p>Searching uploaded documents...</p>

            </div>

          </div>

        )}

      </div>
            <div className="chat-input">

        <input
          type="text"
          placeholder="Ask a question..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={(e) => {

            if (e.key === "Enter") {

              sendQuestion();

            }

          }}
        />

        <button
          onClick={sendQuestion}
          disabled={loading}
        >

          <FaPaperPlane />

        </button>

      </div>

    </div>

  );

}

export default Chat;