 JS
// ========================================
// PART 1: PARENT VEHICLE CLASS
// ========================================
class Vehicle {
  constructor(customerName, model, registration, rentalDays, dailyRate) {
    this.customerName = customerName;
    this.model = model;
    this.registration = registration;
    this.rentalDays = rentalDays;
    this.dailyRate = dailyRate;
  }
 
  calculateTotal() {
    return this.rentalDays * this.dailyRate;
  }
 
  getDetails() {
    return {
      customerName: this.customerName,
      model: this.model,
      registration: this.registration,
      rentalDays: this.rentalDays,
      dailyRate: this.dailyRate,
      total: this.calculateTotal()
    };
  }
}
 
// ========================================
// PART 2: CAR CLASS
// ========================================
class Car extends Vehicle {
  constructor(customerName, model, registration, rentalDays) {
    super(customerName, model, registration, rentalDays, 6000);
    this.type = "Car";
    this.icon = "🚗";
  }
}
 
// ========================================
// PART 3: SUV CLASS
// ========================================
class SUV extends Vehicle {
  constructor(customerName, model, registration, rentalDays) {
    super(customerName, model, registration, rentalDays, 9000);
    this.type = "SUV";
    this.icon = "🚙";
  }
}
 
// ========================================
// PART 4: VAN CLASS
// ========================================
class Van extends Vehicle {
  constructor(customerName, model, registration, rentalDays) {
    super(customerName, model, registration, rentalDays, 12000);
    this.type = "Van";
    this.icon = "🚐";
  }
}
 
// ========================================
// PART 5: VEHICLE FACTORY
// ========================================
class VehicleFactory {
  static createVehicle(type, customerName, model, registration, rentalDays) {
    switch (type) {
      case "car":
        return new Car(customerName, model, registration, rentalDays);
      case "suv":
        return new SUV(customerName, model, registration, rentalDays);
      case "van":
        return new Van(customerName, model, registration, rentalDays);
      default:
        throw new Error("Invalid vehicle type.");
    }
  }
}
 
// ========================================
// PART 6: RENTAL STORAGE
// ========================================
const rentals = [];
 
// ========================================
// PART 7: FORM EVENT
// ========================================
const rentalForm = document.getElementById("rentalForm");
 
rentalForm.addEventListener("submit", function (event) {
  event.preventDefault();
 
  const customerName = document.getElementById("customerName").value;
  const vehicleType = document.getElementById("vehicleType").value;
  const rentalDays = Number(document.getElementById("rentalDays").value);
  const vehicleModel = document.getElementById("vehicleModel").value;
  const registration = document.getElementById("registration").value;
 
  const vehicle = VehicleFactory.createVehicle(
    vehicleType,
    customerName,
    vehicleModel,
    registration,
    rentalDays
  );
 
  rentals.push(vehicle);
  displayRental(vehicle);
  updateDashboard();
  rentalForm.reset();
});
 
// ========================================
// PART 8: DISPLAY RENTAL
// ========================================
function displayRental(vehicle) {
  const records = document.getElementById("rentalRecords");
  const emptyMessage = document.getElementById("emptyMessage");
 
  if (emptyMessage) {
    emptyMessage.remove();
  }
 
  const card = document.createElement("div");
  card.classList.add("rental-card");
 
  card.innerHTML = `
    <div class="rental-card-header">
      <h3>${vehicle.icon} ${vehicle.model}</h3>
      <span class="vehicle-badge">${vehicle.type}</span>
    </div>
    <p><strong>Customer:</strong> ${vehicle.customerName}</p>
    <p><strong>Registration:</strong> ${vehicle.registration}</p>
    <p><strong>Rental Period:</strong> ${vehicle.rentalDays} day(s)</p>
    <p><strong>Daily Rate:</strong> ${vehicle.dailyRate.toLocaleString()} VUV</p>
    <div class="total-price">
      Total: ${vehicle.calculateTotal().toLocaleString()} VUV
    </div>
  `;
 
  records.appendChild(card);
}
 
// ========================================
// PART 9: DASHBOARD
// ========================================
function updateDashboard() {
  const totalCars = rentals.filter(vehicle => vehicle.type === "Car").length;
  const totalSUVs = rentals.filter(vehicle => vehicle.type === "SUV").length;
  const totalVans = rentals.filter(vehicle => vehicle.type === "Van").length;
 
  document.getElementById("totalRentals").textContent = rentals.length;
  document.getElementById("totalCars").textContent = totalCars;
  document.getElementById("totalSUVs").textContent = totalSUVs;
  document.getElementById("totalVans").textContent = totalVans;
}
 