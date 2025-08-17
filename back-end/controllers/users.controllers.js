import mongoose from "mongoose"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

import Users from "../models/users.model.js"

dotenv.config() // to use secret data in .env

/// add new user "registing"
const addNewUser = async (req, res) =>{
    try{
        const {name, age, email, password} = req.body
        if(!name || !age || !email || !password ) return res.status(400).json({message:"check required data"})
        
        // check if the email is connicting with any account
        const validEmail = await Users.findOne({email: req.body.email}) 
        if(validEmail) return res.status(400).json({message:"this email is connecting with another account"})

        
        req.body.password = await bcrypt.hash(req.body.password, 10) // hash password
        const newUser = await Users.create(req.body) // create new user

        const token = jwt.sign({_id: newUser._id, email: newUser.email}, process.env.userJwtKey) // token has id and email   
        newUser.token.push(token)
        await newUser.save()

        res.status(201).json({message:"new user added scuccessfully", SSI:true, token: token})
        
    }
    catch(error){
        res.status(400).json({message:"error adding new user: " + error})
    }
}

/// log in
const login = async (req, res) =>{
    try{
        // check required data 
        const {email, password} = req.body
        if(!email || !password ) return res.status(400).json({message:"check required data"})

        // check if the account is in dataBase or not
        const user = await Users.findOne({email: req.body.email})
        if(!user) return res.status(401).json({message:"this acount is not found"})

        // check if the password is true or not
        if(!(await user.checkPassword(req.body.password)))  return res.status(401).json({message:"Incorrect password"})
        
        const token = jwt.sign({_id: user._id, email: user.email}, process.env.userJwtKey) // token has id and email   
        user.token.push(token) // add new token in dataBase
        user.lastLogsIn.unshift('new log in at:' + Date())  // to now new log in
        await user.save() // ubdate dataBase

        res.status(200).json({message:"successful Log In ", SLI:true, token:token})

    }
    catch(error){
        res.status(400).json({message:"error: " + error})
    }
}

/// get all users ==> admin
const getAllUsers = async (req, res) =>{
    try{
        
    }
    catch(error){
        res.status(400).json({message:"error: " + error})
    }
}

/// delete 
const deleteUser = async (req, res) =>{
    try{

    }
    catch(error){
        res.status(400).json({message:"error: " + error})
    }
}


export default {addNewUser, login, getAllUsers, deleteUser}