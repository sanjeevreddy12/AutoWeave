"use client"
import { Appbar } from "@/components/Appbar";
import { PrimaryButton } from "@/components/buttons/PrimaryButton";
import { CheckFeature } from "@/components/CheckFeature";
import { Input } from "@/components/Input";

export default function () {
    return <div>
        <Appbar />
        <div className="flex justify-center">
            <div className="flex pt-8 max-w-4xl">
                <div className="flex-1 pt-20 px-4">
                    <div className="font-semibold text-3xl pb-4 text-balance">
                        Join millions worldwide who automate their work using zapier
                    </div>
                    <div className="pb-6">


                        <CheckFeature label="Easy setup, no coding required" />
                    </div>
                    <div className="pb-6">

                        <CheckFeature label="Free Forever for core features" />
                    </div>

                    <CheckFeature label="14-day trial of premium features" />
                </div>

                <div className="flex-1 pt-6 pb-6 mt-12 px-4 border rounded">
                    <Input label="Email" type="text" placeholder="Email" onChange={(e) => { }}></Input >
                    <Input label="Name" type="text" placeholder="Your Name" onChange={(e) => { }}></Input >
                    <Input label="Password" type="password" placeholder="Password" onChange={(e) => { }}></Input >
                    <div className="pt-4">
                        <PrimaryButton size="big" onClick={() => { }}>Get Started free</PrimaryButton>
                    </div>

                </div>
            </div>
        </div>
    </div>
}