import React from 'react'
import {Link,useNavigate} from 'react-router-dom';
import axios from 'axios';
import Tiffany from '../assets/Tiffany.jpg';
import pandora from '../assets/pandora.jpg';
import swarovski from '../assets/Swarovski.jpg';
import katespade from '../assets/katespade.jpg';
import tanishq from '../assets/tanishq.webp'
import sparkling from '../assets/sparkling.jpg';
import clich from '../assets/clicH.webp';
import mejuri from '../assets/mejuri.jpg';
import michael from '../assets/michael.jpg';

export default function Jewellery() {
  const navigate = useNavigate();
  const products = [
    {
      Id:44,
      Name:'Tiffany & Co. Return to Tiffany Heart Tag Pendant',
      Description: 'An iconic sterling silver necklace featuring a heart-shaped tag engraved with "Return to Tiffany" branding. Perfect for a timeless and elegant look.',
      Price: '250',
      imageUrl:Tiffany
    },
    {
      Id:45,
     Name: 'Pandora Sparkling Infinity Necklace',
     Description: 'A delicate necklace featuring a sterling silver infinity pendant adorned with cubic zirconia stones. Symbolizes eternal love and connection.',
     Price: '100',
     imageUrl:sparkling
    },
    {
      Id:46,
      Name:'Swarovski Solitaire Pendant Necklace',
      Description: 'A simple yet elegant necklace with a single round-cut Swarovski crystal set in a rhodium-plated chain. Ideal for everyday wear or formal occasions.',
      Price: '85',
      imageUrl:swarovski
    },
    {
      Id:47,
      Name:'Kate Spade New York Mini Small Square Stud Earrings',
      Description: 'Chic and versatile stud earrings featuring faceted glass stones in a gold-tone setting. Great for both casual and formal outfits.',
      Price: '40',
      imageUrl:katespade
    },
    {
      Id:48,
      Name:'Tanishq Diamond Stud Earrings',
      Description: 'Beautiful diamond earrings set in 18K gold. A perfect blend of simplicity and luxury for special occasions.',
      Price: '550',
      imageUrl:tanishq
    },
    {
      Id:49,
      Name: 'Pandora Moments Snake Chain Bracelet',
      Description: 'A sterling silver charm bracelet with a smooth snake chain. Perfect for adding Pandora charms to create a personalized look.',
      Price: '65',
      imageUrl:pandora
    },
    {
      Id:50,
      Name: 'Hermès Clic H Bracelet',
      Description: 'A fashionable bangle with enamel inlay and gold-plated hardware. A versatile accessory for both casual and elegant styles.',
      Price: '640',
      imageUrl:clich
    },
    {
      Id:51,
      Name: 'Mejuri Dome Ring',
      Description: 'A trendy and minimalist gold vermeil ring with a bold, rounded shape. Great for stacking or wearing solo for a chic statement.',
      Price: '75',
      imageUrl:mejuri
    },
    {
      Id:53,
      Name: 'Michael Kors Rose Gold Tone Chain Anklet',
      Description: 'A sleek anklet in rose gold-tone stainless steel with a delicate chain and subtle charm detail. Ideal for subtle elegance.',
      Price: '60',
      imageUrl:michael
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
