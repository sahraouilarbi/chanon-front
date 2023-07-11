import React from 'react';
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
          <option value="">-- Select a year --</option>
          <option value="2022">2022</option>
          <option value="2021">2021</option>
          <option value="2020">2020</option>
          <option value="2019">2019</option>
          <option value="2018">2018</option>
          <option value="2017">2017</option>
          <option value="2016">2016</option>
        </select>
      </label>
    </div>
  );
};

export default YearSelector;
