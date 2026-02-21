import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface RoleSelectorProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
}

export function RoleSelector({ value, onChange, label = "Preview as" }: RoleSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const roles = [
    { value: "MANAGER", label: "Fleet Manager" },
    { value: "DISPATCHER", label: "Dispatcher" },
    { value: "SAFETY_OFFICER", label: "Safety Officer" },
    { value: "FINANCIAL_ANALYST", label: "Financial Analyst" },
  ];

  const selectedRole = roles.find((r) => r.value === value);
  const displayValue = selectedRole ? selectedRole.label : value;

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-3.5 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl text-white text-sm hover:border-[#3B82F6] hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all"
      >
        <span className="text-gray-400">
          {label}: <span className="text-white font-medium">{displayValue}</span>
        </span>
        <ChevronDown
          size={16}
          className={`text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-[#1E293B]/95 backdrop-blur-2xl border border-white/20 rounded-xl overflow-hidden z-10 shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
          {roles.map((role) => (
            <button
              key={role.value}
              type="button"
              onClick={() => {
                onChange(role.value);
                setIsOpen(false);
              }}
              className={`
                w-full px-4 py-3 text-left text-sm transition-all
                ${
                  value === role.value
                    ? "bg-[#3B82F6]/80 text-white backdrop-blur-xl"
                    : "text-gray-300 hover:bg-white/10"
                }
              `}
            >
              {role.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}