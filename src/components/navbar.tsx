import { UserButton } from "@clerk/nextjs";

export default function Navbar() {
  return (
    <>
      <div className="flex flex-row justify-end px-8 py-4">
        <UserButton
          appearance={{
            elements: {
              userButtonAvatarBox: "w-10 h-10",
            },
          }}
        />
      </div>
    </>
  );
}
