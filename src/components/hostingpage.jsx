import React from "react";
import "../layouts/hostingpage.css";

function hostingpage() {
    return (
        <div className="main-wrapperr">
            {/* Header */}
            <header className="headerr">
                <div className="logo-section">
                    <h1>DEVFIESTA</h1>
                </div>
            </header>

            {/* Content */}
            <div className="contents">
                <h2 className="heading">Start your Hosting Journey.</h2>
                <div className="button-groups">
                    <button className="action-button">Host A hackathon</button>
                    <button className="action-button">Host A PBL</button>
                </div>
            </div>
        </div>
    );
}

export default hostingpage;
