import Head from 'next/head';
import axios from 'axios';
import AlarmIcon from '@mui/icons-material/Alarm';
import Button from '@mui/material/Button';
import ClearIcon from '@mui/icons-material/Clear';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import SendIcon from '@mui/icons-material/Send';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import React, { useEffect, useState } from 'react';
import homeStyles from '../styles/Home.module.css';
import { languages, placeholder, years } from '../constants';
import { Typewriter } from 'react-simple-typewriter';
import { Transform } from '@mui/icons-material';
export default function Home() {
  // State variables
  const [data, setData] = useState([]); // State for storing fetched data
  const [isSend, setIsSend] = useState(false); // State for determining if the search button is for sending or clearing
  const [formData, setFormData] = useState({
    labelname: ''
  }); // State for form data
  const { labelname } = formData; // Destructuring labelname from formData

  const [detailMsg, setMesgDetail] = useState(''); // State for storing detailed message
  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value }); // Function to handle form field changes

  async function onSubmit() {
    // Function to handle form submission
    await axios.get('http://localhost:5000/fetch-all-data').then((response) => {
      setData(response.data.data);
      setFormData({
        labelname: ''
      });
      setIsSend(false);
    }).catch((error) => {
      console.log('### onSubmit - Error  ', error);
    })
  }

  // State variables and functions for menu dropdown
  const [anchorElLnge, setAnchorElLnge] = useState(null);
  const [anchorElDate, setAnchorElDate] = useState(null);
  const openLnge = Boolean(anchorElLnge);
  const openDate = Boolean(anchorElDate);
  const [lnge, setLnge] = useState('en');
  const [year, setYear] = useState('2022');
  const handleClickLnge = (event) => {
    setAnchorElLnge(event.currentTarget);
  };
  const handleCloseLnge = (er) => {
    setLnge(er);
    setAnchorElLnge(null);
  };
  const handleClickDate = (event) => {
    setAnchorElDate(event.currentTarget);
  };
  const handleCloseDate = (er) => {
    setYear(er);
    setAnchorElDate(null);
  };

  useEffect(() => {
    // Perform initial data fetch
    onSubmit();
  }, []);


  const filter = async e => {
    // Function to handle filtering

    e.preventDefault();
    if ( labelname!='' ){
      await axios.get(`http://localhost:5000/filter?labelprolexme=${labelname}&lng=${lnge}&year=${year}`).then((response) => {
        setData(response.data.data);
        setIsSend(true);
        infoBox();
      }).catch((error) => {
        console.log('### filter - Error  ', error);
      })
    }
  }


  const infoBox = async e => {
    // Function to handle displaying detailed message
    
    // e.preventDefault();
    await axios.get(`http://localhost:5000/api/scrap?name=${labelname}&lng=${lnge}`).then((response) => {
      setMesgDetail(response.data);
      //
      // setData(response.data.data);
      // setData(response.data.data);
      // setIsSend(true);
      //
    }).catch((error) => {
      console.log('infoBox - Error  ', error);
    })
  }

  function getPlaceholder(language) {
    return placeholder[language] + ' ...' || '...';
  }

  return (
    <div className={homeStyles.main}>
      <React.StrictMode>
      {/* ----------------------------- APP META HEADER ------------------- */}
      <Head>
        <title>Chanon Project</title>
      </Head>

      {/* ----------------------------- VIEWPORT HEADER ------------------- */}
      <div className={`${homeStyles.header} ${homeStyles.backgroundColor000814} ${homeStyles.colorWhite}`}>
        <div>
          {/* ------------------------- PROJECT NAME ---------------------- */}
          <div className={homeStyles.headerTitle}>
            <h2 className={homeStyles.h2}>Chanon - Project</h2>
          </div>
        </div>

        {/* --------------------------- DATE SELECTOR --------------------- */}
        <div>
          <Button
                id="date-button"
                aria-controls={openDate ? 'date-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={openDate ? 'true' : undefined}
                onClick={handleClickDate}
                style={{color: 'white' , fontWeight: 'bold' }}
              >
                {year} <span>&#x25BC;</span>
              </Button>
              <Menu
                id="date-menu"
                anchorEl={anchorElDate}
                open={openDate}
                MenuListProps={{
                  'aria-labelledby': 'date-button',
                }}
              >
                {
                  years.map(
                    (item)=> (
                      <MenuItem className={`${homeStyles.borderBottom}`} key={item.key} onClick={() => handleCloseDate(item.key)}>{item.value}</MenuItem>
                    )
                  )
                }
              </Menu>
        </div>

        {/* ------------------------- LANG SELECTOR ----------------------- */}
        <div>
          <Button
                id="basic-button"
                aria-controls={openLnge ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={openLnge ? 'true' : undefined}
                onClick={handleClickLnge}
                style={{ color: 'white', fontWeight: 'bold' }}
              >
                {lnge} <span>&#x25BC;</span>
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorElLnge}
                open={openLnge}
                // onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
              >

                {
                  languages.map(
                    (item)=> (
                      <MenuItem className={`${homeStyles.textCapitalize} ${homeStyles.borderBottom}`} key={item.key} onClick={() => handleCloseLnge(item.key)}>{item.value}</MenuItem>
                    )
                  )
                }
                
              </Menu>
        </div>
      </div>

      {/* ------------------------- CONTAINER FULL WIDTH ------------------ */}
      <div className={homeStyles.containerFullWidth}>
        <div className={`${homeStyles.sidebar} ${homeStyles.backgroundColor001D3D} ${homeStyles.colorWhite}`}>

          <div className={homeStyles.histo}>
            <h3 className={homeStyles.h3}>Historique</h3>
            {
              data != null 
              ? data.map((m, ind) => {
                const translations = [];

                languages.forEach(lang=>{
                  const key = lang.value;
                  if(m[key]) {
                    translations.push(`(${m[key].lng})`);
                  }
                });
                return (
                  <div key={ind}>
                    <div style={{ display: "flex", flexDirection: "row", justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <ChatBubbleOutlineOutlinedIcon fontSize='small' style={{ marginRight: '5px' }} />
                        <p style={{ fontSize: "14px" }}>{m['labelprolexme']}&nbsp;</p>
                        {translations.map(t=><p key={t} style={{ fontSize: "12px", fontWeight: '300' }}>{t}</p>)}
                      </div>
                    </div>
                  </div>
                );
              })
              : console.log('### data.map est null') 
            }
          </div>
          {/* histo */}
        </div>
        {/* histDiv */}
        <div className={homeStyles.detailDiv}>
          <div className={homeStyles.detail}>
            <div className={homeStyles.description}>
              <h2>{labelname} :</h2>
              <span>{detailMsg}</span>
            </div>
            {/* description */}
          </div>
          {/* detail */}
          <div className={`${homeStyles.search} ${homeStyles.backgroundColorFFC300}`} >
            <input
              style={{ height: '40px', width: '90%', border: 'solid 2px grey', borderRadius: '10px', paddingLeft: '8px', paddingRight: '8px' }}
              name='labelname'
              type='text'
              id='labelname'
              //placeholder={lnge=='en' ? 'Search ...' : lnge=='fr' ? 'Rechercher ...' : 'ابحث ...'}
              placeholder={getPlaceholder(lnge)}
              dir={lnge=='ar' ? 'rtl' : 'ltr'}
              onChange={onChange}
              value={labelname}
              // ref={inputRef}
              required
              
              // onKeyDown={handleKeyDownRoll}
            />
            <IconButton onClick={isSend ? onSubmit : filter} color="primary" aria-label="add an alarm">
              {
                isSend ? <ClearIcon /> : <SendIcon />
              }
            </IconButton>
          </div>
          {/* Search  */}
        </div>
        {/* detailDiv */}
      </div>
      {/* test */}
      </React.StrictMode>
    </div>
  )
}