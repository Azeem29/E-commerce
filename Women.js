import React from 'react'
import {Link,useNavigate} from 'react-router-dom';
import axios from 'axios'
import highwaisted from '../assets/highwaisted.jpg';
import oversized from '../assets/oversizedblazer.jpg';
import pocketlegins from '../assets/pocketlegins.jpg';
import classicboots from '../assets/classicboots.webp';
import arizonasandals from '../assets/arizonasandals.jpg';
import crossbag from '../assets/crossbag.jpg';
import erikasunglasses from '../assets/erikasunglasses.webp';
import foundation from '../assets/foundation.png';
import lipstick from '../assets/lipstick.webp';
import olapex from '../assets/olapex.jpg';
import bracelet from '../assets/bracelet.jpg';
import earring from '../assets/earring.webp';

export default function Women() {
  const navigate = useNavigate();
  const products = [
    {
      Id:21,
      Name:'Levi’s High-Waisted Skinny Jeans',
      Description: 'Classic skinny jeans made with stretch denim for comfort and a flattering fit. Features a high-rise waist and timeless style. Perfect for casual wear.',
      Price: '$80',
      imageUrl:highwaisted
    },
    {
      Id:22,
      Name: 'Zara Oversized Blazer',
      Description: 'A chic, oversized blazer with a tailored fit, padded shoulders, and a single-button closure. Great for office wear or layering over casual outfits.',
      Price: '$120',
      imageUrl:oversized
    },
    {
      Id:23,
      Name: 'Athleta Salutation Stash Pocket Leggings',
      Description: 'High-performance leggings with ultra-soft fabric, moisture-wicking technology, and side pockets. Perfect for yoga, gym sessions, or lounging.',
      Price: '$98',
      imageUrl:pocketlegins
    },
    {
      Id:24,
      Name:'UGG Classic Short II Boots',
      Description: 'Iconic sheepskin boots with a cozy fleece lining and durable sole. Ideal for keeping warm during the colder months.',
      Price: '$170',
      imageUrl:classicboots
    },
    {
      Id:25,
      Name:'Birkenstock Arizona Sandals',
      Description: 'Stylish and comfortable sandals featuring a cork-latex footbed and adjustable straps. Perfect for casual outings or summer days.',
      Price: '$135',
      imageUrl: arizonasandals
    },
    {
      Id:26,
      Name: 'Michael Kors Jet Set Medium Crossbody Bag',
      Description: 'A sleek and functional crossbody bag made from durable saffiano leather. Features multiple compartments and a modern design.',
      Price: '$150',
      imageUrl: crossbag
    },
    {
      Id:27,
      Name:'Ray-Ban Erika Sunglasses',
      Description: 'Lightweight sunglasses with a round frame, rubberized finish, and UV protection lenses. Perfect for everyday use with a touch of sophistication.',
      Price: '$160',
      imageUrl:erikasunglasses
    },
    {
      Id:28,
      Name: 'Estée Lauder Double Wear Foundation',
      Description: 'A long-lasting, full-coverage foundation with a natural matte finish. Stays flawless for up to 24 hours and is available in multiple shades.',
      Price: '$48',
      imageUrl: foundation
    },
    {
      Id:29,
      Name: 'Charlotte Tilbury Pillow Talk Lipstick',
      Description: 'A creamy, long-lasting lipstick in a universally flattering pink-nude shade. Perfect for both casual and formal occasions.',
      Price: '$35',
      imageUrl: lipstick
    },
    {
      Id:30,
      Name:'Olaplex No. 3 Hair Perfector',
      Description: 'A restorative hair treatment that repairs damaged strands and strengthens hair from within. Suitable for all hair types.',
      Price: '$30',
      imageUrl:olapex
    },
    {
      Id:31,
      Name: 'Pandora Moments Charm Bracelet',
      Description: 'A timeless bracelet made from sterling silver, perfect for adding charms to mark special moments.',
      Price: '$75',
      imageUrl:bracelet
    },
    {
      Id:32,
      Name: 'Kate Spade New York Stud Earrings',
      Description: 'Simple yet elegant stud earrings with gold-tone hardware and sparkling stones. Great for both daily wear and special occasions.',
      Price: '$40',
      imageUrl: earring
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
        <div>{data.Price}</div>
        <button style={{marginTop:'5%',color:'white', background:'linear-gradient(to right, grey, black)',borderRadius:5,padding:'2%',cursor:'pointer'}} onClick={()=>Cart(data)}>Add to Cart</button>
        <button style={{color:'white', background:'linear-gradient(to right, grey, black)',borderRadius:5,marginLeft:'35%',padding:'2%',cursor:'pointer'}} onClick={()=> navigate('/Landing/Buy',{state: {product:data}})}>Buy Now</button>
       </div>
      ))}
      </div>
      </div>
    </div>
  )
}
