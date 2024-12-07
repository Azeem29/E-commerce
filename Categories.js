import React from 'react'
import {Link} from 'react-router-dom';
import Men from '../assets/mens.webp'
import Women from '../assets/womens.png'
import Kids from '../assets/kids.jpg'
import Jewellery from '../assets/jewellery.jpg'
import Shoes from '../assets/shoes.jpg'
const types = [{
    Name:"Men's",
    imageURL:Men,
    Url:"Men"
},
{
    Name:"Women's",
    imageURL:Women,
    Url:"Women"
},
{
    Name:"Kids",
    imageURL:Kids,
    Url:"Kids"
},
{
    Name:"Jewellery",
    imageURL:Jewellery,
    Url:"Jewellery"
},
{
    Name:"Shoes",
    imageURL:Shoes,
    Url:"Shoes"
}
]
export default function Categories() {
  return (
    <div>
    {types.map((data,index)=>(
        <div key={index} className='categoryContainer'>
        <div className='category'>
            <Link to={`/Landing/${data.Url}`}><img src={data.imageURL} className='hero-image2'/></Link>
            <div style={{fontSize:'1.2vw',fontFamily:'sans-seriff,monospace',marginLeft:'30%',marginTop:'2%'}}>{data.Name}</div>
            
       </div>
       </div>
    ))}
      
    </div>
  )
}
