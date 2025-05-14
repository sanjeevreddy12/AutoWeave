"use client"
export const Input = ({ type = "text", label, placeholder, onChange }: {
    label: string,
    placeholder: string,
    onChange: (e : any) => void,
    type? :"text" | "password"
}) => {
    return <div>
        <div className="text-sm pb-2 pt-2 ">
            <label>{label}</label>
        </div>
        <input className="border rounded w-full px-4 py-2 border-black" type={type} placeholder={placeholder} onChange={onChange} />

    </div>
}