"use server"

import { cookies } from "next/headers"


interface dataType {
    email: string,
    password: string,
}

export const serverLogIn = async (data:dataType) =>{
    const cookyStorage = await cookies()

    try{
        const res = await fetch("http://localhost:5150/api/users/login",{
            method:"post",
            headers:{"Content-Type": "application/json"},
            body: JSON.stringify(data)
        })

        const resData = await res.json()

        if(res.ok){
            const {token, SLI,} = resData
            cookyStorage.set('myAuth', token)

            return {success: SLI}
        }
        else{
            const {message} = resData
            return {message, success: false}
        }
    }
    catch(error: any){
        return {success:false, error:error.message}
    }
}



