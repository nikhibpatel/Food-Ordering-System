import React,{useState,useEffect} from 'react'
import { useLocation } from 'react-router-dom';

function PlaceOrder({user}) {
    const location = useLocation()
    const [order, setorder] = useState({})
    const [quantity, setquantity] = useState(1)
    const [address, setaddress] = useState("")
    const [contact, setcontact] = useState("")
    const food=location.state.foodItem;

    useEffect(() => {
        let order={};
        order.status="new";
        order.quantity=quantity;
        order.foodID=location.state.foodItem._id;
        order.userID=user._id;
        order.contact=contact;
        order.address=address;

        setorder(order);
        // console.log(order)
    },[])

    const handleChange=(e)=>{
        setquantity(e.target.value)
    }
    const handleAddressChange=(e)=>{
        setaddress(e.target.value)
    }

    const handleContactChange=(e)=>{
        setcontact(e.target.value)
    }

    const placeOrder=()=>{
        console.log("Order placed",order)
    }

    return (
        <>
        {
            user.name && user.password ? 
            <div className="container shadow-none">
                <div className="row">
                    <div className="col-md-8 mx-3 border" style={{padding:"30px"}}>
                        <h3 className="my-4">Your Order </h3>
                            <img src={food.selectedFile} alt="food image" style={{height:"300px",width:"500px"}}/><p/>
                        <div>
                            Food Name : {food.foodItemName}<p/>
                            Food Category : {food.foodCategory}<p/>
                            Food price : {food.pricePerPerson}<p/>
                            Food Preparing Time : {food.foodDeliveryTime}<p/>
                            Quantity : <input type="number" name="quantity" value={quantity} min="1" max="20" onChange={handleChange}/> <p/>
                            Contact : <input type="string" name="contact" value={contact} maxLength="10" onChange={handleContactChange}/> <p/>
                            Address : <textarea name="address" value={address} onChange={handleAddressChange} style={{width:"300px",padding:"10px"}}/> <p/>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="border" style={{padding:"20px"}}>
                            <h5 className="mb-4"><strong>Order summary</strong></h5>
                            Total Food Items : {food.pricePerPerson*quantity}<p/>
                            Delivery Charge : 50<p/>
                            Promotion Applied : -50<p/><hr/>
                            <strong>Total : {food.pricePerPerson*quantity}</strong>
                        </div>

                        <br/>
                        <div className="border" style={{padding:"20px"}}>
                            <h5 className="mb-4"><strong>Address</strong></h5>
                            {address}
                        </div>
                        <br/>

                        <button className="btn btn-dark" style={{width:"100%"}} onClick={placeOrder}>Place Order</button>

                    </div>
                </div>        
                <br/><br/><br/>    
            </div> : <p>nednedn</p> 
            
        }
        </>
        // <div className="container shadow-none">
        //     <div className="row">
        //         <div className="col-md-8 mx-3 border">
        //             <h3>Your Order </h3>
        //             <div>

        //             </div>
        //         </div>
        //         <div className="col-md-3 border">
        //             rrjfdnnkrnkr
        //         </div>
        //     </div>

        //     {
        //         console.log(order)
        //     }
            
        // </div>
    )
}

export default PlaceOrder
