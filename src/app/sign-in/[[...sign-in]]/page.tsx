import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <>
      <div className="h-screen flex flex-col items-center justify-center">
        <SignIn />
      </div>
    </>
  );
}
