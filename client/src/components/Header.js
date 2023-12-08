import React, { useState } from 'react'
import {Box,AppBar,Toolbar,Typography,Button, Tab,Tabs} from '@mui/material'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'
import { authActions } from '../redux/store'
import toast from 'react-hot-toast';
const Header = () => {
    let isLogin= useSelector(state => state.isLogin)
    console.log(isLogin)
    isLogin =isLogin || localStorage.getItem("userId")
    const [value,setValue]= useState()
    const dispatch=useDispatch()
    const navigate = useNavigate()
    const handleLogout= () =>{
        try {
            dispatch(authActions.logout())
            toast.success("logout successfull")
            navigate('/login')
            localStorage.clear()
            
        } catch (error) {
            console.log(error)
            
        }

    }
  return (
    <>
    <AppBar position='sticky'>
        <Toolbar>
            <Typography varient='h4'>
                My Blog App
            </Typography>
            {isLogin && 
            <Box display={'flex'} marginLeft="auto" marginRight={'auto'}>
                <Tabs textColor='inherit' value={value}  onChange={(e,val) => setValue(val)}>
                <Tab label="Blogs" LinkComponent={Link} to="/blogs"/>

                <Tab label="My Blogs" LinkComponent={Link} to="/myblogs"/>
                 <Tab label="Create Blog" LinkComponent={Link} to="/createblog"/>
                </Tabs>

            </Box>}
            <Box display={'flex'} marginLeft="auto">
                {!isLogin && (<>
                    <Button sx={{margin:1,color:'white'}} LinkComponent={Link} to="/login">
                        Login</Button>
                <Button sx={{margin:1,color:'white'}} LinkComponent={Link} to="/register">Register</Button>
                </>)
                }
                {isLogin && 
                <Button sx={{margin:1,color:'white'}} onClick={handleLogout} >LogOut</Button>
                }
            </Box>
        </Toolbar>

    </AppBar>

    </>
  )
}

export default Header
