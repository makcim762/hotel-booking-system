package com.hotel.booking.service;

import com.hotel.booking.model.Payment;
import com.hotel.booking.repository.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PaymentService {

    @Autowired
    private PaymentRepository paymentRepository;

    public Payment processPayment(Payment payment) {
        // Симуляція обробки оплати
        payment.setStatus(true); // Оплата пройшла успішно (симуляція)
        return paymentRepository.save(payment); // Зберігаємо результат оплати
    }

    public Payment getPaymentById(Long id) {
        return paymentRepository.findById(id).orElse(null);
    }
}
