import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { UserRole } from "../context/AuthContext";
import { RoleSelector } from "../components/RoleSelector";
import { Truck, Mail, Lock, User, Building } from "lucide-react";
import { motion } from "motion/react";
import { toast } from "sonner";

export function SignUpPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    company: "",
  });
  const [role, setRole] = useState<UserRole>("MANAGER");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      toast.error("Please fill in all required fields");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      toast.success("Account created successfully! Please sign in.");
      navigate("/");
    }, 1500);
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
              Start Managing
              <br />
              <span className="text-[#3B82F6]">Your Fleet Today</span>
            </h2>

            <p className="text-gray-400 mb-8 leading-relaxed">
              Join thousands of fleet managers who trust Transcope for their
              operations. Get started in minutes.
            </p>

            <div className="space-y-4">
              {[
                "Free 30-day trial, no credit card required",
                "Real-time vehicle tracking & monitoring",
                "Automated maintenance & compliance alerts",
                "Advanced analytics & reporting tools",
              ].map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#3B82F6] shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
                  <p className="text-gray-300 text-sm">{feature}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl">
              <p className="text-gray-400 text-xs font-semibold mb-2">
                Already have an account?
              </p>
              <Link
                to="/"
                className="text-[#3B82F6] hover:text-[#60A5FA] text-sm font-medium transition-colors"
              >
                Sign in here →
              </Link>
            </div>
          </div>
        </div>

        {/* Right Panel - Sign Up Form */}
        <div className="bg-white/5 backdrop-blur-xl p-12 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-2">Create Account</h2>
              <p className="text-gray-400 text-sm">
                Fill in your details to get started
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name Input */}
              <div className="relative">
                <User
                  size={20}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  placeholder="Full name"
                  disabled={isLoading}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#3B82F6] focus:shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all disabled:opacity-50"
                />
              </div>

              {/* Email Input */}
              <div className="relative">
                <Mail
                  size={20}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  placeholder="Email address"
                  disabled={isLoading}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#3B82F6] focus:shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all disabled:opacity-50"
                />
              </div>

              {/* Company Input (Optional) */}
              <div className="relative">
                <Building
                  size={20}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => handleChange("company", e.target.value)}
                  placeholder="Company name (optional)"
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
                  value={formData.password}
                  onChange={(e) => handleChange("password", e.target.value)}
                  placeholder="Password"
                  disabled={isLoading}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#3B82F6] focus:shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all disabled:opacity-50"
                />
              </div>

              {/* Confirm Password Input */}
              <div className="relative">
                <Lock
                  size={20}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => handleChange("confirmPassword", e.target.value)}
                  placeholder="Confirm password"
                  disabled={isLoading}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#3B82F6] focus:shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all disabled:opacity-50"
                />
              </div>

              {/* Role Selector */}
              <RoleSelector
                value={role}
                onChange={(value) => setRole(value as UserRole)}
                label="Register as"
              />

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] text-white py-3.5 rounded-xl font-semibold hover:shadow-[0_10px_40px_rgba(59,130,246,0.4)] transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Creating account...
                  </div>
                ) : (
                  "Create Account"
                )}
              </button>

              <p className="text-center text-xs text-gray-500 mt-4">
                By signing up, you agree to our{" "}
                <a href="#" className="text-[#3B82F6] hover:text-[#60A5FA]">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="text-[#3B82F6] hover:text-[#60A5FA]">
                  Privacy Policy
                </a>
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
