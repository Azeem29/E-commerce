const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/Practice")
.then(()=>{
console.log('Connected to mongoDB');
})
.catch(()=>{
    console.log('Failed to connect');
})

const LoginSchema = new mongoose.Schema({
    
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    PhoneNumber:{
        type:Number,
        required:false
    },
    Pincode:{
        type:Number,
        required:false
    },
    State:{
        type:String,
        required:false
    },
    City:{
        type:String,
        required:false
    },
    HouseNo:{
        type:String,
        required:false
    },
    Area:{
        type:String,
        required:false
    }
})
const CartSchema = new mongoose.Schema({
    email:{
        type:String,
        required:false
    },
    productId:{
        type:[String],
        required:false
    },
    productName:{
        type:[String],
        required:false
    },
    productDescription:{
        type:[String],
        required:false
    },
    productPrice:{
        type:[Number],
        required:false
    },
    productImage:{
        type:[String],
        required:false
    }
})
const ImageSchema = new mongoose.Schema({
email:{
    type:String,
    required:false
},
path: {
    type:String,
    required:true
},
filename:{
    type:String,
    required: true
}
})

const image = new mongoose.model("Collection5",ImageSchema);
const collection = new mongoose.model("Collection2",LoginSchema);
const cart = new mongoose.model("Cart",CartSchema)
module.exports = {collection, cart, image};
