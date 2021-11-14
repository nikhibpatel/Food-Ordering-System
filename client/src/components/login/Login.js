import React,{useState} from 'react' ;
import "./Login.css" ;
import { TextField, Button, Typography, Paper, Link } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import axios from "axios" ;
import { useHistory } from "react-router-dom";
import useStyles from '../Form/styles';

function Login ({setLoginUser,showAlert}) {

    let history = useHistory()
    const classes = useStyles();

    const [user , setUser] = useState({
        email : "",
        password : ""
   })
   const [email , setEmail] = useState("")
   const [alert, setAlert] = useState(null);
   const [message, setMessage] = useState("");
   function handleChange (e)
   {
       const {name , value} = e.target
       
       setUser({
           ...user,
           [name] : value
       })
   }

    function login ()
    {
        const {email,password}=user

        if(email && password)
        {
            axios.post("http://localhost:5001/login", user)
            .then ( res => {
                //alert(res.data.message)
                {
                    if (res.data.user)
                    {
                        setLoginUser(res.data.user)
                        setMessage(res.data.message)
                        setAlert(res.data.message)
                        // setMessage(res.data.user._id)
                        // if(res.data.isAdmin)
                        // {
                        //     history.push("/addFood")
                        // }else{
                        //     // history.push("/")
                        // }
                    }
                    else
                    {
                        setMessage(res.data.message)
                        setAlert(res.data.message)
                        history.push("/login")
                    }
                }
                })
        }else{
            setAlert("Please Enter Username and Password!!");
        }
        
    }

    return(
        <>
            {alert ? <Alert icon={false} severity='error'>{alert}</Alert> : <></>}
            
            <Paper className={classes.paper}>
                <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`}>
                    <Typography variant="h6">Login</Typography>
                    <TextField required name="email" type="email" variant="outlined" label="Email" fullWidth value={user.email} onChange={handleChange} />
                    <TextField required name="password" type="password" variant="outlined" label="Password" fullWidth value={user.password} onChange={handleChange} />
                    <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" fullWidth onClick={login}>Login</Button>
                    <Link className={classes.buttonLink} component="button" underline="none" onClick={() => history.push("/register")}> New to Red-Chili-Food? </Link>
                </form>
            </Paper>
        </>
       
    )
}

export default Login ;