import React,{useState} from 'react'
import style from '../styles/style.css'
import axios from 'axios';
import {useNavigate,Link} from 'react-router-dom';

export default function Signup() {
  const [name,setName] = useState('');
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const history = useNavigate();

  async function submit(e) {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8000/Signup", { name, email, password });
      if (res.data === "Already exists") {
        alert("User already exists");
      } else if (res.data === "Sign-Up completed") {
        history("/");
      }
      console.log(res.data);
    } catch (e) {
      alert("Wrong details");
      console.log(e);
    }
  }

  return (
    <div className='background'>
      <div className='container' style={{height:'55%'}}>
      <h1 className='heading'>Sign-Up</h1>
      <form onSubmit={submit}>
        <div className='inputContainer'>
          <label>Name:</label>
          <input type="text" placeholder='Enter Full Name' name='name' value={name} onChange={(e)=> setName(e.target.value)} required />
        </div>
        <div className='inputContainer'>
          <label>Email:</label>
          <input type="email" placeholder='Enter Email' name='email' value={email} onChange={(e) => setemail(e.target.value)} required />
        </div>
        <div className='inputContainer'>
          <label>Password:</label>
          <input type="password" placeholder='Enter Password' name='password' value={password} onChange={(e) => setpassword(e.target.value)} required />
        </div>
        <input type="submit" value="Sign Up" style={{backgroundColor:'blue',color:'white',fontSize:15,cursor:'pointer'}}/><br></br>
        <br></br>
        <Link to='/'>Already have an Account</Link>
      </form>
      </div>
    </div>
  );
}
