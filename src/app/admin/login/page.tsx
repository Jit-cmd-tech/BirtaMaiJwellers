"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Gem, Lock, ArrowRight, AlertCircle, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Login failed");
      }

      router.push("/admin");
      router.refresh();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Invalid credentials entered.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0D2A24] text-[#F8F5EE] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center space-y-3">
        <div className="w-12 h-12 rounded-full border border-[#C6A66B] flex items-center justify-center mx-auto bg-[#123B32] shadow-lg">
          <Gem className="w-6 h-6 text-[#C6A66B]" />
        </div>
        <h1 className="font-serif text-3xl font-normal tracking-wide text-[#F8F5EE]">
          Birta Mai Jewellers
        </h1>
        <p className="text-xs tracking-[0.25em] uppercase text-[#C6A66B]">
          Store Management Portal • Birgunj
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-[#123B32] py-8 px-6 sm:px-10 border border-[#1A4E42] rounded-sm shadow-2xl space-y-6">
          <div className="flex items-center gap-2 text-xs text-[#F8F5EE]/70 border-b border-[#1A4E42] pb-4">
            <Lock className="w-4 h-4 text-[#C6A66B]" />
            <span>Authorized Atelier Personnel Only</span>
          </div>

          {error && (
            <div className="p-3 bg-red-950/80 border border-red-800 text-red-200 text-xs rounded-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-[#F8F5EE] uppercase tracking-wider mb-2">
                Administrator Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter administrator password..."
                  className="w-full px-4 py-3 bg-[#0D2A24] border border-[#1A4E42] rounded-xs text-[#F8F5EE] placeholder-[#6A7066] text-sm focus:outline-none focus:border-[#C6A66B]"
                />
              </div>
            </div>

            <div className="text-[11px] text-[#F8F5EE]/70 space-y-1">
              <div>Default local password for setup:</div>
              <code className="text-[#C6A66B] font-mono bg-[#0D2A24] px-1.5 py-0.5 rounded-xs">
                BirtaMaiAdmin@2026
              </code>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-4 flex items-center justify-center gap-2 bg-[#C6A66B] hover:bg-[#B59458] disabled:opacity-50 text-[#123B32] py-3.5 px-4 rounded-xs text-xs font-bold uppercase tracking-widest transition-all shadow-md"
            >
              {loading ? (
                <span>Authenticating...</span>
              ) : (
                <>
                  <span>Sign In to Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="pt-4 border-t border-[#1A4E42] flex items-center justify-between text-xs text-[#F8F5EE]/70">
            <Link href="/" className="hover:text-[#C6A66B] transition-colors">
              ← Return to Public Store
            </Link>
            <div className="flex items-center gap-1 text-[11px]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#C6A66B]" />
              <span>Encrypted Session</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
