import React,{useSat, useState} from 'react'

function DeleteFood(props) {

    const handleDelete=async()=>{

        const response = await fetch("http://localhost:5001/api/food/deletefood/"+props.id,{
            method: 'DELETE'
        });
        const json=await response.json();
        // console.log(json);
        props.changemode("default");
        props.setdeletefood({});
        window.scrollTo(0, 0);
    }

    const handleCancle=(e)=>{
        e.preventDefault();
        props.changemode("default");
        props.setdeletefood({});
    }

    return (
        <div>
            <h3 className="my-2">Delete Food</h3>
                <div className="form-group my-3">
                    <br/>
                    <p>Are you sure to delete ?</p>
                    <button type="submit" className="btn btn-danger" onClick={handleDelete}>Yes</button>
                    <button type="submit" className="btn btn-primary bg-dark mx-2" onClick={handleCancle}>Cancel</button>
                </div>
        </div>
    )
}

export default DeleteFood