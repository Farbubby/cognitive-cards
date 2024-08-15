'use client'
// Look at chat/route.ts, chatprompt/route.ts, component/schat.tsx
import { Input } from "@/app/components/ui/input"
import { Button } from "@/app/components/ui/button"
import { useChat } from "ai/react"
import { useRef, useEffect, useState } from 'react'

export function Chat() {

    const { messages, input, handleInputChange, handleSubmit } = useChat({
        api: 'api/chatprompt',
        onError: (e) => {
            console.log(e)
        }
    })
    const chatParent = useRef<HTMLUListElement>(null)
    const [isChatOpen, setIsChatOpen] = useState(false)
    const [isChatEnlarged, setIsChatEnlarged] = useState(false)

    // Automatically scrolls down when new messages arrive
    useEffect(() => {
        const domNode = chatParent.current
        if (domNode) {
            domNode.scrollTop = domNode.scrollHeight
        }
    }, [messages]) // Run this effect whenever `messages` change

    // Handle click outside of chat to close it
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (chatParent.current && !chatParent.current.contains(event.target)) {
                setIsChatOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

    return (
        <main className="relative flex flex-col w-full h-screen max-h-dvh bg-background">
            <header className="p-4 border-b w-full max-w-3xl mx-auto">
                <h1 className="text-2xl font-bold">          </h1>
            </header>

            {/* Chat Button */}
            <button 
                className="fixed bottom-4 right-4 bg-blue-500 text-white p-4 rounded-full shadow-lg"
                onClick={() => setIsChatOpen(!isChatOpen)}
            >
                Chat
            </button>

            {/* Popout Chat */}
            {isChatOpen && (
                <section 
                    className={`fixed bottom-20 right-4 ${isChatEnlarged ? 'w-[500px] h-[600px]' : 'w-80 h-96'} bg-white p-4 rounded-lg shadow-lg flex flex-col transition-all duration-300`}
                    ref={chatParent}
                >
                    <header className="flex justify-between items-center border-b pb-2 mb-2">
                        <h2 className="text-xl font-semibold">Chat</h2>
                        <div>
                            {/* Enlarge/Reduce Button */}
                            <button 
                                className="text-blue-500 mr-4"
                                onClick={() => setIsChatEnlarged(!isChatEnlarged)}
                            >
                                {isChatEnlarged ? "Reduce" : "Enlarge"}
                            </button>
                            {/* Close Button */}
                            <button 
                                className="text-red-500"
                                onClick={() => setIsChatOpen(false)}
                            >
                                Close
                            </button>
                        </div>
                    </header>

                    <form onSubmit={handleSubmit} className="flex items-center mb-2">
                        <Input className="flex-1 min-h-[40px]" placeholder="Type your question here..." type="text" value={input} onChange={handleInputChange} />
                        <Button className="ml-2" type="submit">
                            Submit
                        </Button>
                    </form>

                    <ul className="flex-grow overflow-y-auto">
                        {messages.map((m, index) => (
                            <div key={index}>
                                {m.role === 'user' ? (
                                    <li key={m.id} className="flex flex-row mb-2">
                                        <div className="rounded-xl p-4 bg-background shadow-md flex">
                                            <p className="text-primary">{m.content}</p>
                                        </div>
                                    </li>
                                ) : (
                                    <li key={m.id} className="flex flex-row-reverse mb-2">
                                        <div className="rounded-xl p-4 bg-background shadow-md flex w-3/4">
                                            <p className="text-primary">{m.content}</p>
                                        </div>
                                    </li>
                                )}
                            </div>
                        ))}
                    </ul>
                </section>
            )}
        </main>
    )
}
