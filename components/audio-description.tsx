'use client'

import { useState, useRef } from 'react'

export function AudioDescription() {
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  
  const dragStartRef = useRef({ x: 0, y: 0 })
  const elementPosRef = useRef({ x: 0, y: 0 })

  // Inicia o arraste apenas quando interage com a alça ou fundo
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(true)
    dragStartRef.current = { x: e.clientX, y: e.clientY }
    elementPosRef.current = { ...position }
    e.currentTarget.setPointerCapture(e.pointerId)
  }

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return

    const deltaX = e.clientX - dragStartRef.current.x
    const deltaY = e.clientY - dragStartRef.current.y

    setPosition({
      x: elementPosRef.current.x + deltaX,
      y: elementPosRef.current.y + deltaY,
    })
  }

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return
    setIsDragging(false)
    e.currentTarget.releasePointerCapture(e.pointerId)
  }

  // Função isolada de áudio
  const handleSpeak = (e: React.MouseEvent) => {
    e.stopPropagation() // Impede que o clique dispare o arraste do pai

    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      alert('Seu navegador não suporta leitura por áudio.')
      return
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel()
      setIsSpeaking(false)
      return
    }

    const mainContent = document.querySelector('main') || document.body
    const textToRead = mainContent.innerText

    if (!textToRead.trim()) {
      alert('Nenhum texto encontrado para leitura.')
      return
    }

    const utterance = new SpeechSynthesisUtterance(textToRead)
    utterance.lang = 'pt-BR'
    utterance.rate = 1.0

    utterance.onend = () => setIsSpeaking(false)
    utterance.onerror = () => setIsSpeaking(false)

    window.speechSynthesis.speak(utterance)
    setIsSpeaking(true)
  }

  return (
    <div
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      style={{
        position: 'fixed',
        bottom: '120px',
        right: '20px',
        transform: `translate(${position.x}px, ${position.y}px)`,
        zIndex: 99999,
        touchAction: 'none',
        userSelect: 'none',
        WebkitUserSelect: 'none',
        display: 'flex',
        alignItems: 'center',
        boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
        borderRadius: '50px',
        backgroundColor: isSpeaking ? '#dc2626' : '#2563eb',
        transition: isDragging ? 'none' : 'transform 0.05s ease-out',
      }}
    >
      {/* Botão de Clique para Áudio */}
      <button
        onClick={handleSpeak}
        onPointerDown={(e) => e.stopPropagation()} // Impede inicio de drag no clique
        aria-label={isSpeaking ? "Parar leitura da página" : "Ouvir conteúdo da página"}
        style={{
          backgroundColor: 'transparent',
          color: '#ffffff',
          border: 'none',
          padding: '10px 14px 10px 18px',
          fontWeight: 'bold',
          fontSize: '13px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          outline: 'none',
        }}
        title={isSpeaking ? "Parar de ouvir" : "Ouvir página"}
      >
        <span>{isSpeaking ? '🛑 Parar Áudio' : '🔊 Audiodescrição'}</span>
      </button>

      {/* Alça de Arraste (Puxe por aqui) */}
      <div
        style={{
          paddingRight: '14px',
          paddingLeft: '4px',
          display: 'flex',
          alignItems: 'center',
          cursor: isDragging ? 'grabbing' : 'grab',
          borderLeft: '1px solid rgba(255,255,255,0.2)',
          height: '20px',
        }}
        title="Clique e arraste para qualquer lugar"
      >
        <svg width="12" height="12" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6 3H10V5H6V3ZM6 7H10V9H6V7ZM6 11H10V13H6V11Z" fill="#ffffff" />
        </svg>
      </div>
    </div>
  )
}