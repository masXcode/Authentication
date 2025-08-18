

interface LabelInput{
  type:string,
  placeholder:string,
  name:string,
  label:string,
  defaultValue:string | undefined,
  error:string | undefined,
}


export default function LabelInput({type, placeholder, name, label, defaultValue, error} : LabelInput) {
  return (
    <div className="flex flex-col  w-full">

      <label htmlFor={name} className="capitalize text-sm">{label}</label>

      <input type={type} id={name} name={name} placeholder={placeholder} autoComplete={name} defaultValue={defaultValue}
            className="mt-2 border p-3 rounded-md text-sm outline-none "/>
        {error && <p className=" text-[12px] text-red-600">{error}</p> }
      
    </div>
  )
}
