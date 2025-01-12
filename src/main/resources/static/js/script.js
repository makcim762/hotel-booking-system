document.getElementById('search-form').addEventListener('submit', function (event) {
    event.preventDefault();
    let location = document.getElementById('location').value;
    let checkInDate = document.getElementById('checkInDate').value;
    let checkOutDate = document.getElementById('checkOutDate').value;

    fetch(`/api/hotels?location=${location}&checkInDate=${checkInDate}&checkOutDate=${checkOutDate}`)
        .then(response => response.json())
        .then(data => {
            let hotelResults = document.getElementById('hotel-results');
            hotelResults.innerHTML = '';
            data.forEach(hotel => {
                let hotelDiv = document.createElement('div');
                hotelDiv.innerHTML = `<h2>${hotel.name}</h2><p>${hotel.location}</p>`;
                hotel.rooms.forEach(room => {
                    let roomDiv = document.createElement('div');
                    roomDiv.innerHTML = `
                        <p>Room Type: ${room.type}</p>
                        <p>Price: ${room.price}</p>
                        <button onclick="bookRoom(${room.id})">Book Now</button>
                    `;
                    hotelDiv.appendChild(roomDiv);
                });
                hotelResults.appendChild(hotelDiv);
            });
        });
});

function bookRoom(roomId) {
    let userId = 1; // Імітація користувача
    fetch('/api/bookings/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            room: {id: roomId},
            user: {id: userId},
            checkInDate: '2025-01-15',
            checkOutDate: '2025-01-20',
        }),
    })
        .then(response => response.json())
        .then(data => {
            alert('Booking successful! Booking ID: ' + data.id);
            processPayment(data.id, 200.0); // Викликаємо оплату після бронювання
        });
}

function processPayment(bookingId, amount) {
    fetch('/api/payments/process', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            booking: {id: bookingId},
            amount: amount
        }),
    })
        .then(response => response.json())
        .then(data => {
            if (data.status) {
                alert('Payment successful for Booking ID: ' + bookingId);
            } else {
                alert('Payment failed.');
            }
        });
}
