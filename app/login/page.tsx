"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { User, Lock, Eye, EyeOff, Loader2 } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { API_ENDPOINTS, postForm } from "@/lib/api-config"

// Objeto JSON do usuario que o login.php retorna em caso de sucesso
interface LoginUser {
  nome_crianca?: string
  nome_pai?: string
  email?: string
  celular?: string
}

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [loginField, setLoginField] = useState("")
  const [senha, setSenha] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const { login } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      // Envia via FormData ($_POST tradicional): chaves 'login' e 'senha'
      const result = await postForm<LoginUser>(API_ENDPOINTS.login, {
        login: loginField,
        senha: senha,
      })

      // O PHP retorna o texto puro "erro" quando as credenciais estao incorretas
      if (result.text === "erro") {
        setError("E-mail ou senha incorretos")
        return
      }

      // Em caso de sucesso, o PHP retorna o objeto JSON do usuario
      if (result.json) {
        const data = result.json
        login({
          name: data.nome_crianca || data.nome_pai || "Usuario",
          email: data.email || loginField,
        })
        router.push("/")
        return
      }

      // Qualquer outra resposta inesperada
      setError("E-mail ou senha incorretos")
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
          width={254}
          height={254}
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
            <h1 className="text-3xl font-bold text-white mb-2">DECA</h1>
            <p className="text-gray-300 text-sm">Robô educacional inteligente</p>
          </div>

          {/* Formulário */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Mensagem de erro */}
            {error && (
              <div className="p-3 rounded-xl bg-red-500/20 border border-red-500/30 text-red-300 text-sm text-center">
                {error}
              </div>
            )}

            {/* Login (email ou usuario) */}
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                name="login"
                placeholder="Email ou Usuario"
                value={loginField}
                onChange={(e) => setLoginField(e.target.value)}
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
                placeholder="Digite sua senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
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

            {/* Botão Entrar */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 rounded-xl font-semibold text-white transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              style={{
                background: "linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%)",
                boxShadow: "0 4px 20px rgba(30, 64, 175, 0.4)"
              }}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Entrando...
                </>
              ) : (
                "Entrar"
              )}
            </button>
          </form>

          {/* Link para cadastro */}
          <p className="text-center mt-6 text-gray-400">
            Não tem conta?{" "}
            <Link href="/cadastro" className="text-blue-400 hover:text-blue-300 font-medium transition-colors">
              Cadastrar
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
