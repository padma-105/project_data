// Fetch car ID from URL
const urlParams = new URLSearchParams(window.location.search);
const carId = urlParams.get('id');

// Fetch car data
async function fetchCarDetails() {
  try {
    const res = await fetch("https://raw.githubusercontent.com/padma-105/project_data/main/db.json");
    const data = await res.json();

    let cars;
    if (Array.isArray(data)) {
      cars = data;
    } else if (data.cars && Array.isArray(data.cars)) {
      cars = data.cars;
    } else {
      throw new Error("Unexpected data format");
    }

    const car = cars.find((c) => String(c.id) === carId);

    if (car) {
      renderCarDetails(car);
      addEventListeners(car);
    } else {
      document.getElementById("car-description").innerHTML = "<p>Car not found.</p>";
    }
  } catch (error) {
    console.error("Error fetching car data:", error);
    document.getElementById("car-description").innerHTML =
      "<p>Error fetching car details. Please try again later.</p>";
  }
}

// Render car details on the page
function renderCarDetails(car) {
  const container = document.getElementById("car-description");
  container.innerHTML = `
    <div class="car-details">
      <img src="${car.carimage}" alt="${car.name}" />
      <h1>${car.name}</h1>
      <p><strong>Fuel:</strong> ${car.fuel}</p>
      <p><strong>Transmission:</strong> ${car.transmission}</p>
      <p><strong>Seats:</strong> ${car["seater type"]}</p>
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
    const startDate = new Date(startDateInput.value);
    const endDate = new Date(endDateInput.value);

    if (startDate && endDate && endDate >= startDate) {
      const days = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
      const totalPrice = days * parseInt(car.price, 10);
      totalPriceElement.textContent = `₹${totalPrice}`;
      bookNowButton.disabled = false;
    } else {
      totalPriceElement.textContent = "₹0";
      bookNowButton.disabled = true;
    }
  }

  startDateInput.addEventListener("change", calculatePrice);
  endDateInput.addEventListener("change", calculatePrice);

  bookNowButton.addEventListener("click", function () {
    alert(`Car booked successfully from ${startDateInput.value} to ${endDateInput.value}!`);
  });

  bookNowButton.disabled = true; // Disable button initially
}

// Initialize the page
fetchCarDetails();
