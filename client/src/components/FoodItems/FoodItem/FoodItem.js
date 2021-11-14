import React from 'react';
import useStyles from './styles';
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';
import {useHistory} from 'react-router-dom' 


const FoodItem = ({ foodItem }) => {
    const classes = useStyles();
    const history=useHistory();

    const handleClick=()=> {
        // history.push("/orders");
        console.log("click")
        history.push({
            pathname:"/orders",
            state:{foodItem}
        })
      }

    return (
        <Card className={classes.card}>
            <CardMedia className={classes.media} image={foodItem.selectedFile} title={foodItem.title} />
            <div className={classes.overlay} >
                <Typography variant="h6">{foodItem.foodItemName}</Typography>
                <Typography variant="body2">{foodItem.foodDeliveryTime}</Typography>
            </div>

            <div className={classes.details}>
                <Typography variant="h6">Let's Eat Cafe</Typography>
            </div>

            <div className={classes.price}>
                <Typography>₹{foodItem.pricePerPerson} only</Typography>
            </div>

            <div className={classes.foodTypes}>
                <Typography>{foodItem.foodCategory}</Typography>
            </div>
            
            {/* 
            <div className={classes.address}>
                <Typography color="textSecondary">Safal Square, Vesu, Surat</Typography>
            </div> */}

            <CardActions  className={classes.cardActions}>
                <Button to="orders" className="bg-white" style={{color:"green"}}  onClick={handleClick}>
                    Order Now
                </Button>
                {/* <Button size="small" color="primary">
                    Let's eat
                </Button> */}
            </CardActions>
        </Card>
    );
}

export default FoodItem;