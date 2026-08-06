import Image from "next/image"
import { User } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const teamMembers = [
  {
    name: "Ana Clara Justi",
    role: "Desenvolvedora de Software e Pesquisadora",
    description: "Estudante da ETEC Lauro Gomes - Desenvolvimento de Sistemas - Responsável pelo Desenvolvimento de Softwares e Pesquisas do projeto.",
    image: "/ana.png", 
  },
  {
    name: "Guilherme Lima",
    role: "Desenvolvedor de Software e Pesquisador",
    description: "Estudante da ETEC Lauro Gomes - Desenvolvimento de Sistemas - Responsável pelo Desenvolvimento de Softwares e Pesquisas do projeto.",
    image: "/lima.png", // Corrigido de 'imagem' para 'image'
  },
  {
    name: "Guilherme Duarte",
    role: "Desenvolvedor de Sistemas e Hardware",
    description: "Estudante da ETEC Lauro Gomes - Desenvolvimento de Sistemas - Responsável pelo Hardware, desenvolvimento de Softwares e Pesquisas do projeto.",
    image: "/duarte.png",
  },
  {
    name: "Lívia Proença",
    role: "Desenvolvedora Full Stack e Pesquisadora",
    description: "Estudante da ETEC Lauro Gomes - Desenvolvimento de Sistemas - Responsável pelo Hardware, desenvolvimento de Softwares e Pesquisas do projeto.",
    image: "/livia.png",
  },
  {
    name: "Leonardo Milano",
    role: "Desenvolvedor de Software e Designer de Protótipos",
    description: "Estudante da ETEC Lauro Gomes - Desenvolvimento de Sistemas - Responsável pelo Desenvolvimento de Softwares, Pesquisas do projeto, Design e protótipos.",
    image: "/leo.png",
  },
]

// Ciclo de cores da marca (vermelho, azul, amarelo)
const avatarCycle = [
  "bg-primary/10 text-primary",
  "bg-accent/10 text-accent",
  "bg-tertiary/15 text-tertiary-foreground",
]
const roleCycle = ["text-primary", "text-accent", "text-tertiary-foreground"]

export function TeamSection() {
  return (
    <section id="equipe" className="py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-accent/20 text-accent-foreground text-sm font-medium mb-4">
            Nossa Equipe
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 text-balance">
            Conheça os Integrantes do Projeto
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Uma equipe multidisciplinar dedicada a transformar a educação através da tecnologia.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {teamMembers.map((member, index) => (
            <Card key={index} className="border-border bg-card hover:shadow-lg transition-shadow group">
              <CardContent className="p-6 text-center">
                <div className={`relative w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden flex items-center justify-center transition-colors ${avatarCycle[index % avatarCycle.length]}`}>
                  {member.image ? (
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <User className="w-12 h-12" />
                  )}
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-1">{member.name}</h3>
                <p className={`text-sm font-medium mb-3 ${roleCycle[index % roleCycle.length]}`}>{member.role}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{member.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Card className="border-border bg-primary/5 inline-block">
            <CardContent className="p-8">
              <p className="text-lg text-foreground mb-2 font-medium">
                Unidos pela educação
              </p>
              <p className="text-muted-foreground max-w-2xl">
                Nossa equipe é formada por estudantes apaixonados por tecnologia e educação, 
                trabalhando juntos para criar soluções inovadoras que impactem positivamente 
                o aprendizado infantil.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}