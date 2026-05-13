import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import hiBot from "../assets/man-waiving-hand.json";
import freelancersData from "../datas/freelancers.json";

// shadcn
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const ChatBot = ({ sendMessage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [width, setWidth] = useState(380);
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);
  const [isResizingSidebar, setIsResizingSidebar] = useState(false);

  const messagesEndRef = useRef(null);

  const clampWidth = (desired, currentViewportWidth = window.innerWidth) => {
    const maxWidth = Math.min(600, currentViewportWidth - 16);
    const minWidth = Math.min(320, maxWidth);
    return Math.max(minWidth, Math.min(desired, maxWidth));
  };

  const isMobile = viewportWidth < 640;
  const chatWidth = clampWidth(width, viewportWidth);

  // ================= SCROLL =================
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // ================= PARSER =================
  const parseFreelancers = (text) => {
    const results = [];

    freelancersData.forEach((freelancer) => {
      if (
        text.toLowerCase().includes(freelancer.name.toLowerCase())
      ) {
        results.push(freelancer);
      }
    });

    return results;
  };

  // ================= SEND =================
  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = {
      sender: "user",
      type: "text",
      text: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const botResponse = await sendMessage(input);

      const responseText =
        botResponse.general_answer ||
        botResponse.support_answer ||
        botResponse.freelancer_answer ||
        botResponse.reply ||
        "";

      const newMessages = [];

      // ✅ Detect freelancer response
      if (
        responseText.toLowerCase().includes("name:") ||
        responseText.includes("**Name**")
      ) {
        const parsed = parseFreelancers(responseText);

        if (parsed.length > 0) {
          newMessages.push({
            sender: "bot",
            type: "freelancers",
            freelancers: parsed,
          });
        } else {
          newMessages.push({
            sender: "bot",
            type: "text",
            text: responseText,
          });
        }
      } else {
        newMessages.push({
          sender: "bot",
          type: "text",
          text: responseText,
        });
      }

      setMessages((prev) => [...prev, ...newMessages]);

    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          type: "text",
          text: "❌ Error processing request",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // ================= RESIZE =================
  const handleMouseMove = (e) => {
    if (isResizingSidebar) {
      const newWidth = window.innerWidth - e.clientX;

      if (newWidth >= 320 && newWidth <= 600) {
        setWidth(newWidth);
      }
    }
  };

  useEffect(() => {
    const stop = () => setIsResizingSidebar(false);

    const onResize = () => {
      const vw = window.innerWidth;
      setViewportWidth(vw);
      setWidth((prev) => clampWidth(prev, vw));
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", stop);
    window.addEventListener("resize", onResize);

    onResize();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", stop);
      window.removeEventListener("resize", onResize);
    };
  });

  // ================= UI =================
  return (
    <>
      {/* 💬 FLOAT BUTTON */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 z-50 flex items-center justify-center cursor-pointer transition-all duration-300"
        style={{
          right: isOpen ? Math.min(chatWidth + 16, viewportWidth - 72) : 16,
        }}
      >
        <div className="relative w-14 h-14 rounded-full bg-white/70 shadow-lg flex items-center justify-center hover:scale-110 transition">

          <span className="absolute inset-0 rounded-full bg-white opacity-20 animate-ping"></span>

          <div className="w-10 h-10 z-10">
            <Lottie animationData={hiBot} loop />
          </div>
        </div>
      </div>

      {/* 🔥 SIDEBAR */}
      <div
        className={`fixed top-[68px] right-0 z-40 h-[calc(100vh-68px)] 
        bg-black/80 backdrop-blur-xl border-l border-white/10
        flex flex-col transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{
          width: chatWidth,
          height: "calc(100dvh - 68px)",
        }}
      >
        {/* RESIZE HANDLE */}
        <div
          className={`absolute left-0 w-2 h-full cursor-ew-resize ${
            isMobile ? "hidden" : "block"
          }`}
          onMouseDown={() => setIsResizingSidebar(true)}
        />

        {/* HEADER */}
        <div className="px-4 py-3 border-b border-white/10 flex justify-between items-center">
          <h2 className="font-semibold text-white">
            Sync AI ©
          </h2>

          <button
            onClick={() => setIsOpen(false)}
            className="text-white"
          >
            ⨉
          </button>
        </div>

        {/* ================= MESSAGES ================= */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">

          {messages.map((m, i) => (
            <div
              key={i}
              className={m.sender === "user" ? "text-right" : ""}
            >

              {/* TEXT */}
              {m.type === "text" && (
                <span
                  className={`inline-block px-4 py-2 rounded-xl text-sm max-w-[80%] ${
                    m.sender === "user"
                      ? "bg-white text-black"
                      : "bg-white/10 text-white"
                  }`}
                >
                  {m.text}
                </span>
              )}

              {/* FREELANCER CARDS */}
              {m.type === "freelancers" && (
                <div className="grid gap-4 mt-2">

                  {m.freelancers.map((f) => (
                    <div
                      key={f._id || f.id}
                      className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-4 
                      hover:scale-105 hover:shadow-2xl transition duration-300 flex flex-col justify-between"
                    >

                      {/* TOP */}
                      <div>
                        <h2 className="text-lg font-semibold text-white">
                          {f.name}
                        </h2>

                        <p className="text-gray-400 text-sm">
                          {f.subcategory || f.category}
                        </p>

                        <p className="text-gray-500 text-sm mt-1">
                          📍 {f.location?.city || f.city} -
                          {" "}
                          {f.location?.pincode || f.pincode || "N/A"}
                        </p>

                        <p className="text-yellow-400 text-sm mt-1">
                          ⭐ {f.rating || 4.5}
                        </p>
                      </div>

                      {/* BOTTOM */}
                      <div className="mt-4 flex items-center justify-between">

                        <p className="text-lg font-bold text-white">
                          ₹{f.pricing?.amount || f.price}
                        </p>

                        <Link to={`/freelancer/${f._id || f.id}`}>
                          <Button size="sm" className="text-white">
                            View
                          </Button>
                        </Link>

                      </div>
                    </div>
                  ))}

                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <p className="text-sm text-white">
              © Thinking...
            </p>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* ================= INPUT ================= */}
        <div className="p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] border-t border-white/10 flex gap-2 bg-black/90">

          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask something..."
            className="bg-white/5 border-white/10 text-white text-sm"
            onKeyDown={(e) =>
              e.key === "Enter" && handleSend()
            }
          />

          <Button
            onClick={handleSend}
            className="text-white"
          >
            Send
          </Button>

        </div>
      </div>
    </>
  );
};

export default ChatBot;