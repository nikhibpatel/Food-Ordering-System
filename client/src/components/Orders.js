import React,{useState,useEffect} from 'react'
import Order from './Order';

function Orders() {
    const [orders, setorders] = useState([])
    
    const getorders = async ()=>{
        const respose=await fetch("http://localhost:5001/api/order/getallorder",{
            method:'GET'
        });
        const json=await respose.json()
        setorders(json);
    }
   

    useEffect(() => {
        getorders();
    },[])
    return (
        <div className="shadow p-3 mb-5 bg-white rounded">
            <h3 className="my-5"> Current Order </h3>
            <div className="shadow-sm p-3 mb-5 bg-light rounded">
                <table className="table">
                    <thead className="thead-dark">
                        <tr>
                        <th scope="col" className="col-md-3">Order Item Name</th>
                        <th scope="col" className="col-md-2">Quantity</th>
                        <th scope="col" className="col-md-2">Contact</th>
                        <th scope="col" className="col-md-2">Address</th>
                        <th scope="col" className="col-md-2">Change Status</th>
                        <th scope="col" className="col-md-2">Status</th>
                        </tr>
                    </thead>
                </table>
                <br/>
                <br/>
                    {
                        orders.map((order)=>{
                            return <Order key={order._id} order={order}/>
                        })
                    }
            </div>
        </div>
    )
}

export default Orders
