"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setErro("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:3001/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, senha }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErro(data.message || "Email ou senha inválidos");
        return;
      }

      // ✅ salva token e usuário
      localStorage.setItem("token", data.token);
      localStorage.setItem("usuario", JSON.stringify(data.usuario));

      // 🚀 redireciona para o perfil
      router.push("/perfil");

    } catch (error) {
      setErro("Erro ao conectar com o servidor");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-neutral-900">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-sm rounded-2xl shadow-lg p-8"
        style={{ backgroundColor: "#0077cc" }}
      >
        <h1 className="text-2xl font-semibold text-center mb-6 text-white">
          Login InPETU Maker
        </h1>

        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full rounded-lg border border-white/30 bg-white px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Senha"
            className="w-full rounded-lg border border-white/30 bg-white px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />

          {erro && (
            <p className="text-sm text-red-200 text-center">{erro}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-[#E9D354] text-black font-semibold py-3 hover:bg-gray-100 transition disabled:opacity-60"
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>

          <p className="text-sm text-center text-white">
            Ainda não tem cadastro?{" "}
            <a
              href="/cadastro"
              className="underline font-medium hover:opacity-90"
            >
              Criar conta
            </a>
          </p>
        </div>
      </form>
    </div>
  );
}
