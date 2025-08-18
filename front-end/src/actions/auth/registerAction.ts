"use server"
import { cookies } from "next/headers"


interface stringOBJ {
    [key: string]: string
}


export const serverRegister = async (data:stringOBJ) => {
    const cookyStorage = await cookies()

    try{
        const res = await fetch('http://localhost:5150/api/users/register',{
            method:"post",
            headers:{ "Content-Type": "application/json",},
            body:JSON.stringify(data)
        })

        if(res.ok) {
            const resData : any = await res.json()
            cookyStorage.set('myAuth', resData.token)

            const {SSI ,message} = resData
            return {success: SSI, message}
        }
        else{
            const resData : any = await res.json()
            return {success: false, message:resData.message}
        }
    }
    catch(error: any){
        return {success: false, error:error.message}
    }

}
