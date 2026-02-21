import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { useAuth, UserRole, getRoleDisplayName } from "../context/AuthContext";
import { SuccessState } from "../components/SuccessState";
import { Truck, Mail, Lock } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "sonner";

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [authenticatedUser, setAuthenticatedUser] = useState<any>(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsLoading(true);

    try {
      const user = await login(email, password);
      setAuthenticatedUser(user);
      setShowSuccess(true);
    } catch (error) {
      toast.error("Invalid credentials. Try one of the demo accounts.");
      setIsLoading(false);
    }
  };

  const handleSuccessComplete = () => {
    // Redirect based on role
    const roleRoutes: Record<UserRole, string> = {
      MANAGER: "/dashboard",
      DISPATCHER: "/trips",
      SAFETY_OFFICER: "/drivers",
      FINANCIAL_ANALYST: "/analytics",
    };

    const targetRoute = roleRoutes[authenticatedUser.role];
    navigate(targetRoute);
  };

  return (
    <div className="min-h-screen bg-[#0F172A] flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-0 overflow-hidden rounded-3xl shadow-[0_20px_100px_rgba(0,0,0,0.7)]">
        {/* Left Panel - Branding */}
        <div className="bg-gradient-to-br from-[#1E293B] to-[#0F172A] p-12 flex flex-col justify-center relative overflow-hidden border-r border-white/10">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-40" />
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-14 h-14 bg-gradient-to-br from-[#3B82F6] to-[#06B6D4] rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(59,130,246,0.5)]">
                <Truck size={28} className="text-white" />
              </div>
              <h1 className="text-4xl font-bold text-white">Transcope</h1>
            </div>

            <h2 className="text-3xl font-bold text-white mb-4">
              Fleet Management
              <br />
              <span className="text-[#3B82F6]">Reimagined</span>
            </h2>

            <p className="text-gray-400 mb-8 leading-relaxed">
              Real-time vehicle tracking, intelligent dispatch, and comprehensive
              analytics in one powerful platform.
            </p>

            <div className="space-y-4">
              {[
                "Live GPS tracking & route optimization",
                "Automated maintenance scheduling",
                "Driver performance analytics",
                "Financial reporting & ROI insights",
              ].map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#3B82F6] shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
                  <p className="text-gray-300 text-sm">{feature}</p>
                </div>
              ))}
            </div>

            {/* Demo Accounts */}
            <div className="mt-8 p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl">
              <p className="text-gray-400 text-xs font-semibold mb-2">Demo Accounts:</p>
              <div className="space-y-1 text-xs text-gray-500">
                <p>• manager@transcope.com</p>
                <p>• dispatch@transcope.com</p>
                <p>• safety@transcope.com</p>
                <p>• finance@transcope.com</p>
                <p className="text-gray-600 mt-1">Password: any</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Auth Form or Success State */}
        <div className="bg-white/5 backdrop-blur-xl p-12 flex flex-col justify-center">
          <AnimatePresence mode="wait">
            {!showSuccess ? (
              <motion.div
                key="login-form"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-white mb-2">Welcome Back</h2>
                  <p className="text-gray-400 text-sm">
                    Enter your credentials to access your account
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Email Input */}
                  <div className="relative">
                    <Mail
                      size={20}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email address"
                      disabled={isLoading}
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#3B82F6] focus:shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all disabled:opacity-50"
                    />
                  </div>

                  {/* Password Input */}
                  <div className="relative">
                    <Lock
                      size={20}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Password"
                      disabled={isLoading}
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#3B82F6] focus:shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all disabled:opacity-50"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] text-white py-3.5 rounded-xl font-semibold hover:shadow-[0_10px_40px_rgba(59,130,246,0.4)] transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Authenticating...
                      </div>
                    ) : (
                      "Sign In"
                    )}
                  </button>

                  <div className="text-center mt-4">
                    <p className="text-gray-400 text-sm">
                      Don't have an account?{" "}
                      <Link
                        to="/signup"
                        className="text-[#3B82F6] hover:text-[#60A5FA] font-medium transition-colors"
                      >
                        Sign up
                      </Link>
                    </p>
                  </div>
                </form>
              </motion.div>
            ) : (
              <SuccessState
                key="success-state"
                userName={authenticatedUser?.name || ""}
                userRole={authenticatedUser?.role || ""}
                onComplete={handleSuccessComplete}
              />
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}