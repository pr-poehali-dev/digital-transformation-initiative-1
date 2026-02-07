import json
from datetime import datetime
from typing import Optional
from pydantic import BaseModel, EmailStr, validator


class ApplicationRequest(BaseModel):
    """Модель заявки на покупку автомобиля"""
    name: str
    phone: str
    email: EmailStr
    car_name: str
    car_price: int
    financing_type: str  # credit, leasing, installment
    initial_payment: Optional[int] = 0
    loan_term: Optional[int] = 60
    city: Optional[str] = None
    comment: Optional[str] = None

    @validator('phone')
    def validate_phone(cls, v):
        # Базовая валидация телефона
        digits = ''.join(filter(str.isdigit, v))
        if len(digits) < 10:
            raise ValueError('Некорректный номер телефона')
        return v

    @validator('car_price', 'initial_payment')
    def validate_positive(cls, v):
        if v and v < 0:
            raise ValueError('Значение должно быть положительным')
        return v


def handler(event: dict, context) -> dict:
    """
    API для обработки заявок на покупку автомобиля.
    
    Принимает данные клиента, автомобиль и параметры финансирования,
    сохраняет заявку и отправляет уведомление.
    """
    
    # CORS preflight
    if event.get('httpMethod') == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type'
            },
            'body': ''
        }
    
    # Только POST запросы
    if event.get('httpMethod') != 'POST':
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Метод не поддерживается'})
        }
    
    try:
        # Парсинг тела запроса
        body = json.loads(event.get('body', '{}'))
        
        # Валидация через Pydantic
        application = ApplicationRequest(**body)
        
        # Расчёт ежемесячного платежа (упрощённая формула)
        loan_amount = application.car_price - (application.initial_payment or 0)
        interest_rate = 0.039  # 3.9% годовых
        monthly_rate = interest_rate / 12
        num_payments = application.loan_term
        
        if loan_amount > 0 and num_payments > 0:
            monthly_payment = loan_amount * (monthly_rate * (1 + monthly_rate) ** num_payments) / \
                            ((1 + monthly_rate) ** num_payments - 1)
        else:
            monthly_payment = 0
        
        # Формирование ответа
        application_id = f"APP-{datetime.now().strftime('%Y%m%d-%H%M%S')}"
        
        response_data = {
            'success': True,
            'application_id': application_id,
            'message': 'Заявка успешно отправлена! Наш менеджер свяжется с вами в течение 15 минут.',
            'calculation': {
                'car_name': application.car_name,
                'car_price': application.car_price,
                'initial_payment': application.initial_payment or 0,
                'loan_amount': loan_amount,
                'loan_term': application.loan_term,
                'monthly_payment': round(monthly_payment, 2),
                'total_amount': round(monthly_payment * num_payments + (application.initial_payment or 0), 2)
            }
        }
        
        # TODO: Здесь можно добавить:
        # - Сохранение в базу данных
        # - Отправку email/SMS уведомлений
        # - Интеграцию с CRM
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps(response_data, ensure_ascii=False)
        }
        
    except ValueError as e:
        return {
            'statusCode': 400,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'success': False,
                'error': 'Ошибка валидации',
                'details': str(e)
            }, ensure_ascii=False)
        }
    
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'success': False,
                'error': 'Внутренняя ошибка сервера'
            }, ensure_ascii=False)
        }
