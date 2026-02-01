"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";

export default function LoginPage() {
  const router = useRouter();
  const { refetch } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Une erreur est survenue");
        return;
      }

      await refetch();

      const role = data?.user?.role;
      if (role === "ADMIN") {
        router.push("/admin");
      } else if (role === "COACH") {
        router.push("/coach");
      } else {
        router.push("/");
      }
    } catch {
      setError("Impossible de contacter le serveur. Réessayez.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="section bg-[#F5EBE0]">
        <div className="container-custom">
          <div className="mx-auto max-w-md">
            <div className="card p-6 sm:p-8">
              <h1 className="text-center font-display text-2xl font-bold text-[#704214] sm:text-3xl">
                Se connecter
              </h1>
              <p className="mt-2 text-center text-gray-600">
                Accédez à votre espace incubateur
              </p>

              <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                <div>
                  <label
                    htmlFor="email"
                    className="mb-1.5 block font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="exemple@email.com"
                    className="input-ism"
                    autoComplete="email"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="mb-1.5 block font-medium text-gray-700"
                  >
                    Mot de passe
                  </label>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Votre mot de passe"
                    className="input-ism"
                    autoComplete="current-password"
                    required
                  />
                </div>

                {error && (
                  <p
                    className="rounded-lg bg-red-50 p-3 text-sm text-red-600"
                    role="alert"
                  >
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn-primary w-full min-h-[48px]"
                >
                  {isLoading ? "Connexion en cours…" : "Se connecter"}
                </button>
              </form>

              <p className="mt-6 text-center text-sm text-gray-600">
                Pas encore de compte ?{" "}
                <Link
                  href="/inscription"
                  className="font-semibold text-[#FF6600] hover:underline"
                >
                  S&apos;inscrire
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
  );
}
