import { useState } from "react"
import { CreditCard, ArrowUpRight, Calendar, ChevronDown, Info } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { ApplicationModal } from "@/components/ApplicationModal"

export function PaymentRolesCard() {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <>
    <div className="rounded-2xl bg-[#141414] border border-[#262626] p-6 flex flex-col">
      <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-[#1f1f1f] border border-[#2a2a2a]">
        <CreditCard className="h-5 w-5 text-gray-400" />
      </div>

      <h3 className="mb-2 text-lg font-semibold text-white">Финансирование</h3>
      <p className="mb-4 text-sm text-gray-400">Кредит, лизинг или рассрочка от ведущих банков на выгодных условиях</p>

      <a href="#" className="mb-6 inline-flex items-center text-sm text-gray-400 hover:text-white transition-colors">
        Подробнее <ArrowUpRight className="ml-1 h-4 w-4" />
      </a>

      <div className="mt-auto space-y-4 rounded-xl bg-[#1a1a1a] border border-[#262626] p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src="/professional-man-portrait.png" alt="BMW X5 2022" />
              <AvatarFallback className="bg-gray-600 text-white">BM</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium text-white">BMW X5 2022</p>
              <p className="text-xs text-gray-500">3.0L Автомат · 6 890 000 ₽</p>
            </div>
          </div>
          <button className="text-sm text-violet-400 hover:text-violet-300">Изменить</button>
        </div>

        <div>
          <label className="mb-2 flex items-center gap-1 text-xs text-gray-400">
            Тип финансирования <Info className="h-3 w-3" />
          </label>
          <div className="flex items-center justify-between rounded-lg bg-[#0f0f0f] border border-[#262626] px-3 py-2.5">
            <span className="text-sm text-white">Автокредит 3.9%</span>
            <ChevronDown className="h-4 w-4 text-gray-500" />
          </div>
          <p className="mt-1 text-xs text-gray-500">Одобрение за 30 минут, без первого взноса.</p>
        </div>

        <div className="border-t border-dashed border-[#333] pt-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#0f0f0f] border border-[#262626]">
                <Calendar className="h-5 w-5 text-gray-500" />
              </div>
              <div>
                <p className="text-sm font-medium text-white">Срок кредита</p>
                <p className="text-xs text-gray-500">60 месяцев · Платёж 114 833 ₽/мес</p>
              </div>
            </div>
            <button className="text-sm text-violet-400 hover:text-violet-300">Изменить</button>
          </div>
        </div>

        <Button 
          onClick={() => setModalOpen(true)}
          className="w-full bg-violet-600 text-white hover:bg-violet-700"
        >
          Оформить кредит
        </Button>
      </div>
    </div>

    <ApplicationModal 
      open={modalOpen} 
      onOpenChange={setModalOpen}
      carName="BMW X5 2022"
      carPrice={6890000}
    />
    </>
  )
}