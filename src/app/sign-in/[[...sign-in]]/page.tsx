import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <>
      <div className="flex flex-col items-center justify-center gap-8">
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
