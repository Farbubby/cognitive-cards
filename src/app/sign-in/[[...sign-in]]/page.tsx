import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <>
      <div className="h-screen flex flex-col items-center justify-center">
        <SignIn
          appearance={{
            elements: {
              main: "gap-4",
              form: "gap-4",
              card: "gap-4",
            },
          }}
        />
      </div>
    </>
  );
}
