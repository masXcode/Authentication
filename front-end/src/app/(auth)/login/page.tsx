"use client"



import { useActionState, useEffect } from "react"
import LabelInput from "../../../components/LabelInput"
import { logInAction } from "@/actions/auth/checkFormData"
import { useRouter } from "next/navigation"


export default function page() {
    const router = useRouter()

    const [state, action, isPending] = useActionState(logInAction, undefined)
    useEffect(() => {

        if(state?.success) router.replace('/')
    },[state, router])


     

    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">

          <div className="p-8 bg-white w-full max-w-[600px] space-y-8 rounded-xl shadow-md">
              <h1 className="font-playwright text-center text-3xl">log in</h1>

              <form action={action} className="space-y-2">
                  <LabelInput type="email" placeholder="example@gmail.com" name="email" label="email" 
                            defaultValue={state?.data?.email} error={state?.errors?.email} />

                  <LabelInput type="password" placeholder="*@!#$%*" name="password" label="password" 
                            defaultValue={state?.data?.password} error={state?.errors?.password} />
              
                  <button disabled={isPending}
                        className="p-2 w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-md ">
                        {isPending? 'logging in...' : 'log in'}
                  </button>
              </form>
          </div>
      </div>
    )
}
