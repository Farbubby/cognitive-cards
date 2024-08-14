import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="h-screen flex flex-col items-center justify-center gap-8 bg-custom-image bg-cover bg-center">
        <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-lg text-center max-w-lg">
          <div className="text-5xl font-bold tracking-tight text-gray-800">
            Cognitive Cards
          </div>
          <div className="mt-4 text-lg leading-relaxed text-gray-700">
            Need help with studying or don&apos;t know what to study? Leverage
            the power of AI to study effectively for any topic!
          </div>
          <div className="mt-8 flex flex-row gap-6 justify-center">
            <Link href="/sign-in">
              <button className="bg-purple-600 text-white font-semibold py-2 px-4 rounded-lg shadow-lg hover:bg-purple-700 transition duration-300">
                Sign in
              </button>
            </Link>
            <Link href="/sign-up">
              <button className="bg-purple-600 text-white font-semibold py-2 px-4 rounded-lg shadow-lg hover:bg-purple-700 transition duration-300">
                Sign up
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
