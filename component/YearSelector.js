import React from 'react';
import { years } from '../constants';
import classificationStyle from '../styles/Classification.module.css';

const YearSelector = ({ year, onChange }) => {
  return (
    <div className={classificationStyle.yearSelectorDiv}>
      <label>
        Year
        <select
          id="year-select"
          className={classificationStyle.formSelect}
          value={year}
          onChange={onChange}
        >
          <option value="" key='select_a_year'>-- Select a year --</option>
          {
            years.map(
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

export default YearSelector;
