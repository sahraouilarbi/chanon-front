import React from 'react';
import classificationStyle from '../styles/Classification.module.css';

const LanguageSelector = ({ language, onChange}) => {
    return (
        <div className={classificationStyle.languageSelectorDiv}>
            <label>
                Language
                <select 
                    id="lang-select" 
                    className={classificationStyle.formSelect}
                    value={language}
                    onChange={onChange}
                    >
                    <option value="">-- Select a language --</option>
                    <option value="ar">Arabic</option>
                    <option value="fr">French</option>
                    <option value="en">English</option>
                </select>
            </label>
        </div>
    );
}

export default LanguageSelector