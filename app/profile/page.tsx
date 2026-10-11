"use client"
import { authClient } from '@/lib/auth-client';
import { Person } from '@gravity-ui/icons';
import { Button, FieldError, Form, Input, Label, TextField, Card } from "@heroui/react";
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import { useState } from 'react';

function Profile() {
    const router = useRouter();
    const { data: session } = authClient.useSession();

    const handleSignOut = async () => {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.push('/')
                    router.refresh()
                },
            },
        });
    }

    const [updatedName, setUpdatedName] = useState("")
    const [updatedImage, setUpdatedImage] = useState("")

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await authClient.updateUser({
            image: updatedImage,
            name: updatedName
        })
        router.refresh()
    };

    return (
        <div>
            <div className='text-[#1D271F] container mx-auto my-8'>
                <h1 className='text-2xl'>আমার প্রোফাইল</h1>
                <p>আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।</p>
                <Card className="w-full md:flex-row justify-between items-center">
                    <div className="flex items-center gap-3">
                        {session?.user?.image ?
                            <Image src={session?.user?.image} alt='Profile Photo' width={100} height={100} className='rounded-lg' /> :
                            <Person className='w-10 h-10' />
                        }
                        <Card.Header className="gap-1">
                            <Card.Title className="text-2xl">{session?.user?.name}</Card.Title>
                            <Card.Description>{session?.user?.email}</Card.Description>
                        </Card.Header>
                    </div>
                    <Button onClick={handleSignOut} className="bg-transparent border border-red-500 flex items-center gap-2 text-red-500">↩ <span>সাইন আউট</span></Button>
                </Card>
            </div>
            <div>
                <h1 className='text-3xl text-center font-semibold'>প্রোফাইল আপডেট করুন</h1>
                <Form
                    className="flex flex-col gap-4 w-lg bg-[#FAFCFA] mx-auto p-5 rounded-lg my-5"
                    render={(props) => <form {...props} data-custom="foo" />}
                    onSubmit={onSubmit}
                >
                    <TextField
                        isRequired
                        name="name"
                        type="text"
                        onChange={(value) => setUpdatedName(value)}
                    >
                        <Label>Name</Label>
                        <Input placeholder="আপনার নাম" />
                        <FieldError />
                    </TextField>
                    <TextField
                        isRequired
                        name="image"
                        type="text"
                        onChange={(value) => setUpdatedImage(value)}
                    >
                        <Label>Profile Photo</Label>
                        <Input placeholder="আপনার ছবির লিঙ্ক" />
                        <FieldError />
                    </TextField>
                    <div className="flex gap-2 w-full">
                        <Button type="submit" className="text-base px-5 py-3 text-white bg-[#05893E] rounded-lg transition-all duration-300 hover:scale-103 hover:shadow-lg hover:shadow-[#05893E]/30 w-full">
                            প্রোফাইল আপডেট করুন
                        </Button>
                    </div>
                </Form>
            </div>
        </div>
    )
}

export default Profile