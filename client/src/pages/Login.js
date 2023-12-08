import React ,{useState} from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import {useDispatch} from 'react-redux'
import {Box,Typography,TextField,Button} from '@mui/material'
import { authActions } from '../redux/store'
import toast from 'react-hot-toast';
const Login = () => {
  const navigate = useNavigate()
  const dispatch =useDispatch()

  const [inputs,setInputs] = useState({
    password:'',
    email:''
  })

  const handleChange =(e) =>{
    setInputs((preState) => ({
      ...preState,[e.target.name]:e.target.value
    }))
  }
  const handleSubmit = async(e) =>{
    e.preventDefault()
    try {
   const {data} =  await axios.post('/api/v1/user/login',{email:inputs.email,password:inputs.password})
   if(data.success){  
    localStorage.setItem("userId",data?.user._id)
    dispatch(authActions.login()) 
   toast.success("user login successfully")
      navigate("/")
   }
      
    } catch (error) {
      console.log(error)
      
    }
  }
  return (
    <>
    <form onSubmit={handleSubmit}>
     <Box maxWidth={450}
     display={'flex'}
     flexDirection={'column'}
     alignItems={"center"}
     justifyContent={"center"}
     margin="auto"
     boxShadow={" 10px 10px 20px #ccc"}
     padding={3}
     borderRadius={5}
     
     >
      <Typography variant='h4'
      padding={3}
      sx={{textTransform:"uppercase"}}
      textAlign={"center"}>Login</Typography>
      
      <TextField placeholder='email' 
      name="email"
       onChange={handleChange}
      value={inputs.email}
      margin='normal'
      type={"email"}
      required
      />
      <TextField placeholder='password' 
      name="password"
       onChange={handleChange}
      value={inputs.password}
      margin='normal'
      type={"password"}
      required
      />
       
        <Button
        type="submit"
        sx={{borderRadius:3 , marginTop:3}}
        variant="contained"
        color="primary"
        
        
        >Submit</Button>
        <Button
        sx={{borderRadius:3 , marginTop:3}}
        onClick={() => navigate("/register")}
        
        color="primary">Not a user ? Please Register</Button>

     </Box>
     </form>
    </>
  )
}

export default Login
