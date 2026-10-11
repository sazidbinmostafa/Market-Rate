import { authClient } from '@/lib/auth-client';
import { Button } from '@heroui/react'
import { Icon } from "@iconify/react";
import { useRouter } from 'next/navigation';
import { useState } from 'react';

function SocialLogin() {

    const router = useRouter();
    const [errorMessage, setErrorMessage] = useState<string | null>(null)

    const handleGoogleSignIn = async () => {
        const {data, error} = await authClient.signIn.social({
            provider: "google",
        });
        if (data) {
            router.push('/')
            router.refresh()
        }
        if (error) {
            setErrorMessage(error?.message || "An error occurred during sign up.")
        }
    };
    const handleGitHubSignIn = async () => {
        const {data, error} = await authClient.signIn.social({
            provider: "github",
        });
        if (data) {
            router.push('/')
            router.refresh()
        }
        if (error) {
            setErrorMessage(error?.message || "An error occurred during sign up.")
        }
    };

    
    return (
        <div className="flex w-full max-w-lg gap-3 mx-auto ">
            {errorMessage ? <p className="text-red-500">{errorMessage}</p> : <p></p>}
            <Button className="w-full rounded-lg" variant="tertiary" onClick={handleGoogleSignIn}>
                <Icon icon="devicon:google" />
                Google দিয়ে চালিয়ে যান
            </Button>
            <Button className="w-full rounded-lg" variant="tertiary" onClick={handleGitHubSignIn}>
                <Icon icon="mdi:github" />
                Github দিয়ে চালিয়ে যান
            </Button>
        </div>
    )
}

export default SocialLogin