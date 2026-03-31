"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";


export default function CadastroPage() {
  // estados
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleCadastro() {
  setErro("");

  if (senha !== confirmarSenha) {
    setErro("As senhas não coincidem");
    return;
  }

  setLoading(true);

  try {
    const response = await fetch("http://localhost:3001/cadastro", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nome,
        email,
        senha,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      setErro(data.message || "Erro ao cadastrar");
      return;
    }

    // ✅ SALVA TOKEN E USUÁRIO
    localStorage.setItem("token", data.token);
    localStorage.setItem("usuario", JSON.stringify(data.usuario));

    // 🚀 REDIRECIONA PARA PERFIL
    router.push("/perfil");
  } catch (error) {
    setErro("Erro de conexão com o servidor");
  } finally {
    setLoading(false);
  }
}



  return (
       <main className="min-h-screen w-full bg-white relative overflow-hidden">
      
      {/* Overlay azul + imagem */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-100"
        style={{
          backgroundImage: "url('/cadastro-bg.jpg')",
        }}
      />

      {/* Conteúdo */}
     <div className="relative z-10 flex min-h-screen justify-end px-10 pt-32 lg:px-20">
        
        {/* Card branco */}
        <div className="w-full max-w-3xl h-182 rounded-2xl bg-white p-8 shadow-xl">
          <h1 className="mb-8 text-2xl font-semibold text-gray-900">
            Cadastro
          </h1>

          {/* FORMULÁRIO (vamos montar no próximo passo) */}
          <div className="space-y-4">
            <input
                type="text"
                placeholder="Nome Completo*"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className="w-full rounded-md border border-gray-300 px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0077cc]"
            />

            <input
              type="text"
              placeholder="CPF*"
              className="w-full rounded-md border border-gray-300 px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0077cc]"
            />

            <input
              type="email"
              placeholder="Email*"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0077cc]"
            />

            <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Crie sua senha*"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-4 py-3 pr-12 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0077cc]"
            />
              <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
   {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
    </button> </div>
          <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirmar senha*"
                  value={confirmarSenha}
                  onChange={(e) => setConfirmarSenha(e.target.value)}
                  className="w-full rounded-md border border-gray-300 px-4 py-3 pr-12 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0077cc]"
                />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>

              </div>


            <input
              type="date"
              className="w-full rounded-md border border-gray-300 px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0077cc]"
            />

            <select className="w-full rounded-md border border-gray-300 px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0077cc]">
              <option>Gênero</option>
              <option>Feminino</option>
              <option>Masculino</option>
              <option>Outro</option>
              <option>Prefiro não informar</option>
            </select>

            <select className="w-full rounded-md border border-gray-300 px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0077cc]">
              <option>Eu sou</option>
              <option>Aluno UFSC</option>
              <option>Professor</option>
              <option>Pesquisador</option>
              <option>Comunidade</option>
              <option>Empresa</option>
            </select>

            {erro && (
              <p className="text-sm text-red-600">
                {erro}
              </p>
            )}


            <button
              onClick={handleCadastro}
              disabled={loading}
              className="mt-6 w-fit rounded-md bg-[#0077cc] px-8 py-3 text-white transition hover:bg-[#005fa3] disabled:opacity-50"
            >
              {loading ? "Cadastrando..." : "Cadastrar"}
            </button>

          </div>
        </div>
      </div>
    </main>
  );
}
