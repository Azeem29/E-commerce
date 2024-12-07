import React from 'react'
import {Link} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import leatherJacket from '../assets/leatherJacket.jpg';
import slimFit from '../assets/slimFit.png';
import runningSneakers from '../assets/runningSneakers.jpg';
import Chinos from '../assets/Chinos.jpg';
import analogWatch from '../assets/analogWatch.jpg';
import sunGlasses from '../assets/sunGlasses.jpg';
import sweatShirt from '../assets/sweatShirt.webp';
import fitJeans from '../assets/fitJeans.jpg';
import gymBag from '../assets/gymBag.jpg';
import leatherWallet from '../assets/leatherWallet.jpg';

export default function Men() {
    const navigate = useNavigate();
    const products = [
        {
            Id:11,
            Name:'Classic Leather Jacket',
            Description: 'A timeless leather jacket crafted with premium genuine leather, featuring a modern slim fit and durable zippers.',
            Price: '149.99',
            imageUrl:leatherJacket
        },
        {
            Id:12,
            Name:'Slim Fit Formal Shirt',
            Description: 'A stylish, slim-fit formal shirt made with breathable cotton, available in various colors. Perfect for office or casual wear.',
            Price: '39.99',
            imageUrl:slimFit
        },
        {
            Id:13,
            Name:"Men's Running Sneakers",
            Description: "Lightweight and comfortable running sneakers designed for optimal performance and style. Available in multiple colors.",
            Price: "89.99",
            imageUrl:runningSneakers
        },
        {
            Id:14,
            Name:'Casual Chinos',
            Description: 'Soft, stretchy casual chinos with a modern fit. Ideal for work or weekend outings.',
            Price: '59.99',
            imageUrl:Chinos
        },
        {
            Id:15,
            Name:'Analog Watch',
            Description: 'A sleek analog watch with a leather strap, featuring a stainless steel case and water resistance up to 50 meters.',
            Price: '120.00',
            imageUrl:analogWatch
        },
        {
            Id:16,
            Name:'Polarized Sunglasses',
            Description: 'Trendy and functional sunglasses with polarized lenses to protect your eyes and enhance your style.',
            Price: '69.99',
            imageUrl:sunGlasses
        },
        {
            Id:17,
            Name:'Hooded Sweatshirt',
            Description: 'A comfortable hooded sweatshirt made from high-quality cotton fleece, perfect for cool weather.',
            Price: '49.99',
            imageUrl:sweatShirt
        },
        {
            Id:18,
            Name:'Classic Fit Jeans',
            Description: 'Durable classic-fit jeans with a mid-rise waist and five-pocket design, made from stretchable denim.',
            Price: '59.99',
            imageUrl:fitJeans
        },
        {
            Id:19,
            Name:'Sports Gym Bag',
            Description: 'A spacious and stylish gym bag with multiple compartments for all your workout essentials.',
            Price: '39.99',
            imageUrl:gymBag
        },
        {
            Id:20,
            Name:'Leather Wallet',
            Description: 'A sleek and durable leather wallet with multiple card slots and a cash compartment, perfect for everyday use.',
            Price: '29.99',
            imageUrl:leatherWallet
            
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
