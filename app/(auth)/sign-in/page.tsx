"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { signIn } from "../../lib/auth-client";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading] = useState(false);

  return (
    <div className="max-w-md border border-gray-300 p-4 rounded-md">
      <div>
        <div className="text-lg md:text-xl font-semibold p-1">Sign In</div>
        <div className="text-xs md:text-sm p-1">
          Enter your email below to login to your account
        </div>
      </div>
      <div>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <label htmlFor="email" className="p-1 text-sm font-semibold">
              Email
            </label>
            <input
              className="border-gray-300 border rounded-md p-1"
              id="email"
              type="email"
              placeholder="m@example.com"
              required
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              value={email}
            />
          </div>

          <div className="grid gap-2">
            <div className="flex items-center">
              <label htmlFor="password" className="p-1 text-sm font-semibold">
                Password
              </label>
            </div>

            <input
              className="border-gray-300 border rounded-md p-1"
              id="password"
              type="password"
              placeholder="password"
              autoComplete="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white text-sm font-semibold p-1.5"
            disabled={loading}
            onClick={async () => {
              await signIn.email({ email, password });
            }}
          >
            {loading ? <Loader2 size={16} className="animate-spin" /> : "Login"}
          </button>
        </div>
      </div>
    </div>
  );
}
