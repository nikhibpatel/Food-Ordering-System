import mongoose from 'mongoose';
const {Schema}=mongoose;

const OrdersSchema=new Schema({
    quantity :{
        type: Number,
        required: true
    },
    foodID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'FoodItemMessage'
    },
    userID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    status :{
        type: String,
        required: true,
        default:"initial"
    },
    date :{
        type: Date,
        default: Date.now
    },
    contact :{
        type: String,
        required:true
    },
    address:{
        type:String,
        required:true
    }
})

const Orders=mongoose.model('orders',OrdersSchema);

export default Orders;
