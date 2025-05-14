import { ReactNode } from "react";

export const SecondaryButton = ({children,onClick,size="small"} : {children : ReactNode,onClick : ()=>void,size? : "big" | "small"})=>{
    return <div className={`${size==="small" ? "text-sm" :"text-xl"} ${size==="small" ? "px-8 pt-2" : "px-16 py-2"} bg-white border cursor-pointer hover:shadow-md text-black h-10 flex flex-col justify-center rounded-full `}
    onClick = {onClick}>
       {children}
    </div>

}