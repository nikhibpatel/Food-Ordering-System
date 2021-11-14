import React,{useState,useEffect} from 'react'

function Order(props) {
    const {order}=props
    const [foodName, setfoodName] = useState(null)

    const getfoodName=async ()=>{
        const respose=await fetch("http://localhost:5001/api/food/getfood/"+order.foodID,{
            method:'GET'
        });
        const food=await respose.json()
        setfoodName(food.foodItemName);
        console.log("food Name",food)
    }

    useEffect(async () => {
        await getfoodName();
        console.log("useEffect")
    },[])
    return (
        <div className="row shadow-sm p-3 mb-5 bg-white rounded border" >

            <sup><span className="badge rounded-pill bg-primary" style={{padding:"10px 25px",top:"-2.0em",position:"relative",fontSize: "100%",float:"right"}}> {order.status} </span></sup>
            <div className="col-md-3">
                {foodName}
            </div>
            <div className="col-md-2">
                {order.quantity}
            </div>
            
            <div className="col-md-2">
                {order.contact}
            </div>
            <div className="col-md-2">
                {order.address}
            </div>

            <div className="col-md-2">
                <div class="dropdown">
                <button class="btn bg-white dropdown-toggle" type="button" id="dropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Status
                </button>
                <div class="dropdown-menu" aria-labelledby="dropdown">
                    <button class="dropdown-item" to="/dashboard">On the Way</button>
                    <button class="dropdown-item" to="/dashboard">Preparing</button>
                    <button class="dropdown-item" to="/dashboard">Delievered</button>
                </div>
                </div>
            </div>
            
        </div>
    )
}

export default Order
