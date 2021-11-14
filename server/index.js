//importing required dependencies
import bodyParser from 'body-parser';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import nodemailer from "nodemailer";
import User from "./models/userSchema.js";
//import routes from routes folder
import foodItemsRoutes from './routes/foodItems.js'
import FoodItemMessage from './models/foodItemMessage.js';
import Orders from './models/Orders.js';

// import foodRoutes from './routes/food.js'

//initialize express app
const app = express();

//Nikhil
app.use(express.json())
app.use(express.urlencoded())

//using different methods on app instance
app.use(bodyParser.json({limit : "30mb", extended : true}));
app.use(bodyParser.urlencoded({limit : "30mb", extended : true}));
app.use(cors());
//Nikhil
// dotenv.config()

//bhavin 
// app.use('/api/food',foodRoutes)

//Registering routes here from routes folder, i think 
app.use('/foodItems', foodItemsRoutes);

//Connect with MongoDB database
const CONNECTION_URL = 'mongodb+srv://jenil123:jenil123@cluster0.x3mcc.mongodb.net/FoodData?retryWrites=true&w=majority';
const PORT = process.env.PORT || 5001;

mongoose.connect(CONNECTION_URL, {
    // userNewUrlParser: true,
    // useUnifiedTopology: true
})
.then(() => app.listen(PORT, () => console.log(`Server running on port : ${PORT}`)))
.catch((error) => console.log(error.message));

//mongoose.set('useFindAndModify', false);


//Nikhil

// required ("dotenv").config()


var transporter = nodemailer.createTransport({
    service:'gmail',
    auth : {     
        // user:process.env.DEFAUL_EMAIL,
        // pass:process.env.DEFAUL_EMAIL_PASSWORD
        user:'nbjtestproject@gmail.com',
        pass:'nbj@1234'
    },
    secure:false,
    tls: {
        rejectUnauthorized: false
    }
});

app.post("/register",(req,res)=>{
    const {name , email , password } =req.body

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min);
    }

    var OTP = getRandomInt(1000, 10000).toString()

    User.findOne({email:email},(err,user) => {
        if(user){
            res.send({message:"User already Registered"})
        }
        else if (err)
        {
            res.send(err)
        }
        else{
            const user= new User({
                name : name ,
                email : email ,
                password : password
            })

            var mailOptions = {
                from : 'nbjtestproject@gmail.com',
                to : email ,
                subject : 'Chilly Food - Verify your Email ✔' ,
                text : OTP,
                // html : "<h5>Your OTP is "+OTP +"</h5>"
                html : `<p><span style="font-size:18px">Please use the below OTP to verify your email information on ChillyFood&nbsp;</span></p>&nbsp;<h1><span style="color:#000080"><em><strong>`+OTP+`</strong>
                </em><span></h1><br /><span style="font-size:18px"><strong>Note : Do not share your OTP&nbsp;to anyone
                </strong><br /><br /><br />Thanks,<br/>Team ChillyFood</span>`
            }
            
            transporter.sendMail(mailOptions,function(err,info){
                if(err){
                    console.log(err);
                }else{
                    console.log("Email sent: " + info.response );
                }
            });

            res.send( {user : user, OTP: OTP})
           
        }
    })
    
})

app.post("/register_",(req,res)=>{
    const {name , email , password } =req.body
    const user= new User({
        name : name ,
        email : email ,
        password : password
    })
    user.save(err => {
        if(err){
            console.log(err)
            res.send( err)
        }else{
            res.send( { message : "Successfully Registered , Please Login Now"})
        }
    })

    console.log(req.body)
})


app.post("/login",(req,res)=>{
    const { email , password } =req.body

    User.findOne({email:email},(err,user) => {
        if(user){
            if (password == user.password){
                res.send({message:"Login Sucessfull",user:user})
            }else
            {
                res.send({message:"password didn't match "})
            }
        }
        else if (err)
        {
            res.send(err)
        }
        else{
            res.send( {message : "User not registered"})
        }
    })
    console.log(req.body);
})

// Route  : GET : fetch all food : /api/food/getallfood

app.get("/api/food/getallfood", async (req, res) => {

  try {
    // let foods = await FoodItemMessage.find();
    let foods = await FoodItemMessage.find({},{selectedFile:0});
    
    res.json(foods);
    console.log("get all foods")

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

//Route  : GET : get one food : /api/food/getfood/:id

app.get("/api/food/getfood/:id", async (req, res) => {

  try {
    let food = await FoodItemMessage.findOne({_id:req.params.id},{foodItemName:1});
    if(!food)
    {
      return res.status(404).send("Not Found");
    }
    res.json(food);

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});


//Route  PUT : update Food : http://localhost:5000/api/food/updatefood/:id

app.put("/api/food/updatefood/:id", async (req, res) => {
    try {
      const { foodItemName,foodCategory,pricePerPerson,foodDeliveryTime} = req.body;
      
      let newFood = {};
      if (foodItemName) {
        newFood.foodItemName = foodItemName;
      }
      if (foodCategory) {
        newFood.foodCategory = foodCategory;
      }
      if (pricePerPerson) {
        newFood.pricePerPerson= pricePerPerson;
      }
      if (foodDeliveryTime) {
        newFood.foodDeliveryTime =foodDeliveryTime;
      }
      
      let food = await FoodItemMessage.find({_id : req.params.id},{selectedFile:0});
      if (!food) {
        return res.status(400).send("Not found");
      }
  
      food = await FoodItemMessage.findByIdAndUpdate(
        req.params.id,
        { $set: newFood },
        { new: true }
      );

      res.json(food);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  });
  
//Route  : DELETE : delete food : /api/food/deletefood/:id

app.delete("/api/food/deletefood/:id",async (req, res) => {
    try {
      
      let food = await FoodItemMessage.find({_id:req.params.id},{selectedFile:0});
      if (!food) {
        return res.status(400).send("Not found");
      }
  
      food = await FoodItemMessage.findByIdAndDelete(req.params.id);
  
      res.json({ "Success": "Food has been deleted", food: food });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  });


//-------------------Order API--------------------------

// Route 1 : place order api

app.post("/api/order/placeorder", async (req, res) => {
  try {
    const data=req.body;
    const order = new Orders(data);
    const savedOrder = await order.save();

    res.json({msg:"Hello testing successful",savedOrder})

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// Route 2 : get all order api

app.get("/api/order/getallorder", async (req, res) => {
  try {
    const orders =await  Orders.find();
    res.json(orders)

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// Route 3 : edit order

app.put("/api/order/updateorder/:id", async (req, res) => {
  try {

    const { quantity,status,address,contact} = req.body;
  

      let newOrder = {};
      if (quantity) {
        newOrder.quantity = quantity;
      }
      if (status) {
        newOrder.status = status;
      }
      if (address) {
        newOrder.address= address;
      }
      if (contact) {
        newOrder.contact =contact;
      }
      
      let order = await Orders.findById(req.params.id);
      if (!order) {
        return res.status(400).send("Not found");
      }
  
      order = await Orders.findByIdAndUpdate(req.params.id,{ $set: newOrder },{ new: true });
      res.json(order);

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});