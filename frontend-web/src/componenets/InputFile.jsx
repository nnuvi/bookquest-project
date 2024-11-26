// src/components/InputField.jsx

import React from 'react';
import './InputFile.css';

const InputFile = ({ onChange }) => {
    return (
        <div className="input-file-container">
            <label htmlFor="fileInput" className="file-label">
                Add Image
            </label>
            <input
                type="file"
                id="fileInput"
                className="file-input"
                accept="image/*"
                onChange={onChange}
            />
        </div>
    );
};

export default InputFile;
