import React ,{useState} from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast';
import {Box,Typography,TextField,Button} from '@mui/material'
const Register = () => {
  const navigate = useNavigate()

  const [inputs,setInputs] = useState({
    name:'',
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
   const {data} =  await axios.post('/api/v1/user/register',{username:inputs.name,email:inputs.email,password:inputs.password})
      toast.success("user registered successfully")
      navigate("/login")
      
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
      textAlign={"center"}>Register</Typography>
      <TextField placeholder='name' 
      name="name"
      onChange={handleChange}
      value={inputs.name}
      margin='normal'
      type={"text"}
      required
      />
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
        onClick={() => navigate("/login")}
        
        color="primary">Already Registerd ? Please Login</Button>

     </Box>
     </form>
    </>
  )
}

export default Register
