import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { languages } from '../constants'
import Meta from '../component/Meta';
import LanguageSelector from '../component/LanguageSelector';
import YearSelector from '../component/YearSelector';
import TypeSelector from '../component/TypeSelector';
import Pagination from '../component/Pagination';
import classificationStyle from '../styles/Classification.module.css';
import { dividerClasses } from '@mui/material';
import { LabelRounded } from '@mui/icons-material';
import ViewGraphButton from '../component/ViewGraphButton';
import ViewNotority from '../component/ViewNotoriety';


const API_URL = 'http://localhost:5000/api/classification';

const classification = () => {

  const router = useRouter();

  // State variables
  const [data, setData] = useState([]); // Stores the fetched data
  //const [sortedData, setSortedData] = useState([]); // Sorted data sorted by frenq
  const [filteredData, setFilteredData] = useState([]); // Stores filtered data
  const [dataPerPage, setDataPerPage] = useState(20); // Number of data items to display per page
  const [currentPage, setCurrentPage] = useState(1); // Current page number
  const [language, setLanguage] = useState(''); // Selected language for filtering
  const [year, setYear] = useState(''); // Selected Year for filtering
  const [type, setType] = useState(''); // Selected Type for filtering
  var count = 0; // Counter variable

  const getLanguageValue = (key) => {
    const language = languages.find(lang => lang.key === key);
    return language ? language.value : null;
  }
  // Execute when the component mounts
  useEffect(() => {
    // Fetches the data from the API
    const fetchData = async () => {
      try {
        const response = await axios.get(API_URL, {
          params: {
            language: language, // Pass the selected language as a query parameter
            type: type, // Pass the selected type as a query parameter
            year: year, // Pass the selected year as a query parameter
          }
        });

        const data = response.data.data;
        // sort data by notoriety
        data.sort((a,b) => {
          const lngValue = getLanguageValue(language);
          let aNotoriety;
          let bNotoriety;
          if (lngValue) {
            aNotoriety = a[lngValue].year_views.find(obj => obj.year).notoriety;
            bNotoriety = b[lngValue].year_views.find(obj => obj.year).notoriety;
          }

          if(aNotoriety < bNotoriety) {
            return -1;
          }
          if(aNotoriety > bNotoriety) {
            return 1;
          }
          return 0;
          
        });
        setData(data);

      } catch (err) {
        console.error('### fetchData - Error', err);
      }
    };

    fetchData();

    // Update the URL with the selected type, language and year as query parameters
    const query = {};
    if (language) {
      query.lng = language;
    }
    if (type) {
      query.type = type;
    }
    if (year) {
      query.year = year;
    }

    router.push({
      pathname: '/classification',
      query: query,
    })
  }, [type, language, year]);

  // Funtion to filter data
  const filterData = (filterFn) => {
    const filteredElements = data.filter(filterFn);
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

  // Filters data based on selected type 
  const handleTypeChange = (event) => {
    const selectedType = event.target.value;
    setType(selectedType);
    if (selectedType === '') {
      setFilteredData(data);
    } else {
      filterData((el) => el.type === selectedType);
    }
  }

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
        <header>
          <h1>Classification</h1>
        </header>
        <hr />
        <div className={classificationStyle.divOptions}>
          <LanguageSelector
            language={language}
            onChange={handleLanguageChange}
          />
          <TypeSelector
            type={type}
            language={language}
            onChange={handleTypeChange}
          />
          <YearSelector 
            year={year} 
            language={language} 
            onChange={handleYearChange} 
          />
        </div>
        {data.length > 0 ? (
          <div>
            <table className={classificationStyle.table}>
              <thead>
                <tr>
                  <th className={classificationStyle.th}>N°</th>
                  <th className={classificationStyle.th}>Name</th>
                  <th className={classificationStyle.th}>Notoriety</th>
                  <th className={classificationStyle.th}>Graph</th>
                </tr>
              </thead>
              <tbody>
                {
                data.map((item, index) => {
                  // Get Notoriety
                  const notoriety = {};
                  languages.forEach(lang => {
                    const key = lang.key;
                    const value = lang.value;
                    if(item[value] && year){
                      notoriety[`${key}`] = `${item[value].year_views.map((_years) => {
                        // _years.year === year ? _years.notoriety : null; 
                        if (_years.year === year) {
                          return (_years.notoriety)
                        } else {
                          return null;
                        } 
                      })}`;
                    }
                  });

                  // Get Language value
                  const findLanguageValue = (langKey) => {
                    const language = languages.find( l => l.key===langKey );
                    return language ? language.value : null;
                  }
                  const selectedLanguageValue = findLanguageValue(language);
                  const typeInMongodb = [];
                  if (language){
                    if (item[selectedLanguageValue] != undefined){
                      console.log(language, item['labelprolexme'],item[selectedLanguageValue])
                    }
                  }

                  return (
                  <tr key={item['_id']} className={classificationStyle.tr}>
                    <td className={classificationStyle.td}>
                      {index + indexOfFirstData + 1}
                    </td>
                    <td className={classificationStyle.td}>
                      {item['labelprolexme']}
                    </td>
                    <td className={classificationStyle.td}>
                      { language && year
                        ? <ViewNotority language={language} notoriety={notoriety}></ViewNotority>
                        : <span>&nbsp;</span>
                      }
                    </td>
                    <td className={classificationStyle.td}>
                      <ViewGraphButton 
                        id={`${item['_id']}`} 
                        labelprolexme={`${item['labelprolexme']}`} 
                        language={language}>
                      </ViewGraphButton>
                    </td>
                  </tr>
                )})}
              </tbody>
            </table>
          </div>
        ) : (
          <p>Aucune donnée a affiché!</p>
        )}
        <p style={{ textAlign: 'right' }}>
          {/* {filteredData.length} / {data.length} Elements */}
          {data.length} Elements
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
