"use client";

import { useState } from "react";
import Image from "next/image";
import { Loader2, X } from "lucide-react";
import { signUp } from "../../lib/auth-client";

import { useRouter } from "next/navigation";

export default function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [role, setRole] = useState<number | undefined>(undefined);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-md border border-gray-300 p-4 rounded-md">
      <div>
        <div className="text-lg md:text-xl font-semibold p-1">Sign Up</div>
        <div className="text-xs md:text-sm p-1">
          Enter your information to create an account
        </div>
      </div>
      <div>
        <div className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <label htmlFor="first-name" className="p-1 text-sm font-semibold">
                First name
              </label>
              <input
                className="border-gray-300 border rounded-md p-1"
                id="first-name"
                placeholder="Max"
                required
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
                value={firstName}
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="last-name" className="p-1 text-sm font-semibold">
                Last name
              </label>
              <input
                className="border-gray-300 border rounded-md p-1"
                id="last-name"
                placeholder="Robinson"
                required
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
                value={lastName}
              />
            </div>
          </div>
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
            <label htmlFor="password" className="p-1 text-sm font-semibold">
              Password
            </label>
            <input
              className="border-gray-300 border rounded-md p-1"
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
              placeholder="Password"
            />
          </div>
          <div className="grid gap-2">
            <label htmlFor="password" className="p-1 text-sm font-semibold">
              Confirm Password
            </label>
            <input
              className="border-gray-300 border rounded-md p-1"
              id="password_confirmation"
              type="password"
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              autoComplete="new-password"
              placeholder="Confirm Password"
            />
          </div>

          <div className="grid gap-2">
            <label htmlFor="role" className="p-1 text-sm font-semibold">
              Role
            </label>
            <select
              className="border-gray-300 border rounded-md p-1"
              id="role"
              value={role ?? ""}
              onChange={(e) =>
                setRole(
                  e.target.value ? parseInt(e.target.value, 10) : undefined
                )
              }
            >
              <option value="">Select a role</option>
              <option value="1">Admin</option>
              <option value="2">User</option>
            </select>
          </div>

          <div className="grid gap-2">
            <label htmlFor="image" className="p-1 text-sm font-semibold">
              Profile Image (optional)
            </label>
            <div className="flex items-end gap-4">
              {imagePreview && (
                <div className="relative w-16 h-16 rounded-sm overflow-hidden">
                  <Image
                    src={imagePreview}
                    alt="Profile preview"
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              )}
              <div className="flex items-center gap-2 w-full">
                <input
                  className="border-gray-300 border rounded-md p-1"
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
                {imagePreview && (
                  <X
                    className="cursor-pointer"
                    onClick={() => {
                      setImage(null);
                      setImagePreview(null);
                    }}
                  />
                )}
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-black text-white text-sm font-semibold p-1.5"
            disabled={loading}
            onClick={async () => {
              await signUp.email({
                email,
                password,
                name: `${firstName} ${lastName}`,
                image: image ? await convertImageToBase64(image) : "",
                callbackURL: "/dashboard",
                fetchOptions: {
                  onResponse: () => {
                    setLoading(false);
                  },
                  onRequest: () => {
                    setLoading(true);
                  },

                  onSuccess: async () => {
                    router.push("/dashboard");
                  },
                },
              });
            }}
          >
            {loading ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              "Create an account"
            )}
          </button>
        </div>
      </div>
      <div></div>
    </div>
  );
}

async function convertImageToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
