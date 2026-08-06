"use client"

import { useEffect } from 'react'

export function VLibras() {
  useEffect(() => {
    // Garante que o script só seja injetado uma vez
    const existingScript = document.getElementById('vlibras-script')
    
    if (!existingScript) {
      const script = document.createElement('script')
      script.id = 'vlibras-script'
      script.src = 'https://vlibras.gov.br/app/vlibras-plugin.js'
      script.async = true
      script.onload = () => {
        // @ts-ignore
        if (window.VLibras) {
          // @ts-ignore
          new window.VLibras.Widget('https://vlibras.gov.br/app')
        }
      }
      document.body.appendChild(script)
    }
  }, [])

  return (
    <div vw="true" className="enabled">
      <div vw-access-button="true" className="active" />
      <div vw-plugin-wrapper="true">
        <div className="vw-plugin-top-wrapper" />
      </div>
    </div>
  )
}