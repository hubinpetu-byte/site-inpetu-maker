"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword } from "firebase/auth"; 
import { doc, setDoc } from "firebase/firestore"; 
import { auth, db } from "../../lib/firebase"; // Garantia de caminho relativo para evitar falhas de mapeamento por apelido

export default function CadastroPage() {
  // Estados existentes
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Estados dos campos do formulário
  const [cpf, setCpf] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [genero, setGenero] = useState("");
  const [tipoUsuario, setTipoUsuario] = useState("");

  async function handleCadastro(e: React.FormEvent) {
    e.preventDefault(); // Garante o bloqueio de recarregamento do HTML nativo
    setErro("");

    // 1. Validação estrita de preenchimento
    if (!nome.trim() || !email.trim() || !senha || !cpf.trim() || !dataNascimento || !genero || !tipoUsuario) {
      setErro("Por favor, preencha todos os campos obrigatórios (*)");
      return;
    }

    // 2. Validação de igualdade de senhas
    if (senha !== confirmarSenha) {
      setErro("As senhas não coincidem");
      return;
    }

    // 3. Limite mínimo imposto pelo Firebase Auth
    if (senha.length < 6) {
      setErro("A senha precisa ter pelo menos 6 caracteres");
      return;
    }

    setLoading(true);

    try {
      // 🚀 CRIA O LOGIN NO FIREBASE AUTH
      const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
      const user = userCredential.user;

      // 🚀 GRAVA A FICHA COMPLETA NO FIRESTORE (users/{uid})
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        nome: nome,
        email: email,
        cpf: cpf,
        dataNascimento: dataNascimento,
        genero: genero,
        tipoUsuario: tipoUsuario, 
        role: "user", // Padrão de segurança inicial
        ativo: true,
        habilidades: [], 
        habilitacoes: [], 
        horasUtilizadas: 0,
        historico: [],
        proximasReservas: []
      });

      localStorage.setItem("usuario_uid", user.uid);

      // Redirecionamento limpo
      router.push("/perfil");

    } catch (error: any) {
      console.error("Erro interno capturado no Cadastro:", error);
      
      // Tratamento mapeado dos códigos de retorno da API do Google
      if (error.code === "auth/email-already-in-use") {
        setErro("Este e-mail já está sendo utilizado por outra conta.");
      } else if (error.code === "auth/invalid-email") {
        setErro("O formato do e-mail inserido é inválido.");
      } else if (error.code === "auth/weak-password") {
        setErro("A senha inserida é considerada muito fraca pelo servidor.");
      } else if (error.code === "auth/operation-not-allowed") {
        setErro("O provedor de E-mail/Senha está desativado no console do Firebase.");
      } else {
        setErro(error.message || "Erro de comunicação com o servidor do Firebase.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen w-full bg-white relative overflow-hidden">
      
      {/* Imagem de Fundo */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-100"
        style={{
          backgroundImage: "url('/cadastro-bg.jpg')",
        }}
      />

      {/* Conteúdo Centralizado */}
      <div className="relative z-10 flex min-h-screen justify-end px-10 pt-32 lg:px-20 pb-12">
        
        {/* Card do Formulário */}
        <div className="w-full max-w-3xl rounded-2xl bg-white p-8 shadow-xl">
          <h1 className="mb-8 text-2xl font-semibold text-gray-900">
            Cadastro InPETU Maker
          </h1>

          <form onSubmit={handleCadastro} className="space-y-4">
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
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0077cc]"
            />

            <input
              type="email"
              placeholder="Email*"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0077cc]"
            />

            {/* Input Senha */}
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
              </button> 
            </div>

            {/* Input Confirmar Senha */}
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
              value={dataNascimento}
              onChange={(e) => setDataNascimento(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0077cc]"
            />

            <select 
              value={genero}
              onChange={(e) => setGenero(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0077cc]"
            >
              <option value="">Gênero*</option>
              <option value="Feminino">Feminino</option>
              <option value="Masculino">Masculino</option>
              <option value="Outro">Outro</option>
              <option value="Prefiro não informar">Prefiro não informar</option>
            </select>

            <select 
              value={tipoUsuario}
              onChange={(e) => setTipoUsuario(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0077cc]"
            >
              <option value="">Eu sou*</option>
              <option value="Aluno UFSC">Aluno UFSC</option>
              <option value="Professor">Professor</option>
              <option value="Pesquisador">Pesquisador</option>
              <option value="Comunidade">Comunidade</option>
              <option value="Empresa">Empresa</option>
            </select>

            {erro && (
              <p className="text-sm font-semibold text-red-600 bg-red-50 p-2 rounded border border-red-200 text-center">
                {erro}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="mt-6 w-fit rounded-md bg-[#0077cc] px-8 py-3 text-white font-bold transition hover:bg-[#005fa3] disabled:opacity-50"
            >
              {loading ? "Cadastrando..." : "Cadastrar"}
            </button>

            <p className="text-sm text-gray-600 mt-4">
              Já tem uma conta?{" "}
              <a href="/auth" className="text-[#0077cc] underline font-bold hover:opacity-80">
                Fazer Login
              </a>
            </p>
          </form>
        </div>
      </div>
    </main>
  );
}