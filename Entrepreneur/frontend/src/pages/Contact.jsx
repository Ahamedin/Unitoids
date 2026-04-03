import React from "react";

// shadcn
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function Contact() {
  return (
    <div className="min-h-screen relative overflow-hidden text-foreground">

      {/* 🔥 GRID BACKGROUND */}
      <div className="grid-background"></div>

      {/* 🔥 DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/90 -z-10"></div>

      {/* ================= HERO ================= */}
      <section className="relative z-10 text-center py-24 px-6">
        <h1 className="text-4xl md:text-6xl font-extrabold text-white">
          Get in{" "}
          <span className="bg-gradient-to-r from-gray-200 via-gray-400 to-gray-500 bg-clip-text text-transparent">
            Touch
          </span>
        </h1>

        <p className="mt-6 text-gray-400 max-w-2xl mx-auto text-lg">
          Have questions, feedback, or want to collaborate? We’d love to hear from you.
        </p>
      </section>

      {/* ================= CONTACT ================= */}
      <section className="relative z-10 py-16 px-6">
        <div className="max-w-6xl mx-auto grid gap-10 md:grid-cols-2">

          {/* 🔵 FORM */}
          <Card className="bg-white/5 border border-white/10 backdrop-blur hover:border-white/30 transition">
            <CardContent className="pt-6">
              <h3 className="text-2xl font-bold mb-6 text-white">
                Send us a Message
              </h3>

              <form className="space-y-4">

                <div>
                  <label className="text-sm text-gray-400">
                    Full Name
                  </label>
                  <Input
                    placeholder="Enter your name"
                    className="bg-white/5 border-white/10 text-white"
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-400">
                    Email
                  </label>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    className="bg-white/5 border-white/10 text-white"
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-400">
                    Message
                  </label>
                  <textarea
                    rows="5"
                    placeholder="Type your message..."
                    className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-white/30"
                  />
                </div>

                <Button className="w-full mt-2">
                  Send Message
                </Button>

              </form>
            </CardContent>
          </Card>

          {/* 🔵 INFO */}
          <div className="flex flex-col justify-center space-y-6">

            <h3 className="text-2xl font-bold text-white">
              Contact Information
            </h3>

            <p className="text-gray-400">
              We’ll get back to you within 24 hours.
            </p>

            <div className="space-y-3 text-sm text-gray-300">
              <p>📍 Chennai, India</p>
              <p>📧 support@unitoids.com</p>
              <p>📞 +91 98765 43210</p>
            </div>

            {/* 🔥 SOCIAL */}
            <div>
              <h4 className="font-semibold mb-2 text-white">
                Follow us
              </h4>

              <div className="flex gap-4 text-sm text-gray-400">
                <span className="hover:text-white cursor-pointer transition">
                  Facebook
                </span>
                <span className="hover:text-white cursor-pointer transition">
                  Twitter
                </span>
                <span className="hover:text-white cursor-pointer transition">
                  Instagram
                </span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="relative z-10 text-center py-6 text-gray-500">
        © 2026 Unitoids. All rights reserved.
      </footer>
    </div>
  );
}

export default Contact;