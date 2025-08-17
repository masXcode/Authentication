"use client"


import LabelInput from "../../../components/LabelInput";
import { registerAction } from "../../../actions/auth/checkFormData";
import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";





export default function Register() {

    const [state, action, isPending] = useActionState(registerAction, undefined)
    const router = useRouter()

    useEffect(() =>{
        if(state?.success) router.replace('/')
        
    },[state, router])




  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center">
        
        <div className="p-8 bg-white w-full max-w-[600px] space-y-8 rounded-xl">
            <h1 className="font-playwright text-center text-3xl">create an account</h1>

            
            <form action={action} className="space-y-2">
                <div className="flex gap-4 " >
                    <LabelInput type="text" placeholder="your name" name="name" label="full name" defaultValue={state?.data?.name} error={state?.errors?.name}/>
                    <LabelInput type="number" placeholder="your age" name="age" label="age" defaultValue={state?.data?.age} error={state?.errors?.age}/>
                </div>

                <LabelInput type="email" placeholder="example@gmail.com" name="email" label="email" defaultValue={state?.data?.email} error={state?.errors?.email}/>
                <LabelInput type="password" placeholder="*@!#$%*" name="password" label="password" defaultValue={state?.data?.password} error={state?.errors?.password}/>
                <LabelInput type="password" placeholder="*@!#$%*" name="confirmed password" label="confirmed password" defaultValue={state?.data?.confirmedPassword} error={state?.errors?.confirmedPassword}/>
            
                <button type="submit" disabled={isPending} 
                        className="p-2 w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-md ">
                    {isPending? 'registering...' : 'register'}
                </button>
            </form> 
            
        </div>

    </div>
  )
}
