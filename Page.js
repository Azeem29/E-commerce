import React,{useState} from 'react'
import {Link} from 'react-router-dom';
import style from '../styles/style.css'
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

export default function Page() {
  const history = useNavigate();

  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  
  async function submit(e){
    e.preventDefault();
    try{
     const res = await axios.post("http://localhost:8000/",{
      name,email,password
     })
     .then(res=>{
      if(res.data.token){
        const token = res.data.token;
        localStorage.setItem('token',token);
        localStorage.setItem("email",res.data.user.email);
        history('/home');
        
      }
      else
      alert("Wrong Credentials");
     })
     .catch(e=>{
      console.log(e);
     })
    }
    catch(e){
console.log(e);
    }
  }
  return (
    <div className='background'>
    <div className='container'>
      <h1 className='heading'>Welcome Back</h1>
      <h4 style={{textAlign:'center',color:'grey'}}>Please enter your details</h4>
      <form action='/Page' method='POST'>
      
      <div className='inputContainer'>
        <label>Email:</label>
        <input type="email" placeholder='Enter Email' name='email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
      </div>
      <div className='inputContainer'>
        <label>Password:</label>
        <input type="password" placeholder='Enter Password' name='password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
      </div>
        <button className='submit' style={{width:'55%',marginBottom:'5%',padding:'1%',border:'none',cursor:'pointer',backgroundColor:'blue',color:'white',fontFamily:'sans-serif',fontSize:16,borderRadius:'5px',padding:'2%'}} type='submit' onClick={submit}>Login</button><br></br>
        <Link to='/Signup'>Don't have an Account?</Link>
      </form>
    </div>
    </div>
  )
}
