import { useState } from "react"
import { Search, ArrowUpRight, Plus } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { ApplicationModal } from "@/components/ApplicationModal"

const cars = [
  { name: "Toyota Camry 2023", info: "2.5L, Автомат, Comfort", price: 3250000, displayPrice: "3 250 000 ₽", image: "/placeholder.jpg" },
  { name: "BMW X5 2022", info: "3.0L, Автомат, Premium", price: 6890000, displayPrice: "6 890 000 ₽", image: "/placeholder.jpg" },
  { name: "Hyundai Solaris 2024", info: "1.6L, Механика, Base", price: 1450000, displayPrice: "1 450 000 ₽", initials: "HS", color: "bg-teal-600" },
  { name: "Kia K5 2023", info: "2.0L, Автомат, Luxury", price: 2890000, displayPrice: "2 890 000 ₽", initials: "K5", color: "bg-amber-600" },
]

export function LinkAccountsCard() {
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedCar, setSelectedCar] = useState({ name: "", price: 0 })

  const handleCarClick = (car: typeof cars[0]) => {
    setSelectedCar({ name: car.name, price: car.price })
    setModalOpen(true)
  }
  return (
    <div className="rounded-2xl bg-[#141414] border border-[#262626] p-6 flex flex-col">
      <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-[#1f1f1f] border border-[#2a2a2a]">
        <Search className="h-5 w-5 text-gray-400" />
      </div>

      <h3 className="mb-2 text-lg font-semibold text-white">Поиск и подбор</h3>
      <p className="mb-4 text-sm text-gray-400">Тысячи автомобилей от официальных дилеров с удобными фильтрами поиска</p>

      <a href="#" className="mb-6 inline-flex items-center text-sm text-gray-400 hover:text-white transition-colors">
        Подробнее <ArrowUpRight className="ml-1 h-4 w-4" />
      </a>

      <div className="mt-auto space-y-2 rounded-xl bg-[#1a1a1a] border border-[#262626] p-3">
        {cars.map((car, index) => (
          <button
            key={index}
            onClick={() => handleCarClick(car)}
            className="flex items-center justify-between rounded-lg bg-[#0f0f0f] px-3 py-2 w-full hover:bg-[#1a1a1a] transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <Avatar className="h-9 w-9 rounded-md">
                {car.image ? (
                  <AvatarImage src={car.image || "/placeholder.svg"} alt={car.name} className="object-cover" />
                ) : null}
                <AvatarFallback className={`${car.color || "bg-gray-600"} text-white text-xs rounded-md`}>
                  {car.initials ||
                    car.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="text-left">
                <p className="text-sm font-medium text-white">{car.name}</p>
                <p className="text-xs text-gray-500">{car.info}</p>
              </div>
            </div>
            <span className="text-xs text-violet-400 font-medium">{car.displayPrice}</span>
          </button>
        ))}

        <Button
          variant="ghost"
          className="w-full justify-center text-gray-500 hover:text-white hover:bg-[#1f1f1f] mt-2"
        >
          <Plus className="mr-2 h-4 w-4" /> Показать ещё
        </Button>
      </div>

      <ApplicationModal 
        open={modalOpen} 
        onOpenChange={setModalOpen}
        carName={selectedCar.name}
        carPrice={selectedCar.price}
      />
    </div>
  )
}