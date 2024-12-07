import React from 'react'
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import airmax from '../assets/airmax.jpg';
import ultraboost from '../assets/ultraboost.jpg';
import pegasus39 from '../assets/pegasus39.jpg';
import timberland from '../assets/timberland.jpg';
import cloudfoam from '../assets/cloudfoam.webp';
import drmartens from '../assets/drmartens.jpg';
import pumaclassic from '../assets/pumaclassic.jpg';
import clarks from '../assets/clarks.jpg';
import stevemadden from '../assets/stevemadden.jpg';
import freshfoam from '../assets/freshfoam.jpg';

export default function Shoes() {
  const navigate = useNavigate();
  const products = [
    {
      Id:54,
      Name:'Nike Air Max 270',
      Description:'Designed for all-day comfort, the Air Max 270 features a breathable mesh upper, a large Air unit in the heel for cushioning, and a modern, sporty design. Perfect for casual wear or light exercise.',
      Price: '150',
      imageUrl:airmax
    },
    {
      Id:55,
      Name:'Adidas Ultraboost 22',
      Description: 'A premium running shoe with a responsive Boost midsole, Primeknit upper for flexibility, and Continental rubber outsole for superior traction. Ideal for long-distance running or daily wear.',
      Price: '190',
      imageUrl:ultraboost
    },
    {
      Id:56,
      Name:'Nike Air Zoom Pegasus 39',
      Description: 'A lightweight running shoe with React foam for comfort and Air Zoom units for added responsiveness. Perfect for running or walking long distances.',
      Price: '130',
      imageUrl:pegasus39
    },
    {
      Id:57,
      Name: 'Timberland Classic 6-Inch Boot',
      Description: 'A rugged and durable boot made with premium waterproof leather and padded collars. Perfect for outdoor adventures or a rugged, stylish look.',
      Price: '210',
      imageUrl:timberland
    },
    {
      Id:58,
      Name:'Adidas Cloudfoam Pure 2.0',
      Description: 'A stylish yet comfortable sneaker with a stretchy knit upper and Cloudfoam cushioning. Ideal for casual wear or light workouts.',
      Price: '75',
      imageUrl:cloudfoam
    },
    {
      Id:59,
      Name: 'Dr. Martens 1460 Smooth Leather Boots',
      Description: 'Iconic lace-up boots with durable leather construction, AirWair cushioned soles, and a timeless design. Great for a bold, edgy look.',
      Price: '180',
      imageUrl:drmartens
    },
    {
      Id:60,
      Name: 'Puma Suede Classic+',
      Description: 'A timeless sneaker with a soft suede upper, cushioned midsole, and iconic design. Ideal for casual, everyday style.',
      Price: '65',
      imageUrl:pumaclassic
    },
    {
      Id:61,
      Name:'Clarks Desert Boot',
      Description: 'This iconic chukka boot features soft leather uppers, crepe soles, and a minimalist design. Versatile for both casual and semi-formal wear.',
      Price: '140',
      imageUrl:clarks
    },
    {
      Id:62,
      Name:'Steve Madden Irenee Sandals',
      Description: 'Elegant block-heel sandals with an ankle strap and a minimalistic design. Perfect for formal occasions or dressing up casual outfits.',
      Price: '90',
      imageUrl:stevemadden
    },
    {
      Id:63,
      Name: 'New Balance Fresh Foam 1080v12',
      Description: 'A premium athletic shoe featuring Fresh Foam cushioning, breathable mesh upper, and a snug fit. Ideal for running or all-day comfort.',
      Price: '160',
      imageUrl:freshfoam
    }
  ];

  async function Cart(product){
    console.log(product);
    const email = localStorage.getItem("email");
    const res = await axios.post("http://localhost:8000/cart",{
      email: email,
      productName: product.Name,
      productId: product.Id,
      productDescription: product.Description,
      productPrice:product.Price,
      productImage: product.imageUrl
    });
    if(res.data === "Product Already in Cart")
      alert("Product already in Cart");
    else
    alert("Product added to cart");
  }

  return (
    <div className='body'>
        <div className='containerCategory'>
      <div className='categoryArea'>
        <h3 style={{textAlign:'center',paddingTop:'5%',borderBottom:'1px solid black',paddingBottom:'10%',fontSize:'1.5vw',fontFamily:'sans-seriff,monospace'}}>Categories</h3>
        <ol>
        <li className='categoryItem'><Link to='/Landing/Men'>Men</Link></li>
            <li className='categoryItem'><Link to='/Landing/Women'>Women</Link></li>
            <li className='categoryItem'><Link to='/Landing/Kids'>Kids</Link></li>
            <li className='categoryItem'><Link to='/Landing/Jewellery'>Jewellery and Watches</Link></li>
            <li className='categoryItem'><Link to='/Landing/Shoes'>Shoes</Link></li>
            <li className='categoryItem'><Link to='/Cart'>Cart</Link></li>
        </ol>
      </div>
      <div className='item-container'>
      {products.map((data,index)=>(
       <div key={index} className='items'>
        <img src={data.imageUrl} style={{width:'15vw',height:'25vh',borderRadius:10,cursor:'pointer'}}></img>
        <div style={{fontSize:'1.2vw',fontWeight:'bold'}}>{data.Name}</div>
        <div style={{fontSize:'1vw',color:'grey'}}>{data.Description}</div>
        <div>${data.Price}</div>
        <button style={{marginTop:'5%',color:'white', background:'linear-gradient(to right, grey, black)',borderRadius:5,padding:'2%',cursor:'pointer'}} onClick={()=>Cart(data)}>Add to Cart</button>
        <button style={{color:'white', background:'linear-gradient(to right, grey, black)',borderRadius:5,marginLeft:'35%',padding:'2%',cursor:'pointer'}} onClick={()=> navigate('/Landing/Buy',{state: {product:data}})}>Buy Now</button>
       </div>
      ))}
      </div>
      </div>
    </div>
  )
}
