import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Meta from '../component/Meta';
import LanguageSelector from '../component/LanguageSelector';
import Pagination from '../component/Pagination';
import classificationStyle from '../styles/Classification.module.css';
import { dividerClasses } from '@mui/material';
import { LabelRounded } from '@mui/icons-material';
import YearSelector from '../component/YearSelector';
import Link from 'next/link';

const API_URL = 'http://localhost:5000/api/classification';

const classification = () => {
  // State variables
  const [data, setData] = useState([]); // Stores the fetched data
  const [sortedData, setSortedData] = useState([]); // Sorted data sorted by frenq
  const [filteredData, setFilteredData] = useState([]); // Stores filtered data
  const [dataPerPage, setDataPerPage] = useState(20); // Number of data items to display per page
  const [currentPage, setCurrentPage] = useState(1); // Current page number
  const [language, setLanguage] = useState(''); // Selected language for filtering
  const [year, setYear] = useState(''); // Selected Year for filtering
  var count = 0; // Counter variable

  // Execute when the component mounts
  useEffect(() => {
    // Fetches the data from the API
    const fetchData = async () => {
      try {
        const response = await axios.get(API_URL);

        const _data = response.data.data;
        setData(_data);
        console.log(_data.length);

        const sortedData = _data.sort((a, b) => b.frenq - a.frenq);
        setSortedData(sortedData);
        console.log(sortedData.length);

        setFilteredData(sortedData);
      } catch (error) {
        console.log('### fetchData - Error', error);
      }
    };

    fetchData();
  }, []);

  // Funtion to filter data
  const filterData = (filterFn) => {
    const filteredElements = sortedData.filter(filterFn);
    setFilteredData(filteredElements);
    setCurrentPage(1);
  };

  // Filters data based on selected language
  const handleLanguageChange = (event) => {
    const selectedLanguage = event.target.value;
    setLanguage(selectedLanguage);
    if (selectedLanguage === '') {
      setFilteredData(data);
    } else {
      filterData((el) => el.lng === selectedLanguage);
    }
  };

  // Filters data based on selected year
  const handleYearChange = (event) => {
    const selectedYear = event.target.value;
    setYear(selectedYear);
    if (selectedYear === '') {
      setFilteredData(data);
    } else {
      filterData((el) => el.year === selectedYear);
    }
  };

  // Calculates the index of the last and first data items to display on the current page
  const indexOfLastData = currentPage * dataPerPage;
  const indexOfFirstData = indexOfLastData - dataPerPage;

  // Retrieves the data items to display on the current page
  const currentData = filteredData.slice(indexOfFirstData, indexOfLastData);

  // Updates the counter variable with the index of the first data item
  count = indexOfFirstData;

  return (
    <div>
      <React.StrictMode>
        <Meta title="Classification" />
        <heade>
          <h1>Classification</h1>
        </heade>
        <hr />
        <div className={classificationStyle.divOptions}>
          <LanguageSelector
            language={language}
            onChange={handleLanguageChange}
          />
          <YearSelector year={year} onChange={handleYearChange} />
        </div>
        {currentData.length > 0 ? (
          <div>
            <table className={classificationStyle.table}>
              <thead>
                <tr>
                  <th className={classificationStyle.th}>N°</th>
                  <th className={classificationStyle.th}>Name</th>
                  <th className={classificationStyle.th}>Notoriety</th>
                </tr>
              </thead>
              <tbody>
                {currentData.map((item, index) => (
                  <tr key={item['_id']} className={classificationStyle.tr}>
                    <td className={classificationStyle.td}>
                      {index + indexOfFirstData + 1}
                    </td>
                    <td className={classificationStyle.td}>
                      {item['labelprolexme']}
                    </td>
                    <td className={classificationStyle.td}>
                      {item['frenq']}
                      <Link href={`/graphs?id=${item['_id']}`} passHref>
                        <button>View Graph</button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>Aucune donnée a affiché!</p>
        )}
        <p style={{ textAlign: 'right' }}>
          {filteredData.length} / {data.length} Elements
        </p>
        <hr />
        <div className={classificationStyle.pagination}>
          <Pagination
            currentPage={currentPage}
            total={filteredData.length}
            limit={dataPerPage}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      </React.StrictMode>
    </div>
  );
};

export default classification;
