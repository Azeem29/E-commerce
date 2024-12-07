import React,{useState} from 'react'
import style from '../styles/style.css';
import {Link} from 'react-router-dom';
import Collection from '../components/Collection';
import Categories from '../components/Categories';
import image from '../assets/hero-section.png';
import ReactModal from 'react-modal';

export default function Landing(){
  
  return (
    <div className='Landing'>
      <div className='main'>
      <div className='head'>
        <span className='title'>SHOPPERS</span>
        <ol className='Landing-bar'>
            <li><a href="Landing.js">Home</a></li>
            <li><a href=''>Features</a></li>
            <li><a href=''>Community</a></li>
            <li><a href=''>Blog</a></li>
            <li><a href=''>Pricing</a></li>
        </ol>
      </div>
      <div className='Landing-frame'>
        <div style={{width:420,marginLeft:'15%',paddingTop:'10%'}}>
          <span style={{fontSize:'2vw',fontFamily:'sans-seriff,monospace',fontWeight:'bold',marginTop:'10%'}}>BE A CHERRY ON PIE IN ANY SITUATION.</span><br></br>
          <br></br>
          <span style={{color:'grey',paddingTop:10,fontSize:'1vw'}}>Experiment, mix and showcase colors, textures and styles!!</span><br></br>
          <span style={{color:'grey',paddingTop:10,fontSize:'1vw'}}>Be yourself and impress others!!</span>
          <br></br>
          <br></br>
          <button style={{fontSize:'1.1vw',padding:'2%',color: 'white',background: 'linear-gradient(to right, grey, black)',borderRadius:5,border:'1px solid black',cursor:'pointer'}}>Shop Now</button>
        </div>
        <img src={image} style={{height:700,marginLeft:'40%',marginTop:"-33%"}}/>
      </div>
      <div style={{fontSize:'2.5vw',marginLeft:'5%',fontFamily:"sans-seriff,monospace",fontWeight:'bold',marginTop:'3%'}}>Categories</div>
      <Categories />
      <div>
        <h2 style={{fontSize:'2.5vw',marginTop:'5%',marginLeft:'5%',fontFamily:"sans-seriff,monospace"}}>Latest Collections--</h2>
      </div>
      <Collection />
      <div className='end'>
        <footer>
      <h3>Philatelic Connect</h3>
      <h5>Copyright @2024 Landify UI Kit.</h5>
      <h5>All rights reserved</h5>
      </footer>
      <footer>
        <h3>Company</h3>
      <h5>About us</h5>
      <h5>Blog</h5>
      <h5>Contact us</h5>
      <h5>Pricing</h5>
      </footer>
      <footer>
<h3>Support</h3>
<h5>Help Center</h5>
<h5>Terms of Service</h5>
<h5>Legal</h5>
<h5>Privacy Policy</h5>
<h5>Status</h5>
      </footer>
      </div>
      </div>
      
    </div>
  )
}
