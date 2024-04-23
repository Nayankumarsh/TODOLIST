const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcrypt");

//Sign UP

exports.register =  async(req,res) =>{
    try{
        const {email, username, password} = req.body;
        //npm i bcryptjs   for hassing password
        const hashpassword = await bcrypt.hash(password, 10);

        //check user already exists
        const checkuser = await User.findOne({email});
        if(checkuser){
            return res.status(401).json({
                sucess:false,
                message:"User already exists",
            })
        }


        const user = new User({email, username, password:hashpassword});
        await user.save().then(()=> res.status(200).json({user:user}));
    }catch(error){
        console.log(error)
        res.status(400).json({message:"Please fill all the required info"});
    }
};


// signIn
exports.signIn = async (req, res) => {
    try {
      const { email, password } = req.body;
      const existingUser = await User.findOne({ email });
  
      if (!existingUser) {
        return res.status(400).json({
          success: false,
          message: "Please sign up first",
        });
      }
  
      const comparePassword = await bcrypt.compare(
        password,
        existingUser.password
      );
  
      if (!comparePassword) {
        return res.status(400).json({
          success: false,
          message: "Password incorrect",
        });
      }
  
      // If password is correct, you can return some data or token here
      // For simplicity, let's just return the user object
      const {password:userpassword, ...others} = existingUser._doc
      res.status(200).json({ others });
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: "Internal server error" });
    }

  };
  