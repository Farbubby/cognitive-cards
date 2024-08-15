import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <>
      <div className="h-screen flex flex-col items-center justify-center gap-8 bg-custom-image bg-cover bg-center">
        <SignUp
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
