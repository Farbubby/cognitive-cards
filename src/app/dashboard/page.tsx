"use client"; // for useState
import { Chat } from "./../../components/chat";

import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import React, { useState, useEffect, useRef } from "react";
import "./../webcrumbs.css";

export default function Home() {
  const [isWebcrumbsOpen, setIsWebcrumbsOpen] = useState(false);
  const webcrumbsRef = useRef<HTMLDivElement>(null);

  // Toggle webcrumbs open/close
  const toggleWebcrumbs = () => {
    setIsWebcrumbsOpen(!isWebcrumbsOpen);
  };

  // Handle outside click to close webcrumbs
  const handleClickOutside = (event: { target: any }) => {
    if (webcrumbsRef.current && !webcrumbsRef.current.contains(event.target)) {
      setIsWebcrumbsOpen(false);
    }
  };

  useEffect(() => {
    // Add event listener for outside clicks
    if (isWebcrumbsOpen) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }

    // Clean up event listener on component unmount
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isWebcrumbsOpen]);

  return (
    <>
      <div className="h-screen flex flex-col items-center justify-center gap-8 bg-custom-image bg-cover bg-center relative">
        <div className="absolute top-0 right-0 p-4">
          <UserButton
            appearance={{
              elements: {
                userButtonAvatarBox: "w-10 h-10",
              },
            }}
          />
        </div>

        {isWebcrumbsOpen && (
          <div
            id="webcrumbs"
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[700px] shadow-lg bg-neutral-50 p-6 rounded-lg z-50"
            ref={webcrumbsRef}
          >
            <h1 className="font-title text-2xl mb-4">Dashboard</h1>
            <p className="mb-6 text-sm">
              Welcome to your dashboard! Here you can monitor your activities
              and manage your settings. 🧡 Need assistance? Just ask AI for
              help. Happy exploring!
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-neutral-100 rounded-md p-5 shadow transition-transform duration-300 ease-in-out transform hover:scale-105">
                <h2 className="font-title text-lg mb-2">Overview</h2>
                <p className="text-sm">
                  Start creating flashcards and you will improve your cognitive
                  ability and help ace your exams!
                </p>
              </div>
              <div className="bg-neutral-100 rounded-md p-5 shadow transition-transform duration-300 ease-in-out transform hover:scale-105">
                <h2 className="font-title text-lg mb-2">Settings</h2>
                <p className="text-sm">
                  Located top right of your screen. There you can modify your
                  settings, logout, and other informations.
                </p>
              </div>
            </div>

            {/* Close Button at the bottom center */}
            <div className="flex justify-center mt-8">
              <button
                onClick={toggleWebcrumbs}
                className="bg-red-500 text-white py-2 px-6 rounded-full shadow-lg hover:bg-red-600 transition transform hover:-translate-y-1"
              >
                Close
              </button>
            </div>
          </div>
        )}

        <div className="relative bg-white bg-opacity-90 p-8 rounded-lg shadow-lg text-center max-w-lg">
          {/* Question mark button positioned inside the center box */}
          <button
            className="absolute top-2 right-2 w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center shadow hover:bg-gray-300 transition"
            onClick={toggleWebcrumbs}
          >
            ?
          </button>

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
      {/* Fixed chat component */}
      <div className="absolute bottom-0 left-0 m-4">
        <Chat />
      </div>
    </>
  );
}
