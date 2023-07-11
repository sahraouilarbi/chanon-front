import React from 'react';
import { languages } from '../constants';
import classificationStyle from '../styles/Classification.module.css';

const LanguageSelector = ({ language, onChange }) => {
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
          <option key='select_a_language' value="">-- Select a language --</option>
          {
            languages.map(
              (item) => (
                <option key={item.key} value={item.key}>{item.value}</option>
              )
            )
          }
        </select>
      </label>
    </div>
  );
};

export default LanguageSelector;
