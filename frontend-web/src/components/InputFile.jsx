// src/components/InputField.jsx
import React from 'react';

const InputField = ({ label, value, onChange, type = 'text', placeholder }) => {
    return (
        <div className="input-field">
            {label && <label>{label}</label>}
            <input
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
            />
        </div>
    );
};

export default InputField;
