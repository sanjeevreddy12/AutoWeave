import { ReactNode } from "react";

export const PrimaryButton = ({children,onClick,size="small"} : {children : ReactNode,onClick : ()=>void,size? : "big" | "small"})=>{
    return <div className={`${size==="small" ? "text-sm" :"text-xl"} ${size==="small" ? "px-8 " : "px-15 "} bg-[var(--color-amber)] cursor-pointer hover:shadow-md text-center  text-white flex flex-col justify-center rounded-full  h-10`}
    onClick = {onClick}>
       {children}
    </div>

}