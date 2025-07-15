import React, { useState } from "react";
import "../layouts/addproject.css";

function AddProject() {
    const [image, setImage] = useState(null);

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setImage(URL.createObjectURL(e.target.files[0]));
        }
    };

    return (
        <div className="add-project-page">
            {/* Header */}
            <header className="header">
                <img src="/logo.png" alt="Logo" className="logo" />
                <span className="brand-name">DevFiesta</span>
            </header>

            {/* Title */}
            <div className="title-bar">
                <h1 className="page-title">Add your project</h1>
            </div>

            {/* Form Section */}
            <div className="form-container">
                <div className="form-left">
                    <label>Create Your Tagline</label>
                    <input  type="text" />

                    <label>Technologies used</label>
                    <input type="text" />

                    <label>Project Link</label>
                    <input type="text" />

                    <label>About Your Project</label>
                    <textarea rows="4"></textarea>

                    <div className="form-buttons">
                        <button className="save-btn">Save</button>
                        <button className="cancel-btn">cancel</button>
                    </div>
                </div>

                {/* Image Upload Section */}
                <div className="form-right">
                    <div className="image-preview">
                        {image ? (
                            <img src={image} alt="Thumbnail Preview" />
                        ) : (
                            <span>Thumbnail Image</span>
                        )}
                    </div>
                    <label className="change-image">
                        Change Image
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            hidden
                        />
                    </label>
                </div>
            </div>
        </div>
    );
}

export default AddProject;
