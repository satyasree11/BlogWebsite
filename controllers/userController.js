const userModel =require('../models/userModel')
const bcrypt =require('bcrypt');
exports.getAllUsers = async (req,res) =>{
    try{
        const users = await userModel.find({});
        return res.status(200).send({
            userCount:users.length,
            success:true,
            message:"all users data",
            users,
        })
    }
    catch(error)
    {
        console.log(error);
        return res.status(500).send({
            success:false,
            message:"error  to get all users",
            error,
        })
    }


}
exports.registerControllers = async(req,res) =>{
    try{
        const{username,email,password} = req.body;
        if(!username|| !email || !password){
            return res.status(400).send({
                success:false,
                message:"please fill all fields",

            })
        }
        const existingUser = await userModel.findOne({email});
        if(existingUser){
            return res.status(401).send({
                success:false,
                message:"user already exists",
            })
        }
        const hashedPassword = await bcrypt.hash(password,10);
    
        const user = new userModel({username,email,password: hashedPassword})
        await user.save()
        return res.status(201).send({
            success:true,
            message:"new user created",
            user,
        })
    }
    catch(error){
        console.log(error)
        return res.status(500).send({
            message:"Error in Register callback",
            success:false,
            error,

        })
    }


}



exports.loginControllers = async(req,res) =>{
    try{
         const{email,password} = req.body;
        if( !email || !password){
            return res.status(401).send({
                success:false,
                message:"please fill all fields",

            })
        }
        const user = await userModel.findOne({email})
        if(!user){
            return res.status(200).send({
                success:false,
                message:"email not registerd"
            })
        }

        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.status(401).send({
                success:false,
                message:"invalid password or email"
            })
            }
        return res.status(200).send({
            success:true,
            message:"login succesfull",
            user,
        })

    }
    catch(error){
        console.log(error)
        return res.status(500).send({
            message:"Error in login callback",
            success:false,
            error,

        })
    }
}