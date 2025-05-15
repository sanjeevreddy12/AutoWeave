"use client"
import { Appbar } from "@/components/Appbar";
import { PrimaryButton } from "@/components/buttons/PrimaryButton";
import { CheckFeature } from "@/components/CheckFeature";
import { Input } from "@/components/Input";
import { BACKEND_URL } from "@/config";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function () {
      const router = useRouter();
        const [email, setemail] = useState("");
        const [name, setname] = useState("");
        const [password, setpassword] = useState("");
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

                <div className="flex-1 pt-6 pb-6 mt-12 px-4 border border-slate-200 rounded">
                    <Input label="Email" type="text" placeholder="Email" onChange={(e) => { setemail(e.target.value
                    )}}></Input >
                    
                    <Input label="Password" type="password" placeholder="Password" onChange={(e) => { setpassword(e.target.value)}}></Input >
                    <div className="pt-4">
                        <PrimaryButton size="big" onClick={async () => {
                            const res = await axios.post(`${BACKEND_URL}/api/v1/user/signin`, {
                                username: email,
                                password,
                            })
                            console.log(res);
                            localStorage.setItem("token", res.data.token);
                            router.push("/dashboard");
                         }}>Get Started free</PrimaryButton>
                    </div>

                </div>
            </div>
        </div>
    </div>
}