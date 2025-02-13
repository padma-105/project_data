let allCars = [];

// Fetch car data from API
async function fetchData() {
  try {
    const res = await fetch("http://localhost:3000/cars");
    const data = await res.json();
    allCars = data;
    renderCars(allCars);
  } catch (error) {
    console.error("Error fetching car data:", error);
  }
}

// Render car data based on filters
function renderCars(data) {
  const main = document.getElementById("car-data");
  main.innerHTML = "";

  data.forEach((car) => {
    const card = document.createElement("div");
    card.className = "car-card";

    card.innerHTML = `
      <h2>${car.name}</h2>
      <img src="${car.carimage}" alt="${car.name}">
      <p><strong>Fuel:</strong> ${car.fuel}</p>
      <p><strong>Transmission:</strong> ${car.transmission}</p>
      <p><strong>Seats:</strong> ${car["seater type"]}</p>
      <p class="price">₹${car.price}/day</p>
      ${
        car.available === "true"
          ? `<a href="./index2.html?id=${car.id}" class="book-now-button">Book Now</a>`
          : '<p class="sold-out">Sold Out</p>'
      }
    `;
  
    main.appendChild(card);
  });
}

// Filter cars based on selected conditions
function filterCars() {
  const fuel = document.getElementById("filter-fuel").value;
  const transmission = document.getElementById("filter-transmission").value;
  const seater = document.getElementById("filter-seater").value;

  const filteredCars = allCars.filter((car) => {
    return (
      (fuel === "" || car.fuel === fuel) &&
      (transmission === "" || car.transmission === transmission) &&
      (seater === "" || car["seater type"] === seater)
    );
  });

  renderCars(filteredCars);
}

// Event Listener for Filter Button
document.getElementById("apply-filters").addEventListener("click", filterCars);

// Initialize Page
fetchData();
