import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ApplicationModal } from "@/components/ApplicationModal"

export function Header() {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <>
      <header className="flex items-center justify-between px-8 py-4">
        <div className="flex items-center gap-2">
          <АвтоПлатформаLogo />
          <span className="text-lg font-semibold text-white">
            АвтоПлатформа<sup className="text-xs">™</sup>
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          <a href="#" className="text-sm text-gray-300 hover:text-white transition-colors">
            Каталог авто
          </a>
          <a href="#" className="text-sm text-gray-300 hover:text-white transition-colors flex items-center gap-1">
            Финансирование <ChevronDown className="h-4 w-4" />
          </a>
          <a href="#" className="text-sm text-gray-300 hover:text-white transition-colors">
            Как купить
          </a>
          <a href="#" className="text-sm text-gray-300 hover:text-white transition-colors">
            О нас
          </a>
          <a href="#" className="text-sm text-gray-300 hover:text-white transition-colors">
            Контакты
          </a>
        </nav>

        <Button
          onClick={() => setModalOpen(true)}
          variant="outline"
          className="rounded-full border-violet-500 text-violet-400 hover:bg-violet-500/10 hover:text-violet-300 bg-transparent"
        >
          Подобрать авто
        </Button>
      </header>

      <ApplicationModal open={modalOpen} onOpenChange={setModalOpen} />
    </>
  )
}

function АвтоПлатформаLogo() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 11L7 6H17L19 11M5 11V18H19V11M5 11H19M7 18H8M16 18H17" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="8" cy="18" r="1.5" fill="#8B5CF6" />
      <circle cx="16" cy="18" r="1.5" fill="#8B5CF6" />
    </svg>
  )
}