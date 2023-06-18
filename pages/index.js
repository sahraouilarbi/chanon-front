// import Head from 'next/head';
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
import { Typewriter } from 'react-simple-typewriter'
export default function Home() {
  const [data, setData] = useState([]);
  const [isSend, setIsSend] = useState(false);
  const [formData, setFormData] = useState({
    labelname: ''
  });
  const { labelname } = formData;

  const [detailMsg, setMesgDetail] = useState('')
  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  async function onSubmit() {
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
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [lnge, setLnge] = useState('ar');
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (er) => {
    setLnge(er);
    setAnchorEl(null);
  };

  useEffect(() => {
    onSubmit();
  }, []);


  const filter = async e => {
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
      </div>
      <div className={styles.detailDiv}>
        <div className={styles.detail}>
          <div className={styles.header}>
            {/* <p className={styles.p}>Chanon</p> */}
            <Button
              id="basic-button"
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
              style={{ color: 'black', fontWeight: 'bold' }}
            >
              {lnge}
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              // onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              <MenuItem onClick={() => handleClose('ar')}>Arabe</MenuItem>
              <MenuItem onClick={() => handleClose('fr')}>French</MenuItem>
              <MenuItem onClick={() => handleClose('en')}>Englishe</MenuItem>
            </Menu>
          </div>
          <div className={styles.description}>
            <h2>{labelname} :</h2>
            <span>{detailMsg}</span>
          </div>
        </div>
        <div className={styles.search} >
          <input
            style={{ height: '40px', width: '90%', border: 'solid 2px grey', borderRadius: '10px', paddingLeft: '8px', paddingRight: '8px' }}
            name='labelname'
            type='text'
            id='labelname'
            placeholder='Search ....'
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
      </div>
    </div>
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
