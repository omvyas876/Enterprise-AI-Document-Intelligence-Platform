import { useEffect, useState } from "react";
import {
    FaFilePdf,
    FaFileWord,
    FaFileAlt,
    FaSearch,
    FaTrash
} from "react-icons/fa";
import { toast } from "react-toastify";

import {
    getDocuments,
    deleteDocument
} from "../services/documentService";

import "../styles/documents.css";

function Documents() {

    const [documents, setDocuments] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadDocuments();
    }, []);

    const loadDocuments = async () => {

        try {

            const data = await getDocuments();

            setDocuments(data);

        } catch (error) {

            console.error(error);

            toast.error("Unable to load documents.");

        } finally {

            setLoading(false);

        }

    };

    const handleDelete = async (filename) => {

        const confirmDelete = window.confirm(
            `Are you sure you want to delete "${filename}"?`
        );

        if (!confirmDelete) return;

        try {

            await deleteDocument(filename);

            toast.success("Document deleted successfully.");

            loadDocuments();

        } catch (error) {

            console.error(error);

            toast.error("Unable to delete document.");

        }

    };

    const filteredDocuments = documents.filter((doc) =>
        doc.name.toLowerCase().includes(search.toLowerCase())
    );

    const getIcon = (type) => {

        switch (type) {

            case "PDF":
                return <FaFilePdf className="pdf-icon" />;

            case "DOCX":
                return <FaFileWord className="word-icon" />;

            default:
                return <FaFileAlt className="txt-icon" />;

        }

    };

    return (

        <div className="documents-page">

            <div className="page-header">

                <h1>Documents</h1>

                <p>
                    Manage your uploaded documents.
                </p>

            </div>

            <div className="search-box">

                <FaSearch className="search-icon" />

                <input
                    type="text"
                    placeholder="Search document..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

            </div>

            {

                loading ?

                    <div className="loading">

                        Loading documents...

                    </div>

                    :

                    filteredDocuments.length === 0 ?

                        <div className="empty-state">

                            <FaFileAlt className="empty-icon" />

                            <h3>No Documents Found</h3>

                            <p>
                                Upload a document to get started.
                            </p>

                        </div>

                        :

                        <div className="documents-grid">

                            {

                                filteredDocuments.map((doc, index) => (

                                    <div
                                        key={index}
                                        className="document-card"
                                    >

                                        <div className="document-icon">

                                            {getIcon(doc.type)}

                                        </div>

                                        <h3>{doc.name}</h3>

                                        <div className="document-info">

                                            <p>

                                                <strong>Type:</strong>{" "}

                                                {doc.type}

                                            </p>

                                            <p>

                                                <strong>Size:</strong>{" "}

                                                {doc.size}

                                            </p>

                                            <p>

                                                <strong>Uploaded:</strong>{" "}

                                                {doc.uploaded}

                                            </p>

                                        </div>

                                        <button
                                            className="delete-btn"
                                            onClick={() => handleDelete(doc.name)}
                                        >

                                            <FaTrash />

                                            Delete

                                        </button>

                                    </div>

                                ))

                            }

                        </div>

            }

        </div>

    );

}

export default Documents;