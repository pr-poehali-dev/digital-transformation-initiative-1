import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"

interface ApplicationModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  carName?: string
  carPrice?: number
}

export function ApplicationModal({ open, onOpenChange, carName = "", carPrice = 0 }: ApplicationModalProps) {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    car_name: carName,
    car_price: carPrice,
    financing_type: "credit",
    initial_payment: 0,
    loan_term: 60,
    city: "",
    comment: ""
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // TODO: Заменить на реальный URL после деплоя
      const response = await fetch('https://your-function-url.ru/submit-application', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (data.success) {
        toast.success(data.message, {
          description: `Номер заявки: ${data.application_id}`,
          duration: 5000
        })
        
        // Показываем расчёт
        if (data.calculation) {
          setTimeout(() => {
            toast.info(`Ежемесячный платёж: ${data.calculation.monthly_payment.toLocaleString('ru-RU')} ₽`, {
              description: `Срок: ${data.calculation.loan_term} мес. · Итого: ${data.calculation.total_amount.toLocaleString('ru-RU')} ₽`,
              duration: 10000
            })
          }, 1000)
        }
        
        onOpenChange(false)
        
        // Сброс формы
        setFormData({
          name: "",
          phone: "",
          email: "",
          car_name: carName,
          car_price: carPrice,
          financing_type: "credit",
          initial_payment: 0,
          loan_term: 60,
          city: "",
          comment: ""
        })
      } else {
        toast.error("Ошибка при отправке заявки", {
          description: data.error || "Попробуйте позже"
        })
      }
    } catch (error) {
      console.error('Ошибка отправки:', error)
      toast.error("Не удалось отправить заявку", {
        description: "Проверьте подключение к интернету"
      })
    } finally {
      setLoading(false)
    }
  }

  const updateField = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto bg-[#0a0a0a] border-[#262626]">
        <DialogHeader>
          <DialogTitle className="text-2xl text-white">Оставить заявку</DialogTitle>
          <DialogDescription className="text-gray-400">
            Заполните форму, и наш менеджер свяжется с вами в течение 15 минут
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          {/* Контактная информация */}
          <div className="space-y-3">
            <div>
              <Label htmlFor="name" className="text-gray-300">Ваше имя *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => updateField('name', e.target.value)}
                placeholder="Иван Петров"
                required
                className="bg-[#141414] border-[#262626] text-white placeholder:text-gray-600"
              />
            </div>

            <div>
              <Label htmlFor="phone" className="text-gray-300">Телефон *</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => updateField('phone', e.target.value)}
                placeholder="+7 (999) 123-45-67"
                required
                className="bg-[#141414] border-[#262626] text-white placeholder:text-gray-600"
              />
            </div>

            <div>
              <Label htmlFor="email" className="text-gray-300">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => updateField('email', e.target.value)}
                placeholder="ivan@example.com"
                required
                className="bg-[#141414] border-[#262626] text-white placeholder:text-gray-600"
              />
            </div>
          </div>

          {/* Информация об автомобиле */}
          <div className="space-y-3 pt-2 border-t border-[#262626]">
            <div>
              <Label htmlFor="car_name" className="text-gray-300">Автомобиль *</Label>
              <Input
                id="car_name"
                value={formData.car_name}
                onChange={(e) => updateField('car_name', e.target.value)}
                placeholder="BMW X5 2022"
                required
                className="bg-[#141414] border-[#262626] text-white placeholder:text-gray-600"
              />
            </div>

            <div>
              <Label htmlFor="car_price" className="text-gray-300">Цена автомобиля (₽) *</Label>
              <Input
                id="car_price"
                type="number"
                value={formData.car_price}
                onChange={(e) => updateField('car_price', parseInt(e.target.value) || 0)}
                placeholder="3000000"
                required
                min="0"
                className="bg-[#141414] border-[#262626] text-white placeholder:text-gray-600"
              />
            </div>
          </div>

          {/* Параметры финансирования */}
          <div className="space-y-3 pt-2 border-t border-[#262626]">
            <div>
              <Label htmlFor="financing_type" className="text-gray-300">Тип финансирования</Label>
              <Select value={formData.financing_type} onValueChange={(v) => updateField('financing_type', v)}>
                <SelectTrigger className="bg-[#141414] border-[#262626] text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[#141414] border-[#262626]">
                  <SelectItem value="credit" className="text-white">Автокредит 3.9%</SelectItem>
                  <SelectItem value="leasing" className="text-white">Лизинг</SelectItem>
                  <SelectItem value="installment" className="text-white">Рассрочка</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="initial_payment" className="text-gray-300">Первый взнос (₽)</Label>
                <Input
                  id="initial_payment"
                  type="number"
                  value={formData.initial_payment}
                  onChange={(e) => updateField('initial_payment', parseInt(e.target.value) || 0)}
                  placeholder="0"
                  min="0"
                  className="bg-[#141414] border-[#262626] text-white placeholder:text-gray-600"
                />
              </div>

              <div>
                <Label htmlFor="loan_term" className="text-gray-300">Срок (мес.)</Label>
                <Select value={formData.loan_term.toString()} onValueChange={(v) => updateField('loan_term', parseInt(v))}>
                  <SelectTrigger className="bg-[#141414] border-[#262626] text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[#141414] border-[#262626]">
                    <SelectItem value="12" className="text-white">12 месяцев</SelectItem>
                    <SelectItem value="24" className="text-white">24 месяца</SelectItem>
                    <SelectItem value="36" className="text-white">36 месяцев</SelectItem>
                    <SelectItem value="48" className="text-white">48 месяцев</SelectItem>
                    <SelectItem value="60" className="text-white">60 месяцев</SelectItem>
                    <SelectItem value="84" className="text-white">84 месяца</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="city" className="text-gray-300">Город доставки</Label>
              <Input
                id="city"
                value={formData.city}
                onChange={(e) => updateField('city', e.target.value)}
                placeholder="Москва, Санкт-Петербург..."
                className="bg-[#141414] border-[#262626] text-white placeholder:text-gray-600"
              />
            </div>

            <div>
              <Label htmlFor="comment" className="text-gray-300">Комментарий</Label>
              <Textarea
                id="comment"
                value={formData.comment}
                onChange={(e) => updateField('comment', e.target.value)}
                placeholder="Укажите пожелания..."
                rows={3}
                className="bg-[#141414] border-[#262626] text-white placeholder:text-gray-600 resize-none"
              />
            </div>
          </div>

          {/* Кнопки */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={loading}
              className="flex-1 border-[#262626] text-gray-300 hover:bg-[#1a1a1a] hover:text-white"
            >
              Отмена
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="flex-1 bg-violet-600 hover:bg-violet-700 text-white"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Отправка...
                </>
              ) : (
                "Отправить заявку"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}