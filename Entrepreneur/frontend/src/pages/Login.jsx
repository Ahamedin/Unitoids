import { SignIn } from "@clerk/clerk-react";
import { Card, CardContent } from "@/components/ui/card";

const LoginPage = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">

      {/* 🔥 GRID BACKGROUND */}
      <div className="grid-background"></div>

      {/* 🔥 DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/90 -z-10"></div>

      {/* 🔥 CONTENT */}
      <div className="relative z-10 w-full max-w-md">

        <Card className="bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl rounded-xl">
          <CardContent className="pt-8 pb-6 px-6 space-y-6">

            {/* HEADER */}
            <div className="text-center">
              <h2 className="text-2xl font-bold text-white">
                Welcome Back !
              </h2>
              <p className="text-sm text-gray-400 mt-1">
                Sign in to continue your journey
              </p>
            </div>

            {/* CLERK SIGNIN */}
            <div className="flex justify-center">
            <SignIn
              signUpUrl="/register"
              appearance={{
                elements: {
                  card: "shadow-none bg-transparent",

                  // 🔥 TEXT
                  headerTitle: "text-white",
                  headerSubtitle: "text-gray-400",

                  // 🔥 OR DIVIDER
                  dividerLine: "bg-white/20",
                  dividerText: "text-gray-400",

                  // 🔥 INPUT LABEL (Email address)
                  formFieldLabel: "text-gray-300",

                  // 🔥 INPUT BOX
                  formFieldInput:
                    "bg-white/10 border border-white/10 text-white placeholder:text-gray-400",

                  // 🔥 BUTTONS
                  socialButtonsBlockButton:
                    "bg-white/10 text-white border border-white/10 hover:bg-white/20",

                  formButtonPrimary:
                    "bg-white text-black hover:bg-gray-200",

                  // 🔥 LINKS
                  footerActionLink:
                    "text-gray-300 hover:text-white",
                },
              }}
            />
            </div>

          </CardContent>
        </Card>

      </div>
    </div>
  );
};

export default LoginPage;