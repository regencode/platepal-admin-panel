"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { loginAsAdmin } from "./actions/auth";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle,
} from "@/components/ui/field"
import { useAuth } from "./contexts/AuthContext";
import { useRouter } from "next/navigation";


export default function Home() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<Error | null>(null);
    const { accessToken, setAccessToken, isAuthenticated } = useAuth();
    const router = useRouter();
    
    useEffect(() => {
        if(accessToken) {
            router.push("/dashboard");
        }
    }, [accessToken])

    const handleSubmit = async () => {
        if(!email || email.length <= 0) {
            setError(new Error("Please enter your email."))
            return;
        }
        if(!password || password.length <= 0) {
            setError(new Error("Please enter your password."))
            return;
        }
        // login
        try {
            setError(null);
            const { data } = await loginAsAdmin({
                email, password
            });
            setAccessToken(data.accessToken);
            router.push("/dashboard");
        }
        catch (e) {
            if (e instanceof Error) {
                setError(e); 
            }
            else {
                setError(new Error("Something went wrong"));
            }
        }
    }
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="flex justify-center shadow-2xl h-[70vh] aspect-square rounded-xl">
                <FieldSet className="flex flex-col items-center w-[75%] justify-center">
                <div className="flex flex-col gap-2 w-full h-fit items-center justify-center">
                    <Image src={"/assets/images/platepal-logo.png"} alt="platepal logo" width={100} height={100}/>
                    <FieldLegend className="text-3xl text-center w-full"> PlatePal Admin Panel </FieldLegend>
                    <Field>
                        <FieldLabel> Email </FieldLabel>
                        <input type="text" 
                        className="border border-black w-full h-8 rounded-sm px-2" 
                        onChange={(e) => setEmail(e.target.value)}
                        required />
                    </Field>
                    <Field>
                        <FieldLabel> Password </FieldLabel>
                        <input type="password" 
                        className="border border-black w-full h-8 rounded-sm px-2" 
                        onChange={(e) => setPassword(e.target.value)}
                        required />
                    </Field>
                    <FieldError>{error?.message}</FieldError>
                </div>
                <Button className="w-full" 
                onClick={() => handleSubmit()}
                type="submit">Login</Button>
                <div className="h-[10%]" />
                </FieldSet>
            </div>
        </div>

    );
}
