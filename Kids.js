import React from 'react'
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import dinosaur from '../assets/dinosaur.webp';
import graphictree from '../assets/graphictree.webp';
import pufferjacket from '../assets/pufferjacket.jpg';
import lego from '../assets/lego.jpg';
import chair from '../assets/chair.webp';
import barbie from '../assets/barbie.jpg';
import sneakers from '../assets/sneakers.jpg';
import crocs from '../assets/crocs.jpg';
import hopzoobag from '../assets/hopzoobag.webp';
import crayola from '../assets/crayola.jpg';
import toychest from '../assets/toychest.jpg'

export default function Kids() {
  const navigate = useNavigate();
  const products = [
    {
      Id:33,
      Name:'Carter’s 3-Piece Dinosaur Pajama Set',
      Description: 'A cozy pajama set featuring fun dinosaur prints, made with soft cotton. Includes a long-sleeve top, matching pants, and a short-sleeve option.',
      Price: '28',
      imageUrl:dinosaur
    },
    {
      Id:34,
      Name:'The Children’s Place Graphic Tees',
      Description: 'Fun and colorful graphic t-shirts with kid-friendly designs like unicorns, superheroes, and animals. Made with 100% cotton for comfort.',
      Price: '12',
      imageUrl:graphictree
    },
    {
      Id:35,
      Name: 'Old Navy Toddler Puffer Jacket',
      Description: 'Lightweight and warm puffer jacket with a hood. Water-resistant and perfect for keeping kids cozy during colder months.',
      Price: '45',
      imageUrl:pufferjacket
    },
    {
      Id:36,
      Name: 'LEGO Classic Creative Brick Box',
      Description: 'A 790-piece LEGO set featuring colorful bricks, wheels, and accessories. Encourages creativity and imaginative play for kids aged 4 and up.',
      Price: '59.99',
      imageUrl: lego
    },
    {
      Id:37,
      Name:'Fisher-Price Laugh & Learn Smart Stages Chair',
      Description: 'An interactive learning chair with songs, phrases, and activities. Helps toddlers learn colors, numbers, and shapes while having fun.',
      Price: '45',
      imageUrl:chair
    },
    {
      Id:38,
      Name: 'Barbie Dreamhouse',
      Description: 'A deluxe dollhouse with three floors, a slide, a pool, and more than 70 accessories. Great for hours of imaginative play.',
      Price: '19.99',
      imageUrl:barbie
    },
    {
      Id:39,
      Name:'Stride Rite Made2Play Sneakers',
      Description: 'Durable sneakers with a washable design and comfortable fit. Features hook-and-loop closures for easy on and off. Perfect for active kids.',
      Price: '15',
      imageUrl:sneakers
    },
    {
      Id:40,
      Name: 'Crocs Kids’ Classic Clog',
      Description: 'Lightweight and fun clogs with ventilation ports and a comfortable fit. Available in a variety of bright colors and designs.',
      Price: '20',
      imageUrl:crocs
    },
    {
      Id:41,
      Name: 'Skip Hop Zoo Kids Backpack',
      Description: 'A colorful and durable backpack featuring fun animal designs like monkeys, owls, and foxes. Includes a side pocket for a water bottle.',
      Price: '10',
      imageUrl:hopzoobag
    },
    {
      Id:42,
      Name: 'Crayola Inspiration Art Case',
      Description: 'A 140-piece art set with crayons, markers, colored pencils, and paper. Perfect for little artists to explore their creativity.',
      Price: '27',
      imageUrl:crayola
    },
    {
      Id:43,
      Name:'Melissa & Doug Wooden Toy Chest',
      Description: 'A spacious and durable toy chest made of wood with a safety-hinged lid. Helps keep play areas tidy.',
      Price: '50',
      imageUrl:toychest
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
