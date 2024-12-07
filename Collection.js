import React, { useState } from 'react';
import style from '../styles/style.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Oversized from '../assets/Oversized.webp';
import CropTop from '../assets/Croptop.jpg';
import Knitwear from '../assets/Knitwear.webp';
import widelegtrousers from '../assets/widelegtrousers.webp';
import cargopants from '../assets/cargopants.jpg';
import denimjeans from '../assets/denimjeans.jpg';
import bomberjackets from '../assets/bomberjackets.jpg';
import tiereddress from '../assets/tiereddress.jpg';
import shackets from '../assets/shackets.jpg';
import trenchcoats from '../assets/trenchcoats.jpg';
import ReactModal from 'react-modal';

ReactModal.setAppElement('#root');

export default function Collection() {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const datas = [
    {
      Id:1,
      Name: 'Oversized Shirts',
      imageUrl: Oversized,
      Description:
        'Available in cotton or flannel materials, pastel or neutral colors. Suitable for casual and layered looks',
      Price: 25,
    },
    {
      Id:2,
      Name: 'Crop Tops',
      imageUrl: CropTop,
      Description:
        'Stylish designs, including ribbed, printed, or plain options. Popular among younger audiences.',
      Price: 10,
    },
    {
      Id:3,
      Name: 'Knitwear',
      imageUrl: Knitwear,
      Description:
        'Lightweight, cozy tops with cable-knit patterns or ribbed textures, perfect for cooler weather',
      Price: 30,
    },
    {
      Id:4,
      Name: 'Wide-Leg Trousers',
      imageUrl: widelegtrousers,
      Description:
        'High-waisted, flowy fit, often in linen or polyester blends for casual or formal wear.',
      Price: 30,
    },
    {
      Id:5,
      Name: 'Cargo Pants',
      imageUrl: cargopants,
      Description:
        'Functional with multiple pockets, available in khaki, olive green, or black',
      Price: 35,
    },
    {
      Id:6,
      Name: 'Denim Jeans',
      imageUrl: denimjeans,
      Description:
        'Ripped or classic styles, high-waisted options, or cropped fits in various washes',
      Price: 40,
    },
    {
      Id:7,
      Name: 'Bomber Jackets',
      imageUrl: bomberjackets,
      Description: 'Streetwear-friendly, in neutral, bold, or metallic tones',
      Price: 60,
    },
    {
      Id:8,
      Name: 'Tiered Dresses',
      imageUrl: tiereddress,
      Description:
        ' Layered, flowy designs with floral prints or solid pastel tones',
      Price: 35,
    },
    {
      Id:9,
      Name: 'Shackets (Shirt Jackets)',
      imageUrl: shackets,
      Description:
        'Oversized, warm, and available in plaid or solid wool blends',
      Price: 50,
    },
    {
      Id:10,
      Name: 'Trench Coats',
      imageUrl: trenchcoats,
      Description:
        'Modern updates with oversized collars or cropped styles in neutral tones.',
      Price: 80,
    },
  ];

  const handleSubmit = (item) => {
    console.log('Selected Item:', item); 
    setOpenModal(true);
    setSelectedProduct(item);
  };
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
    <div>
      <div className="row">
        {datas.map((data, index) => (
          <div
            key={index}
            className="collection-item"
            onClick={() => handleSubmit(data)} 
          >
            <img
              src={data.imageUrl}
              height={200}
              width="100%"
              className="hero-image"
              alt={data.Name}
            />
            <div style={{ fontWeight: 'bold', fontSize: '1vw' }}>
              {data.Name}
            </div>
            <div>${data.Price}</div>
            <div style={{ color: 'grey' }}>{data.Description}</div>
          </div>
        ))}
      </div>

      {selectedProduct && (
        <ReactModal
          isOpen={openModal}
          onRequestClose={() => setOpenModal(false)}
          contentLabel="Product Details"
          style={{
            content: {
              top: '50%',
              left: '50%',
              width:'25%',
              height:'70%',
              right: 'auto',
              bottom: 'auto',
              marginRight: '-50%',
              transform: 'translate(-50%, -50%)',
              padding: '20px',
            },
            
            overlay: {
              backgroundColor: 'rgba(0, 0, 0, 0.75)',
            },
          }}
        >
          <div>
            <h2>{selectedProduct.Name}</h2>
            <img
              src={selectedProduct.imageUrl}
              alt={selectedProduct.Name}
              height={200}
              width="100%"
            />
            <p>{selectedProduct.Description}</p>
            <p style={{ fontWeight: 'bold' }}>${selectedProduct.Price}</p>
            <button onClick={() => setOpenModal(false)}>Close</button>
            <button className='addToCart' onClick={()=>Cart(selectedProduct)}>Add to cart</button>
            <button className='buyNow' onClick={()=> navigate('/Landing/Buy',{state: {product:selectedProduct}})}>Buy Now</button>
          </div>
        </ReactModal>
      )}
    </div>
  );
}
