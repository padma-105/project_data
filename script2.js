// Fetch car ID from URL
const urlParams = new URLSearchParams(window.location.search);
const carId = urlParams.get('id');

// Fetch car data
async function fetchCarDetails() {
  try {
    const res = await fetch("http://localhost:3000/cars");
    const cars = await res.json();
    const car = cars.find(c => c.id === carId);

    if (car) {
      renderCarDetails(car);
      addEventListeners(car);
    } else {
      document.getElementById("car-description").innerHTML = "<p>Car not found.</p>";
    }
  } catch (error) {
    console.error("Error fetching car data:", error);
  }
}

// Render car details
function renderCarDetails(car) {
  const container = document.getElementById("car-description");
  container.innerHTML = `
    <div class="car-details">
      <img src="${car.carimage}" alt="${car.name}">
      <h1>${car.name}</h1>
      <p><strong>Fuel:</strong> ${car.fuel}</p>
      <p><strong>Transmission:</strong> ${car.transmission}</p>
      <p><strong>Seats:</strong> ${car.seater_type}</p>
      <p><strong>Price per day:</strong> ₹${car.price}</p>
    </div>
  `;
}

// Add event listeners for date inputs and calculate total price
function addEventListeners(car) {
  const startDateInput = document.getElementById("start-date");
  const endDateInput = document.getElementById("end-date");
  const totalPriceElement = document.getElementById("total-price");
  const bookNowButton = document.getElementById("book-now");

  function calculatePrice() {
    let startDate = new Date(startDateInput.value);
    const endDate = new Date(endDateInput.value);
        
    if (startDate && endDate && endDate >= startDate) {
      const days = (endDate - startDate) / (1000 * 60 * 60 * 24);
      const totalPrice = days * parseInt(car.price, 10);
      totalPriceElement.textContent = totalPrice;
      bookNowButton.disabled = false;
    } else {
      totalPriceElement.textContent = "0";
      bookNowButton.disabled = true;
    }
  }

  startDateInput.addEventListener("change", calculatePrice);
  endDateInput.addEventListener("change", calculatePrice);

  // Booking action with success message
  bookNowButton.addEventListener("click", function () {
    alert("Car booked successfully!"); 
  });
}

// Initialize the page
fetchCarDetails();
