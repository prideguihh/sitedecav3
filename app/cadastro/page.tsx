"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { User, Users, Phone, Mail, Lock, Eye, EyeOff, Loader2 } from "lucide-react"
import { API_ENDPOINTS, postForm } from "@/lib/api-config"

export default function CadastroPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const router = useRouter()

  // Nomes dos campos conforme esperado pelo backend PHP
  const [formData, setFormData] = useState({
    nome_crianca: "",
    nome_pai: "",
    celular: "",
    email: "",
    senha: ""
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    setSuccess("")

    try {
      // Envia via FormData ($_POST tradicional) com as chaves esperadas pelo PHP
      const result = await postForm(API_ENDPOINTS.cadastro, {
        nome_crianca: formData.nome_crianca,
        nome_pai: formData.nome_pai,
        celular: formData.celular,
        email: formData.email,
        senha: formData.senha,
      })

      // O PHP retorna textos puros conhecidos para os erros
      if (result.text === "Preencha todos os campos") {
        setError("Preencha todos os campos")
        return
      }
      if (result.text === "Este email já está cadastrado") {
        setError("Este email já está cadastrado")
        return
      }

      // Sucesso: o PHP retorna um texto contendo "cadastrado"
      if (result.text.includes("cadastrado")) {
        setSuccess("Cadastro realizado com sucesso! Redirecionando para o login...")
        setTimeout(() => router.push("/login"), 1500)
        return
      }

      // Qualquer outra resposta inesperada - mostra o texto retornado
      setError(result.text || "Erro ao realizar cadastro. Tente novamente.")
    } catch {
      // Falha de conexao com o servidor
      setError("Nao foi possivel conectar ao servidor. Tente novamente.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Fundo com gradiente radial */}
      <div 
        className="absolute inset-0 -z-10"
        style={{
          background: "radial-gradient(ellipse at center, #1a4a5e 0%, #0d2d3a 50%, #071a22 100%)"
        }}
      />
      
      {/* Card principal */}
      <div className="w-full max-w-md">
        <div 
          className="rounded-3xl p-8 shadow-2xl backdrop-blur-sm"
          style={{
            background: "rgba(15, 45, 60, 0.85)",
            border: "1px solid rgba(255, 255, 255, 0.1)"
          }}
        >
          {/* Logo do robô DECA */}
          <div className="flex justify-center mb-6">
            <div className="w-28 h-28 rounded-2xl bg-white flex items-center justify-center overflow-hidden shadow-lg">
             {/* Modo Claro */}
        <Image
          src="/deca-logo.png"
          alt="Robô DECA confuso"
          width={160}
          height={160}
          className="object-contain block dark:hidden"
        />
        {/* Modo Escuro */}
        <Image
          src="/deca-logo-dark.png"
          alt="Robô DECA confuso"
          width={160}
          height={160}
          className="object-contain hidden dark:block"
        />
            </div>
          </div>

          {/* Título */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white">Cadastro</h1>
          </div>

          {/* Formulário */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Mensagens de erro/sucesso */}
            {error && (
              <div className="p-3 rounded-xl bg-red-500/20 border border-red-500/30 text-red-300 text-sm text-center">
                {error}
              </div>
            )}
            {success && (
              <div className="p-3 rounded-xl bg-green-500/20 border border-green-500/30 text-green-300 text-sm text-center">
                {success}
              </div>
            )}

            {/* Nome da Criança */}
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                name="nome_crianca"
                placeholder="Nome da Crianca"
                value={formData.nome_crianca}
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-[#0a1f2a] border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                required
              />
            </div>

            {/* Nome do Responsável */}
            <div className="relative">
              <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                name="nome_pai"
                placeholder="Nome do Responsavel"
                value={formData.nome_pai}
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-[#0a1f2a] border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                required
              />
            </div>

            {/* Celular */}
            <div className="relative">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="tel"
                name="celular"
                placeholder="Celular"
                value={formData.celular}
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-[#0a1f2a] border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                required
              />
            </div>

            {/* Email */}
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-[#0a1f2a] border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                required
              />
            </div>

            {/* Senha */}
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                name="senha"
                placeholder="Senha"
                value={formData.senha}
                onChange={handleChange}
                className="w-full pl-12 pr-12 py-3.5 rounded-xl bg-[#0a1f2a] border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            {/* Botão Cadastrar */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 rounded-xl font-semibold text-white transition-all hover:opacity-90 active:scale-[0.98] mt-2 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              style={{
                background: "linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%)",
                boxShadow: "0 4px 20px rgba(30, 64, 175, 0.4)"
              }}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Cadastrando...
                </>
              ) : (
                "Cadastrar"
              )}
            </button>
          </form>

          {/* Link para login */}
          <p className="text-center mt-6 text-gray-400">
            Já tem conta?{" "}
            <Link href="/login" className="text-blue-400 hover:text-blue-300 font-medium transition-colors">
              Login
            </Link>
          </p>
        </div>

        {/* Rodapé */}
        <p className="text-center mt-6 text-gray-500 text-sm">
          Projeto DECA © 2026
        </p>
      </div>
    </div>
  )
}
