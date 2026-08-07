"use client"

import { useEffect } from "react"

const VLibrasScriptId = "vlibras-script"
const VLibrasScriptSrc = "https://vlibras.gov.br/app/vlibras-plugin.js"
const VLibrasRootPath = "https://vlibras.gov.br/app"

declare global {
  interface Window {
    VLibras?: {
      Widget: new (rootPath: string ) => unknown
    }
    __decaVLibrasInitialized?: boolean
  }
}

/**
 * Integra o widget oficial do VLibras em uma aplicação Next.js.
 */
export function VLibras() {
  useEffect(() => {
    let disposed = false

    const initializeWidget = () => {
      // Evita inicialização múltipla ou se o componente foi desmontado
      if (disposed || !window.VLibras?.Widget || window.__decaVLibrasInitialized) {
        return
      }

      window.__decaVLibrasInitialized = true
      new window.VLibras.Widget(VLibrasRootPath)

      // O plugin oficial do VLibras depende do evento window.onload.
      // Se o componente montar após o carregamento da página, forçamos o trigger.
      if (document.readyState === "complete" && typeof window.onload === "function") {
        window.onload(new Event("load"))
      }
    }

    const existingScript = document.getElementById(VLibrasScriptId) as HTMLScriptElement | null

    if (existingScript) {
      if (window.VLibras?.Widget) {
        initializeWidget()
      } else {
        existingScript.addEventListener("load", initializeWidget, { once: true })
      }
    } else {
      const script = document.createElement("script")
      script.id = VLibrasScriptId
      script.src = VLibrasScriptSrc
      script.async = true
      script.addEventListener("load", initializeWidget, { once: true })
      document.body.appendChild(script)
    }

    return () => {
      disposed = true
    }
  }, [])

  return (
    <div vw="" className="enabled">
      <div vw-access-button="" className="active" />
      <div vw-plugin-wrapper="">
        <div className="vw-plugin-top-wrapper" />
      </div>
    </div>
  )
}
