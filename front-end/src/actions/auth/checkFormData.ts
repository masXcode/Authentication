"use server"
import { redirect } from "next/navigation";
import { serverRegister } from "./registerAction";


const isEmail = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;


export const registerAction = async (state:any, formData:any) =>{

   await new Promise(res => setTimeout(res, 2000));

   interface errorTypes {
    name?:string,
    email?: string,
    password?: string,
    confirmedPassword?: string,
    age?:string
   }

   interface dataType {
    [key: string]: string
   }

   let errors : errorTypes = {}


    const name = formData.get("name") as string
    const age = formData.get("age") as string
    const email = formData.get("email") as string
    const password = formData.get("password") as string
    const confirmedPassword = formData.get("confirmed password") as string



    // check if the name is valid
    if(! (/^[A-Za-z\u0600-\u06FF\s]+$/.test(name))) errors.name  = 'invalid name' 

    // check if the email is valid
    if(!isEmail.test(email)) errors.email  = 'invalid email' 


    // checking the password
    
    // if the input is empity or less than 6 characters
    if(password.length < 6) errors.password  = 'password must be at least 6 characters' 

    // if the input doesn't includes characters
    else if(! (/[A-Za-z]/.test(password))) errors.password  = 'password must include characters' 

    // if the input doesn't includes numbers
    else if(! (/[0-9]/.test(password))) errors.password  = 'password must include numbers' 

    // if the input doesn't includes special characters
    else if(! (/[^0-9A-Za-z]/.test(password))) errors.password  = 'password must include special character like @' 


    // confirmed password
    if(! (confirmedPassword === password)) errors.confirmedPassword = 'confirmed password doesn\'t match with password '

    if(Number(age) < 10) errors.age = 'you must be +10'

    
    
    let data:dataType = {email, name, age, password, confirmedPassword}
    if (Object.keys(errors).length > 0) return {errors, data, success: false}


    const backData = {name, age, email, password}
    const serverRes = await serverRegister(backData)

   console.log(serverRes)
    if (serverRes.success){
        return {success:true}
    }
    else{
         return {success:false}
    }
    
    
}
