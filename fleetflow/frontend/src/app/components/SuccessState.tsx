import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { CheckCircle2 } from "lucide-react";
import { getRoleDisplayName } from "../context/AuthContext";

interface SuccessStateProps {
  userName: string;
  userRole: string;
  onComplete: () => void;
}

export function SuccessState({ userName, userRole, onComplete }: SuccessStateProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Animate progress bar
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          // Trigger completion after a brief pause
          setTimeout(onComplete, 300);
          return 100;
        }
        return prev + 2;
      });
    }, 40); // 2000ms total (100 steps * 20ms)

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-12 text-center">
        {/* 3D Checkmark */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ 
            type: "spring", 
            stiffness: 200, 
            damping: 15,
            delay: 0.2 
          }}
          className="inline-flex items-center justify-center mb-6"
        >
          <div className="relative">
            {/* Glow effect layers */}
            <div className="absolute inset-0 bg-[#10B981] rounded-full blur-3xl opacity-60 animate-pulse" />
            <div className="absolute inset-0 bg-[#10B981] rounded-full blur-2xl opacity-40" />
            
            {/* Main checkmark */}
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              <CheckCircle2 
                size={120} 
                className="relative text-[#10B981] drop-shadow-[0_0_30px_rgba(16,185,129,0.8)]" 
                strokeWidth={2}
              />
            </motion.div>
          </div>
        </motion.div>

        {/* Success Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-3xl font-bold text-white mb-3">
            Authentication Verified
          </h2>
          <p className="text-xl text-gray-300 mb-2">
            Welcome back, <span className="text-[#10B981] font-semibold">{userName}</span>
          </p>
          <p className="text-sm text-gray-400 mb-8">
            {getRoleDisplayName(userRole as any)}
          </p>
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="max-w-md mx-auto"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-gray-400 text-sm font-medium">
              Syncing Fleet Data...
            </span>
            <span className="text-[#3B82F6] text-sm font-bold">
              {progress}%
            </span>
          </div>
          
          {/* Progress bar container */}
          <div className="relative w-full h-3 bg-white/10 rounded-full overflow-hidden border border-white/20">
            {/* Shimmer effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              animate={{ x: ["-100%", "200%"] }}
              transition={{ 
                duration: 1.5,
                repeat: Infinity,
                ease: "linear"
              }}
            />
            
            {/* Progress fill */}
            <motion.div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#3B82F6] via-[#06B6D4] to-[#10B981] rounded-full shadow-[0_0_20px_rgba(59,130,246,0.6)]"
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            />
          </div>

          {/* Loading dots */}
          <div className="flex items-center justify-center gap-2 mt-6">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-2 h-2 bg-[#3B82F6] rounded-full"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.4, 1, 0.4],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
