import { useState } from "react";
import { FaCloudUploadAlt, FaFileAlt } from "react-icons/fa";
import { toast } from "react-toastify";

import { uploadDocument } from "../services/documentService";

import "../styles/upload.css";

function Upload() {

    const [selectedFile, setSelectedFile] = useState(null);

    const [loading, setLoading] = useState(false);

    const handleFileChange = (event) => {

        if (event.target.files.length > 0) {

            setSelectedFile(event.target.files[0]);

        }

    };

    const handleUpload = async () => {

        if (!selectedFile) {

            toast.warning("Please select a document.");

            return;

        }

        try {

            setLoading(true);

            await uploadDocument(selectedFile);

            toast.success("Document uploaded successfully.");

            setSelectedFile(null);

            document.getElementById("fileInput").value = "";

        }

        catch (err) {

            toast.error(

                err.response?.data?.detail ||

                "Document upload failed."

            );

        }

        finally {

            setLoading(false);

        }

    };

    return (

        <div className="upload-page">

            <div className="page-header">

                <h1>Upload Document</h1>

                <p>

                    Upload PDF, DOCX or TXT documents for AI analysis.

                </p>

            </div>

            <div className="upload-card">

                <FaCloudUploadAlt className="upload-icon" />

                <h2>Select Document</h2>

                <input

                    id="fileInput"

                    type="file"

                    accept=".pdf,.docx,.txt"

                    onChange={handleFileChange}

                />

                {

                    selectedFile && (

                        <div className="selected-file">

                            <FaFileAlt />

                            <span>

                                {selectedFile.name}

                            </span>

                        </div>

                    )

                }

                <button

                    onClick={handleUpload}

                    disabled={loading}

                >

                    {

                        loading

                            ? "Uploading..."

                            : "Upload Document"

                    }

                </button>

            </div>

        </div>

    );

}

export default Upload;