"use client";

import SocialLogin from "@/components/Social-Login/SocialLogin";
import { authClient } from "@/lib/auth-client";
import { Button, FieldError, Form, Input, Label, TextField } from "@heroui/react";
import { redirect, useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

function SignUp() {

    const router = useRouter()
    const { data: session } = authClient.useSession();

    if(session?.user){
        redirect('/profile')
    }

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [errorMessage, setErrorMessage] = useState<string | null>(null)

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { data, error } = await authClient.signUp.email({
            name: name,
            email: email,
            password: password,
        });
        if (data) {
            router.push('/')
            router.refresh()
            toast.success('Registration Successfull')
        }
        if (error) {
            setErrorMessage(error?.message || "An error occurred during sign up.")
        }
    };

    return (
        <Form
            className="flex w-lg mx-auto flex-col gap-4 bg-[#FAFCFA] p-5 my-5 rounded-xl"
            render={(props) => <form {...props} data-custom="foo" />}
            onSubmit={onSubmit}
        >
            <TextField
                isRequired
                name="name"
                type="text"
                onChange={(value) => setName(value)}
            >
                <Label>Full Name</Label>
                <Input placeholder="আপনার নাম লিখুন" />
                <FieldError />
            </TextField>
            <TextField
                isRequired
                name="email"
                type="email"
                validate={(value) => {
                    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                        return "Please enter a valid email address";
                    }

                    return null;
                }}
                onChange={(value) => setEmail(value)}
            >
                <Label>Email</Label>
                <Input placeholder="আপনার ইমেইল এড্রেস দিন" />
                <FieldError />
            </TextField>

            <TextField
                isRequired
                minLength={8}
                name="password"
                type="password"
                validate={(value) => {
                    if (value.length < 8) {
                        return "Password must be at least 8 characters";
                    }
                    if (!/[A-Z]/.test(value)) {
                        return "Password must contain at least one uppercase letter";
                    }
                    if (!/[0-9]/.test(value)) {
                        return "Password must contain at least one number";
                    }

                    return null;
                }}
                onChange={(value) => setPassword(value)}
            >
                <Label>Password</Label>
                <Input placeholder="আপনার পাসওয়ার্ড দিন" />
                <FieldError />
            </TextField>
            <TextField
                isRequired
                minLength={8}
                name="confirm-password"
                type="password"
                validate={(value) => {
                    if (value !== password) {
                        return "Your password didn't match";
                    }
                }}
            >
                <Label>Confirm Password</Label>
                <Input placeholder="আপনার পাসওয়ার্ড আবার দিন" />
                <FieldError />
            </TextField>
            {errorMessage ? <p className="text-red-500">{errorMessage}</p> : <p></p>}
            <div className="flex gap-2 w-full">
                <Button type="submit" className="text-base px-5 py-3 text-white bg-[#05893E] rounded-lg transition-all duration-300 hover:scale-103 hover:shadow-lg hover:shadow-[#05893E]/30 w-full">
                    অ্যাকাউন্ট তৈরি করুন
                </Button>
            </div>
            <div className="flex items-center my-4">
                <div className="grow border-t border-gray-300"></div>
                <span className="shrink mx-4 text-gray-500 text-sm font-medium">অথবা</span>
                <div className="grow border-t border-gray-300"></div>
            </div>
            <SocialLogin />
        </Form>
    );
}

export default SignUp;