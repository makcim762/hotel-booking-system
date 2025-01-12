package com.hotel.booking.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "booking_id")
    private Booking booking;  // Оплата прив'язана до конкретного бронювання

    private Double amount;    // Сума оплати
    private Boolean status;   // Статус оплати: true – оплачено, false – не оплачено
}
