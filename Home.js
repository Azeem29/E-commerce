import React, { useEffect, useState } from 'react';
import axios from 'axios';
import user from '../assets/user.png';
import {Link} from 'react-router-dom';
import { useLocation,useNavigate } from 'react-router-dom';
import style from '../styles/style.css';

export default function Home() {
  const [Details, setDetails] = useState(null); // Initialize as null
  const location = useLocation();
  const [Userimage, setUserimage] = useState(null)
  const { name } = location.state || {};
  const navigate = useNavigate();
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/home');
      return;
    }
  
    // Validate token and fetch user details
    axios.get('http://localhost:8000/authentication', {
      headers: { 'Authorization': `Bearer ${token}` },
    })
    .then(res => {setDetails(res.data.user);
     console.log(res.data.user);
  })
    .catch(err => {
      console.error(err);
      alert('Invalid or expired token');
      navigate('/home');
    });
  
    // Fetch user image
    const email = localStorage.getItem("email");
    axios.get("http://localhost:8000/fetchImage", { params: { email } })
      .then(res => {
        if (res.data.image) {
          setUserimage(`http://localhost:8000${res.data.image}`);
        } else {
          alert("Image not found");
        }
      })
      .catch(err => console.error("Error occurred:", err));
  }, [navigate]);
  

  const uploadprofile = async () => {
    try {
      const email = localStorage.getItem('email');
      const data = new FormData();
      data.append('profileImage', Userimage); 
      data.append('email', email);
  
      const res = await axios.post("http://localhost:8000/upload", data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
  
      if (res.data === 'Profile Updated') {
        alert("Profile Updated refresh to see changes");
      } else {
        alert("Something went wrong");
      }
    } catch (e) {
      console.error("Error uploading profile:", e);
      alert("Internal Server Error");
    }
  };
  return (
    <div className='body'>
      <div>
        <h1 className='head'>My Profile</h1>
      </div>
      
      <ol>
      <li><Link to="/Landing">Home</Link></li>
        <li><Link to="/home">Profile</Link></li>
        <li><a href="/Cart">Cart</a></li>
        <li><a href="">About</a></li>
        <li><Link to="/Contact">Contact</Link></li>
        
      </ol>
        <div className='profile'>
        {
  Userimage ?
  <img className='circle' src={Userimage} alt="User Profile" /> :
  <img className='circle' src={user} alt="Default Profile" />
}
        <input type='file' onChange={(e)=>{ setUserimage(e.target.files[0])}}></input><button onClick={()=> uploadprofile()}>Upload</button>
          <p style={{marginTop:'5%',fontSize:'1.5vw'}}>Username: <span style={{marginLeft:'60%'}}>{Details && Details.name ? Details.name : 'Guest'}</span></p>
          <p style={{fontSize:'1.5vw'}}>Email: <span style={{marginLeft:'50%'}}>{Details && Details.email ? Details.email : 'Guest'}</span></p>
          <p style={{fontSize:'1.5vw'}}>Phone Number: <span style={{marginLeft:'45%'}}>{Details && Details.phoneNumber ? Details.phoneNumber : ''}</span></p>
        </div>
      </div>
  );
}
