import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="h-screen flex flex-col items-center justify-center gap-8 bg-custom-image bg-cover bg-center">
        <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-lg text-center max-w-lg">
          <div className="text-5xl font-bold tracking-tight text-gray-800">
            Dashboard
          </div>
          <div className="mt-4 text-lg leading-relaxed text-gray-700">
            Studying made easier! Click to Start Learning!
          </div>
          <div className="mt-8 flex flex-row gap-6 justify-center">
            <Link href="/cards">
              <button className="bg-purple-600 text-white font-semibold py-2 px-4 rounded-lg shadow-lg hover:bg-purple-700 transition duration-300">
                Start Making
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
