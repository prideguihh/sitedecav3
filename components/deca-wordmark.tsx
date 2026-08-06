import { cn } from "@/lib/utils"

/**
 * Logotipo textual "DECA" com a letra E estilizada em tres barras coloridas
 * (azul, vermelho e amarelo), igual a logo oficial. As letras D, C e A usam
 * a cor de texto atual (currentColor), entao o wordmark se adapta a qualquer
 * fundo ou tema. O tamanho acompanha o font-size do elemento pai (unidades em).
 */
export function DecaWordmark({ className }: { className?: string }) {
  return (
    <span
      className={cn("inline-flex items-center font-bold tracking-wide leading-none", className)}
      aria-label="DECA"
    >
      <span aria-hidden="true">D</span>
      <span
        aria-hidden="true"
        className="inline-flex flex-col justify-center mx-[0.1em]"
        style={{ width: "0.58em", height: "0.7em", gap: "0.11em" }}
      >
        <span className="w-full rounded-full bg-accent" style={{ height: "0.1em" }} />
        <span className="w-full rounded-full bg-primary" style={{ height: "0.1em" }} />
        <span className="w-full rounded-full bg-tertiary" style={{ height: "0.1em" }} />
      </span>
      <span aria-hidden="true">CA</span>
    </span>
  )
}
