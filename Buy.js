import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ReactModal from 'react-modal';
import axios from 'axios';

export default function Buy() {
    const [openModal, setOpenModal] = useState(false);
    const [Number, setNumber] = useState(null);
    const [Pincode, setPincode] = useState(null);
    const [City, setCity] = useState(null);
    const [State, setState] = useState(null);
    const [HouseNo, setHouseNo] = useState(null);
    const [Area, setArea] = useState(null);
    const [details, setDetails] = useState(null);
    const location = useLocation();
    const { product } = location.state;
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDetails = async () => {
            const email = localStorage.getItem("email");
            if (!email) return;

            try {
                const res = await axios.get("http://localhost:8000/fetchaddress", {
                    params: { email },
                });

                if (res.data.fetch) {
                    setDetails(res.data.fetch);
                }
            } catch (e) {
                console.error("Error fetching address details:", e);
            }
        };

        fetchDetails();
    }, []); 

    const submit = async (e) => {
        e.preventDefault();
        const email = localStorage.getItem("email");
        try {
            const res = await axios.post("http://localhost:8000/buy", {
                email,
                Number,
                Pincode,
                City,
                State,
                HouseNo,
                Area,
            });

            if (res.data === "Address Saved") {
                alert("Address Saved");
                const updatedDetails = await axios.get("http://localhost:8000/fetchaddress", {
                    params: { email },
                });
                if (updatedDetails) {
                    setDetails(updatedDetails.data.fetch);
                    setOpenModal(false);
                }
            } else {
                alert("Some technical error");
            }
        } catch (e) {
            console.error("Error:", e);
        }
    };

    return (
        <div className="body">
            <div className={`container2 ${openModal ? 'blur-background' : ''}`}>
                <h2 style={{ marginLeft: '5%', fontSize: '1.5vw' }}>Order Summary</h2>
                <div className="address">
                    <h3 style={{ fontSize: '1.5vw' }}>
                        Deliver to:
                        <button
                            type="submit"
                            style={{
                                fontSize: '1.2vw',
                                marginLeft: '60%',
                                cursor: 'pointer',
                                background: 'linear-gradient(to right, grey, black)',
                                color: 'white',
                                borderRadius: 5,
                            }}
                            onClick={() => setOpenModal(true)}
                        >
                            Change
                        </button>
                    </h3>
                    <div style={{ width: '15vw', marginLeft: '10%', textAlign: 'left' }}>
                        {details ? (
                            <>
                                <h3 style={{ fontSize: '1.2vw' }}>{details.name}</h3>
                                <p style={{ fontSize: '1.1vw' }}>
                                    House No. - {details.HouseNo}, {details.Area}, {details.City}, {details.State} -{' '}
                                    {details.Pincode}
                                </p>
                            </>
                        ) : (
                            <p>Loading...</p>
                        )}
                    </div>
                </div>
                <div className="summary">
                    <div style={{ width: '15vw' }}>
                        <img
                            src={product.imageUrl}
                            style={{ height: '30vh', width: '15vw', borderRadius: 5 }}
                            alt="Product"
                        />
                        <h3 style={{ fontSize: '1.2vw' }}>{product.Name}</h3>
                        <p style={{ fontSize: '1.1vw' }}>{product.Description}</p>
                        <h3 style={{ fontSize: '1.2vw' }}>${product.Price}</h3>
                    </div>
                    <div className="price">
                        <h3 style={{ fontSize: '2vw' }}>Price Details:</h3>
                        <p style={{ fontSize: '1.3vw', color: 'grey' }}>
                            Price<span style={{ marginLeft: '55%' }}>{product.Price}</span>
                        </p>
                        <p style={{ fontSize: '1.3vw', color: 'grey' }}>
                            Platform Fee:<span style={{ marginLeft: '40%' }}>$1</span>
                        </p>
                        <p style={{ fontSize: '1.3vw', color: 'grey' }}>
                            Delivery Charges:<span style={{ marginLeft: '10%', color: 'green' }}>Free Delivery</span>
                        </p>
                        <p
                            style={{
                                fontSize: '1.3vw',
                                fontWeight: 'bold',
                                borderTop: '1px solid black',
                                borderBottom: '1px solid black',
                                padding: '2% 0 2% 0',
                            }}
                        >
                            Total Amount:<span style={{ marginLeft: '35%' }}>{product.Price+1}</span>
                        </p>
                        <h3>
                            Payment Methods:
                        </h3>
                        <div style={{display:'flex'}}>

                        <input type='radio' style={{height:'2vh',width:'2vw',backgroundColor:'white'}}></input><p style={{marginTop:'-0.2%',fontSize:'1vw',fontWeight:'bold'}}>Cash on delivery</p>
                        </div>
                    </div>
                </div>
                <button
                    type="submit"
                    style={{
                        color: 'white',
                        fontSize: '1.3vw',
                        background: 'linear-gradient(to right, grey, black)',
                        borderRadius: 5,
                        cursor: 'pointer',
                    }}
                >
                    Place Order
                </button>
                <ReactModal
                    isOpen={openModal}
                    onRequestClose={() => setOpenModal(false)}
                    style={{
                        content: {
                            width: '60%',
                            marginLeft: '10%',
                            backgroundColor: 'white',
                        },
                    }}
                >
                    <h2 style={{ marginTop: '0%' }}>
                        Address Details:
                        <button
                            onClick={() => setOpenModal(false)}
                            style={{
                                marginTop: '-10%',
                                marginLeft: '92%',
                                fontSize: '1.5vw',
                                backgroundColor: 'white',
                                border: 'none',
                                cursor: 'pointer',
                            }}
                        >
                            X
                        </button>
                    </h2>
                    <form onSubmit={submit}>
                        <div className="inputContainer">
                            <label>Phone Number:</label>
                            <input
                                type="number"
                                name="PhoneNumber"
                                value={Number}
                                onChange={(e) => setNumber(e.target.value)}
                                required
                            />
                        </div>
                        <div className="inputContainer">
                            <label>Pincode:</label>
                            <input
                                type="text"
                                name="Pincode"
                                value={Pincode}
                                onChange={(e) => setPincode(e.target.value)}
                                required
                            />
                        </div>
                        <div className="inputContainer">
                            <label>State:</label>
                            <input
                                type="text"
                                name="State"
                                value={State}
                                onChange={(e) => setState(e.target.value)}
                                required
                            />
                        </div>
                        <div className="inputContainer">
                            <label>City:</label>
                            <input
                                type="text"
                                name="City"
                                value={City}
                                onChange={(e) => setCity(e.target.value)}
                                required
                            />
                        </div>
                        <div className="inputContainer">
                            <label>House No.:</label>
                            <input
                                type="text"
                                name="HouseNo"
                                value={HouseNo}
                                onChange={(e) => setHouseNo(e.target.value)}
                                required
                            />
                        </div>
                        <div className="inputContainer">
                            <label>Area:</label>
                            <input
                                type="text"
                                name="Area"
                                value={Area}
                                onChange={(e) => setArea(e.target.value)}
                                required
                            />
                        </div>
                        <input
                            type="submit"
                            value="Save"
                            style={{
                                backgroundColor: 'blue',
                                color: 'white',
                                fontSize: 15,
                                padding: '1% 2% 1% 2%',
                            }}
                        />
                        <br></br>
                    </form>
                </ReactModal>
            </div>
        </div>
    );
}
