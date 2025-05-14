"use client"
import { PrimaryButton } from "./buttons/PrimaryButton"
import { SecondaryButton } from "./buttons/Secondarybutton"
import { Feature } from "./Feature"

export const Hero = () => {
    return <div>
        <div className="flex justify-center">

            <div className="text-4xl font-semibold text-center pt-4 max-w-md">
                Automate as fast you can type
            </div>
        </div>
        <div className="flex justify-center">

            <div className="text-l font-medium text-center pt-8 max-w-2xl ">
                AI gives you automation superpowers, and Zapier puts them to work. Pairing AI and zapier helps you turn ideas into workflows and bots that work for you
            </div>
        </div>
        <div className="flex justify-center pt-8">
            <div className="flex ">
                <PrimaryButton onClick={() => { }} size="big">Get Started Free</PrimaryButton>
                <div className="pl-4">
                    <SecondaryButton onClick={() => { }} size="big">Contact</SecondaryButton>
                </div>
            </div>

        </div>
        <div className="flex justify-center pt-6 ">
            
                <Feature title="Free Forever" subtitle=" for core features" />
            
            
                <Feature title="More apps" subtitle="than any other platform" />
          
                <Feature title="Cutting-edge" subtitle="AI features" />
                
        </div>
    </div>

}