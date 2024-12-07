import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Cart() {
  const [details, setDetails] = useState([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      const email = localStorage.getItem('email');
      try {
        const res = await axios.get("http://localhost:8000/fetchCart", {
          params: { email },
        });
        if (res.data.status === "Items Fetched") {
          console.log(res.data.items);
          setDetails(res.data.items.productId.map((productId, index) => ({
            id: productId,
            name: res.data.items.productName[index],
            description: res.data.items.productDescription[index],
            price: res.data.items.productPrice[index],
            imageUrl: res.data.items.productImage[index],
          })));
        }
      } catch (e) {
        console.error("Error fetching cart items:", e);
      }
    };

    fetchCartItems();
  }, []);
  const removeCartItem = async (id) => {
    const email = localStorage.getItem('email');
    try{
    const res = await axios.post("http://localhost:8000/removeItem",
      { email ,
        productId:id
      }
    );
    if(res.data.status === 'Item Removed'){
      setDetails((prevDetails) => prevDetails.filter((item)=> item.id !== id));
    }
  }
  catch(e){

  }
  }
  const calculateTotal = () => {
    return details.reduce((total, item) => total + item.price, 0);
  };
  return (
    <div>
      <div style={{height:'10vh',backgroundColor:'rgb(231, 226, 226)',marginTop:'-1.7%',paddingTop:'2%',paddingBottom:'2%'}}>
      <h3 style={{fontSize:'2vw',marginLeft:'5%'}}>Shopping Cart</h3>
      </div>
      <div style={{display:'flex'}}>
      <div className='container2'>
      {details.length === 0 ? (
        <p>No items in the cart</p>
      ) : (
        <div style={{width:'55vw',marginLeft:'5%',marginTop:'5%'}}>
          {details.map((item, index) => (
            <div key={item.id} style={{width:'15vw',marginBottom:'10%',paddingLeft:'5%',display:'flex'}}>
              <div>
              <img src={details.imageUrl} width={200} height={200}></img>
              <h4>{item.name}</h4>
              <p>{item.description}</p>
              <h3 style={{fontSize:'1.2vw'}}>Price: ${item.price}</h3>
              </div>
              <div>
              <button className='remove' onClick={() => removeCartItem(item.id)}>Remove</button>
              </div>
              
            </div>
          ))}
          
          <div style={{marginBottom:'10%'}}>

            </div>
        </div>
      )}
      </div>
      <div style={{backgroundColor:'rgb(231, 226, 226)',width:'35vw',borderRadius:10,padding:'1% 2% 1% 2%',marginTop:'10%',marginLeft:'5%'}}>
      <div className='price'>
            <h3 style={{ fontSize: '2vw' }}>Price Details:</h3>
            <p style={{ fontSize: '1.3vw', color: 'grey' }}>
                            Price<span style={{ marginLeft: '45%' }}>${calculateTotal().toFixed(2)}</span>
                        </p>
                        <p style={{ fontSize: '1.3vw', color: 'grey' }}>
                            Platform Fee:<span style={{ marginLeft: '40%' }}>$1</span>
                        </p>
                        <p style={{ fontSize: '1.3vw', color: 'grey' }}>
                            Delivery Charges:<span style={{ marginLeft: '10%', color: 'green' }}>Free Delivery</span>
                        </p>
                        <h3 style={{fontSize:'1.5vw'}}>
                            Payment Methods:
                        </h3>
                        <div style={{display:'flex'}}>

                        <input type='radio' style={{height:'2vh',width:'2vw',backgroundColor:'white'}}></input><p style={{marginTop:'-0.2%',fontSize:'1vw',fontWeight:'bold'}}>Cash on delivery</p>
                        </div>
              </div>
          <div>
            <h3 style={{fontSize: '1.3vw',marginLeft:'20%'}}>Total Amount:${calculateTotal().toFixed(2)}</h3>
          </div>
          <button
                    type="submit"
                    style={{
                        marginLeft:'30%',
                        color: 'white',
                        padding: '1% 2% 1% 2%',
                        fontSize: '1.3vw',
                        background: 'linear-gradient(to right, grey, black)',
                        borderRadius: 5,
                        cursor: 'pointer',
                    }}
                >
                    Place Order
                </button>
      </div>
      <div style={{marginTop:'5%'}}>

      </div>
      </div>
    </div>
  );
}
