import React, { useEffect, useState } from "react";
import "../layouts/showproject.css";

const STORAGE_KEYS = {
    projectName: 'cofiesta_projectName',
    projectGenre: 'cofiesta_projectGenre',
    repo: 'cofiesta_repo',
    motivation: 'cofiesta_motivation',
    overview: 'cofiesta_overview',
    features: 'cofiesta_features'
};

// Helper to ensure links always start with http(s)
function normalizeUrl(url) {
    if (!url) return '';
    if (/^https?:\/\//i.test(url)) return url;
    return 'https://' + url;
}

export default function ShowProject() {
    const [project, setProject] = useState({
        projectName: "",
        projectGenre: "",
        repo: "",
        motivation: "",
        overview: "",
        features: [],
    });

    useEffect(() => {
        setProject({
            projectName: localStorage.getItem(STORAGE_KEYS.projectName) || "",
            projectGenre: localStorage.getItem(STORAGE_KEYS.projectGenre) || "",
            repo: localStorage.getItem(STORAGE_KEYS.repo) || "",
            motivation: localStorage.getItem(STORAGE_KEYS.motivation) || "",
            overview: localStorage.getItem(STORAGE_KEYS.overview) || "",
            features: JSON.parse(localStorage.getItem(STORAGE_KEYS.features) || "[]"),
        });
    }, []);

    // Pretty repo card with always-correct link
    const renderRepo = (url) => {
        if (!url) return <span className="no-value">No repository given</span>;
        const safeUrl = normalizeUrl(url);
        let hostname = safeUrl;
        try {
            hostname = new URL(safeUrl).hostname;
        } catch (error) {
            console.error(error);
        }

        return (
            <div className="repo-card">
                <div className="repo-info">
                    <img src="https://cdn-icons-png.flaticon.com/512/25/25231.png" alt="GitHub Logo" className="repo-github-icon" />
                    <div className="repo-link-url">
                        {hostname}
                        <span className="show-link-arrow">↗</span>
                    </div>
                </div>
                <a
                    href={safeUrl}
                    className="repo-view-btn"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    View on GitHub
                </a>
            </div>
        );
    };

    return (
        <div className="show-main-bg classy-bg">


            <div className="show-content-card animate-entrance">
                <div className="show-flex-top">
                    <div className="show-info-main">
                        <div className="show-title-block">
                            <h1 className="show-project-name gradient-text">
                                {project.projectName || <span className="no-value">No Project Name</span>}
                            </h1>
                            <span className="show-genre-chip stylish-badge">
                                {project.projectGenre || "No Genre"}
                            </span>
                        </div>
                        <div className="show-section">
                            <div className="show-section-label">GitHub Repo</div>
                            {renderRepo(project.repo)}
                        </div>
                        <div className="show-section">
                            <div className="show-section-label">Motivation</div>
                            <div className="show-section-content">
                                {project.motivation || <span className="no-value">Not specified</span>}
                            </div>
                        </div>
                        <div className="show-section">
                            <div className="show-section-label">Overview</div>
                            <div className="show-section-content">
                                {project.overview || <span className="no-value">Not specified</span>}
                            </div>
                        </div>
                        <div className="show-section">
                            <div className="show-section-label">Key Features</div>
                            {project.features && project.features.length ? (
                                <ul className="show-features-list">
                                    {project.features.map((f, idx) => (
                                        <li key={idx} className="show-feature-item">
                                            <span className="show-feature-dot" /> {f}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <span className="no-value">No features listed</span>
                            )}
                        </div>
                    </div>
                    <div className="show-img-col">
                        <div className="show-image-preview stylish-img-shadow">
                            {/* Add image URL here if available */}
                            <img
                                src="/default-thumbnail.png"
                                alt="Project Thumbnail"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
