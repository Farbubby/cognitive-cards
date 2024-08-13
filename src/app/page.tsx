import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="h-screen flex flex-col items-center justify-center gap-8">
        <div className="text-4xl">Cognitive Cards</div>
        <div className="max-w-xs">
          Need help with studying or you do not know what to study? Let us
          leverage the power of AI to help you study effectively for any topic!
        </div>
        <div className="flex flex-row gap-10">
          <Link href="/sign-in">
            <button>Sign in</button>
          </Link>
          <Link href="/sign-up">
            <button>Sign up</button>
          </Link>
        </div>
      </div>
    </>
  );
}
