"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth"; // Importa o login do Firebase
import { auth } from "@/lib/firebase"; // Importa a conexão configurada do Firebase

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
      // 🚀 Faz o login autenticando direto no Firebase do Google
      const userCredential = await signInWithEmailAndPassword(auth, email, senha);
      const user = userCredential.user;

      // O Firebase e nosso AuthContext já cuidam de monitorar o token e o usuário,
      // mas mantemos uma cópia leve no localStorage caso outras partes do seu layout precisem:
      localStorage.setItem("usuario_uid", user.uid);

      // 🚀 Redireciona direto para o perfil do aluno no MakerSpace
      router.push("/perfil");

    } catch (error: any) {
      // Tratamento amigável de erros comuns do Firebase
      if (error.code === "auth/user-not-found" || error.code === "auth/wrong-password" || error.code === "auth/invalid-credential") {
        setErro("E-mail ou senha inválidos.");
      } else if (error.code === "auth/invalid-email") {
        setErro("Formato de e-mail inválido.");
      } else {
        setErro("Erro ao conectar com o servidor do Firebase.");
      }
      console.error("Erro Firebase Auth:", error);
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
            <p className="text-sm text-red-200 text-center font-medium bg-red-600/30 py-1.5 rounded-md border border-red-500/20">
              {erro}
            </p>
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