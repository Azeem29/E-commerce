const express = require('express');
const cors = require('cors');
const {collection, cart, image} = require('./MongoDB');
const jwt = require('jsonwebtoken')
const app = express();
const multer = require('multer');
const path = require('path');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/Uploads', express.static(path.join(__dirname, 'Uploads')));
app.use(cors());
app.use(bodyParser.json());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, 'Uploads/');
    console.log('Saving file to:', uploadDir);
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); 
  },
});

const upload = multer({ storage });

app.post('/', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const check = await collection.findOne({ email, password });
    
    if (check) {
      const user = { name: check.name, email: check.email, phoneNumber: check.PhoneNumber,pincode: check.Pincode, state: check.State, city: check.City, houseNo: check.HouseNo, area:check.Area }; 
      const token = jwt.sign({user}, 'JKaziii', { expiresIn: '1h' },(err,token)=>{
        res.json({
          token,user
        })
      });
    } else {
      res.json({ status: "Does not exist" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']; 
  
  if (typeof authHeader !== 'undefined') {
    const bearer = authHeader.split(" ");
    const token = bearer[1]; 
    req.token = token;
    next();
    console.log("Token present, proceeding...");
  } else {
    res.status(403).send({ result: 'Token is not valid' });
    console.log("Failed: Token is not provided");
  }
}


app.get('/authentication', authenticateToken, (req, res) => {
  jwt.verify(req.token, 'JKaziii', (err, decoded) => {
    if (err) {
      res.status(403).send({ result: "Invalid Token" });
    } else {
      req.user = decoded.user;
      res.json({
        message: "Welcome to the Home Page!",
        user: req.user
      });
    }
  });

  console.log('Home page accessed');
  console.log(req.user); 
});

app.post('/Signup', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const check = await collection.findOne({ email });
    if (check) {
      res.json('Already exists');
    } else {
      await collection.create({ name, email, password });
      res.json('Sign-Up completed');
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/upload', upload.single('profileImage'), async (req, res) => {
  try {
    const { email } = req.body;
    const { path: filePath, filename } = req.file;

    const check = await image.findOneAndUpdate(
      { email },
      { $set: { path: filePath, filename } },
      { upsert: true, new: true }
    );

    if (check) {
      res.json("Profile Updated");
    } else {
      res.status(400).json({ error: "Something went wrong" });
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


app.get('/fetchImage', async (req, res) => {
  const { email } = req.query;

  try {
    const fetch = await image.findOne({ email });
    if (fetch) {
      const imageUrl = `/Uploads/${fetch.filename}`;
      res.json({ image: imageUrl });
    } else {
      res.status(404).json({ error: "Image not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Unable to fetch image" });
  }
});

app.post('/buy', async(req,res) => {
  const { email,Number,Pincode,State,City,HouseNo,Area } = req.body;
  try{
    const check = await collection.findOneAndUpdate({ email },
      {
        $set:{ PhoneNumber:Number,Pincode:Pincode,State:State,City:City, HouseNo:HouseNo, Area:Area }
      },
      { new: true }
    );
    if(check)
      res.json("Address Saved");
    else
      res.json({error:"There might be some issue try again"})
  }
  catch (e){
    res.status(500).json({ error: 'Internal Server Error'});
  }
});

app.get('/fetchaddress', async (req,res) => {
  const { email } = req.query;
  try{
    const get = await collection.findOne({email});
    if(get){
      res.json({status:"address fetched", fetch: get});
    }
    else
      res.json({status:"Error in fetching address"});
  }
  catch(e){
    res.status(500).json({error: "Internal Server Error"});
  }
})

app.post('/cart', async (req, res) => {
  const { email, productId, productName, productDescription, productPrice,productImage } = req.body;

  try {
    const existingCartItem = await cart.findOne({ email, productId: {$in :[productId]} });
    if (existingCartItem) {
      return res.json("Product Already in Cart");
    }
    const updatedCart = await cart.findOneAndUpdate(
      { email },
      {
        $push: {
          productId,
          productName,
          productDescription,
          productPrice,
          productImage
        },
      },
      { upsert: true, new: true }
    );
    
    if (updatedCart) {
      return res.json("Product added to Cart");
    }
  } catch (error) {
    console.error("Error adding product to cart:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get('/fetchCart',async (req,res) => {
  const {email} = req.query;
  try{
  const fetch = await cart.findOne({email});
  if(fetch){
   res.json({status:"Items Fetched", items:fetch});
  }
  else
  res.json({status:"No Items Fetched"});
  }
  catch(e){
    res.status(500).json({error:"Internal Server Error"});
  }
});

app.post('/removeItem', async (req,res) => {
  const {email, productId} = req.body;
  const check = await cart.findOne({email, productId})
  console.log(check);
  try{
    await cart.updateOne({email},
      {
        $pull: {check}
      }
    )

    res.json({ status: "Item Removed" });
  } catch (error) {
    console.error("Error removing item:", error);
    res.json({ status: "Failed", message: "Error removing item" });
  }
});

app.post('/send-message', async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      secure:true,
      port: 465,
      auth: {
        user: 'faheemjawaid12@gmail.com',
        pass: 'swevalmhnklvlgdl',
      },
    });

    const mailOptions = {
      from: email,
      to: 'faheemjawaid12@gmail.com',
      subject: `New Contact Us Message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Failed to send message. Please try again later.' });
  }
});

app.listen(8000, () => {
  console.log('Server Running on port 8000');
});
