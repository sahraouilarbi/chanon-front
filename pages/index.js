import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import IconButton from '@mui/material/IconButton';
import AlarmIcon from '@mui/icons-material/Alarm';
import SendIcon from '@mui/icons-material/Send';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import ClearIcon from '@mui/icons-material/Clear';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Typewriter } from 'react-simple-typewriter';
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
      console.log(response.data.data);
      setData(response.data.data);
      console.log('data', data);
      setFormData({
        labelname: ''
      });
      setIsSend(false);
    }).catch((error) => {
      console.log('Error  ', error);
    })
  }

  // State variables and functions for menu dropdown
  const [anchorElLnge, setAnchorElLnge] = useState(null);
  const [anchorElDate, setAnchorElDate] = useState(null);
  const openLnge = Boolean(anchorElLnge);
  const openDate = Boolean(anchorElDate);
  const [lnge, setLnge] = useState('ar');
  const [dateIntervale, setDate] = useState('2016');
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
    setDate(er);
    setAnchorElDate(null);
  };

  useEffect(() => {
    // Perform initial data fetch
    onSubmit();
  }, []);


  const filter = async e => {
    // Function to handle filtering
    e.preventDefault();
    console.log('label name : ', labelname);
    await axios.get(`http://localhost:5000/filter?labelprolexme=${labelname}&lng=${lnge}`).then((response) => {
      console.log('response', response);
      setData(response.data.data);
      console.log('data', data);
      setIsSend(true);
      infoBox();
    }).catch((error) => {
      console.log('Error  ', error);
    })
  }


  const infoBox = async e => {
    // Function to handle displaying detailed message
    e.preventDefault();
    console.log('label name : ', labelname);
    await axios.get(`http://localhost:5000/api/scrap?name=${labelname}&lng=${lnge}`).then((response) => {
      console.log('response', response.data);
      setMesgDetail(response.data);
      // setData(response.data.data);
      // console.log('data', data);
      // setIsSend(true);
    }).catch((error) => {
      console.log('Error  ', error);
    })
  }



  return (
    <div>
      <Head>
        <title>Chanon Project</title>
      </Head>
      <div className={styles.test}>
        <div className={styles.histDiv}>
          <div className={styles.title}>
            <p className={styles.p}>Chanon - Project</p>
          </div>
          <div className={styles.histo}>
            <p>Historique</p>
            {
              data.map((m, ind) => {
                return (
                  <div>
                    <div style={{ display: "flex", flexDirection: "row", justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <ChatBubbleOutlineOutlinedIcon fontSize='small' style={{ marginRight: '5px' }} />
                        <p style={{ fontSize: "14px" }}>{m['labelprolexme']}</p>
                      </div>
                      <p style={{ fontSize: "12px", fontWeight: '300' }}>{m['lng']}</p>
                    </div>
                    <div className={styles.divider} />
                  </div>
                )
              })
            }
          </div>
          {/* histo */}
        </div>
        {/* histDiv */}
        <div className={styles.detailDiv}>
          <div className={styles.detail}>
            <div className={styles.header}>
              {/* <p className={styles.p}>Chanon</p> */}
              <Button
                id="date-button"
                aria-controls={openDate ? 'date-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={openDate ? 'true' : undefined}
                onClick={handleClickDate}
                style={{ color: 'black', fontWeight: 'bold' }}
              >
                {dateIntervale}
              </Button>
              <Menu
                id="date-menu"
                anchorEl={anchorElDate}
                open={openDate}
                MenuListProps={{
                  'aria-labelledby': 'date-button',
                }}
              >
                <MenuItem onClick={() => handleCloseDate('2022')}>2022</MenuItem>
                <MenuItem onClick={() => handleCloseDate('2021')}>2021</MenuItem>
                <MenuItem onClick={() => handleCloseDate('2020')}>2020</MenuItem>
                <MenuItem onClick={() => handleCloseDate('2019')}>2019</MenuItem>
                <MenuItem onClick={() => handleCloseDate('2018')}>2018</MenuItem>
                <MenuItem onClick={() => handleCloseDate('2017')}>2017</MenuItem>
                <MenuItem onClick={() => handleCloseDate('2016')}>2016</MenuItem>
              </Menu>
              <span>&nbsp;</span>
              <Button
                id="basic-button"
                aria-controls={openLnge ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={openLnge ? 'true' : undefined}
                onClick={handleClickLnge}
                style={{ color: 'black', fontWeight: 'bold' }}
              >
                {lnge}
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
                <MenuItem onClick={() => handleCloseLnge('ar')}>Arabic</MenuItem>
                <MenuItem onClick={() => handleCloseLnge('fr')}>French</MenuItem>
                <MenuItem onClick={() => handleCloseLnge('en')}>English</MenuItem>
              </Menu>
            </div>
            <div className={styles.description}>
              <h2>{labelname} :</h2>
              <span>{detailMsg}</span>
            </div>
            {/* description */}
          </div>
          {/* detail */}
          <div className={styles.search} >
            <input
              style={{ height: '40px', width: '90%', border: 'solid 2px grey', borderRadius: '10px', paddingLeft: '8px', paddingRight: '8px' }}
              name='labelname'
              type='text'
              id='labelname'
              placeholder='Search ...'
              onChange={onChange}
              value={labelname}
              // ref={inputRef}
              required
              
              // onKeyDown={handleKeyDownRoll}
            />
            <IconButton onClick={isSend ? onSubmit : infoBox} color="primary" aria-label="add an alarm">
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
    </div>
    // </div>
  )
  // return (
  //   // <div className={styles.container}>
  //     <div className={styles.parent} >
  //       <div className={styles.histo}>
  //         <div className={styles.divtophis}>
  //           <h1>Historique</h1>
  //         </div>
  //         <div className={styles.divBotonhis}></div>
  //       </div>

  //       <div className={styles.details}>
  //         <div className={styles.detail}>
  //           <div className={styles.divtopdetail}>
  //             <h1>Chanon-Project</h1>
  //           </div>
  //           <div className={styles.divBotondetail}></div>
  //         </div>
  //         <div className={styles.search}>
  //           <input
  //             style={{ height: '55px', width: '100%', border: 'solid 2px grey', borderRadius: '10px', paddingLeft: '8px', paddingRight: '8px' }}
  //             name='search'
  //             type='search'
  //             id='search'
  //             placeholder='search'
  //             // onChange={handleChangePlate}
  //             // value={plate}
  //             // ref={inputRef}
  //             required
  //           // onKeyDown={handleKeyDownRoll}
  //           />
  //         </div>
  //       </div>
  //     </div>
  //   // </div>
  // )
}
