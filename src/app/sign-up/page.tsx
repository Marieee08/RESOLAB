import { SignUp } from "@clerk/nextjs"

export default function Page() {
    return(
        <div className="flex justify-center">
            <SignUp afterSignUpUrl="/api/setup-user-role" />
        </div>
    )
}