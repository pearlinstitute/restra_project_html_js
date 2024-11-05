// Sample JSON Array for Menu
const menuData = [
    { id: 1, name: "Paneer Masala", category: "Main", price: "₹200" },
    { id: 2, name: "Chole Bhature", category: "Main", price: "₹150" },
    { id: 3, name: "Masala Dosa", category: "Main", price: "₹120" },
    { id: 4, name: "Samosa", category: "Starter", price: "₹30" },
    { id: 5, name: "Pani Puri", category: "Starter", price: "₹50" },
    { id: 6, name: "Gulab Jamun", category: "Dessert", price: "₹60" },
    { id: 7, name: "Rasgulla", category: "Dessert", price: "₹80" },
    { id: 8, name: "Mango Lassi", category: "Beverage", price: "₹70" }
];

let orderList = [];

// Load Menu Items Dynamically
const menuContainer = document.getElementById("menuItems");

menuData.forEach(item => {
    const menuItem = document.createElement("div");
    menuItem.classList.add("card", "mb-3", "p-2");

    menuItem.innerHTML = `
        <div class="card-body">
            <h5 class="card-title">${item.name}</h5>
            <p class="card-text"><strong>${item.price}</strong></p>
            <div class="text-end">
                <button class="btn btn-primary btn-sm" onclick="addToOrder(${item.id})">Add to Order</button>
            </div>
        </div>`;
        
    menuContainer.appendChild(menuItem);
});

// Add Item to Order with Quantity Check
function addToOrder(id) {
    const selectedItem = menuData.find(item => item.id === id);
    const orderItem = orderList.find(item => item.id === id);

    if (orderItem) {
        // If item already in order, increase quantity
        orderItem.quantity += 1;
    } else {
        // If item not in order, add it with quantity 1
        orderList.push({ ...selectedItem, quantity: 1 });
    }
    updateOrderSummary();
}

// Update Order Summary
function updateOrderSummary() {
    const orderListContainer = document.getElementById("orderList");
    orderListContainer.innerHTML = "";

    if (orderList.length === 0) {
        orderListContainer.innerHTML = "<p>Your order list is empty.</p>";
    } else {
        let total = 0;
        orderList.forEach((item, index) => {
            // Convert price from string with '₹' symbol to a number
            const itemPrice = parseFloat(item.price.replace('₹', ''));
            total += itemPrice * item.quantity;

            const orderItem = document.createElement("div");
            orderItem.classList.add("d-flex", "justify-content-between", "align-items-center", "border-bottom", "py-2");
            orderItem.innerHTML = `
                <span>${item.name} - ${item.price} x ${item.quantity}</span>
                <div>
                    <button class="btn btn-sm btn-secondary me-2" onclick="decreaseQuantity(${index})">-</button>
                    <button class="btn btn-sm btn-secondary" onclick="increaseQuantity(${index})">+</button>
                    <button class="btn btn-sm btn-danger ms-2" onclick="removeFromOrder(${index})">Remove</button>
                </div>
            `;
            orderListContainer.appendChild(orderItem);
        });

        const totalDiv = document.createElement("div");
        totalDiv.classList.add("d-flex", "justify-content-between", "mt-3");
        totalDiv.innerHTML = `<strong>Total:</strong> <span><strong>₹${total.toFixed(2)}</strong></span>`;
        orderListContainer.appendChild(totalDiv);
    }
}

// Increase Quantity of an Item
function increaseQuantity(index) {
    orderList[index].quantity += 1;
    updateOrderSummary();
}

// Decrease Quantity of an Item
function decreaseQuantity(index) {
    if (orderList[index].quantity > 1) {
        orderList[index].quantity -= 1;
    } else {
        orderList.splice(index, 1); // Remove item if quantity is 1
    }
    updateOrderSummary();
}

// Remove Item from Order
function removeFromOrder(index) {
    orderList.splice(index, 1); // Completely remove the item
    updateOrderSummary(); // Refresh the order list
}

// Place Order
function placeOrder() {
    if (orderList.length === 0) {
        alert("Your order list is empty!");
    } else {
        alert("Thank you for your order!");
        orderList = []; // Clear the order list after placing the order
        updateOrderSummary(); // Refresh the order list
    }
}
