import { Car, CircleDot, Hexagon, Triangle, Star, Zap, Circle } from "lucide-react"

const partners = [
  { name: "Toyota", icon: Circle },
  { name: "Mercedes", icon: Star },
  { name: "BMW", icon: Hexagon },
  { name: "Audi", icon: CircleDot },
  { name: "Volkswagen", icon: Triangle },
  { name: "Hyundai", icon: Zap },
  { name: "Kia", icon: Car },
]

export function PartnersSection() {
  return (
    <section className="flex flex-wrap items-center justify-center gap-6 md:gap-10 px-4 py-8">
      {partners.map((partner) => (
        <div key={partner.name} className="flex items-center gap-2 text-gray-500">
          <partner.icon className="h-4 w-4" />
          <span className="text-sm font-medium">{partner.name}™</span>
        </div>
      ))}
    </section>
  )
}