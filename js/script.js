// Copyright (c) 2020 Mr. Coxall All rights reserved
//
// Created by: Mr. Coxall
// Created on: Sep 2020
// This file contains the JS functions for index.html
const flavors = [
    { name: "Strawberry", price: 0.99 },
    { name: "Blueberry", price: 0.99 },
    { name: "Lemon", price: 0.99 },
    { name: "Nutella", price: 0.99 },
    { name: "Dark Chocolate", price: 0.99 },
    { name: "Peach", price: 0.99 },
    { name: "Sweet Potato", price: 0.99 },
    { name: "Cinnamon Roll", price: 0.99 },
    { name: "Banana", price: 0.99 },
    { name: "Pineapple", price: 0.99 },
    { name: "Pomegranate", price: 0.99 },
    { name: "Coconut", price: 0.99 }
  ];
 
  const toppings = [
    { name: "Strawberries", price: 1.50 },
    { name: "Blueberries", price: 1.50 },
    { name: "Peach", price: 1.50 },
    { name: "Banana", price: 1.50 },
    { name: "Nutella", price: 1.50 },
    { name: "Dark Chocolate", price: 1.50 },
    { name: "Milk Chocolate", price: 1.50 },
    { name: "White Chocolate", price: 1.50 },
    { name: "Whipped Cream", price: 1.50 },
    { name: "Cherries", price: 1.50 },
    { name: "Sprinkles", price: 1.50 },
    { name: "Almonds", price: 1.50 },
    { name: "Peanuts", price: 1.50 },
    { name: "Apples", price: 1.50 },
  ];
 
  // Dynamically populate options on page load
  function populateOptions() {
    const flavorsDiv = document.getElementById("flavors");
    flavors.forEach((flavor, i) => {
      const label = document.createElement("label");
      label.innerHTML = `<input type="radio" name="flavor" value="${i}"> ${flavor.name} - $${flavor.price.toFixed(2)}`;
      flavorsDiv.appendChild(label);
    });
 
 
    const toppingsDiv = document.getElementById("toppings");
    toppings.forEach((topping, i) => {
      const label = document.createElement("label");
      label.innerHTML = `<input type="checkbox" name="topping" value="${i}"> ${topping.name} - $${topping.price.toFixed(2)}`;
      toppingsDiv.appendChild(label);
    });
  }
 
  window.onload = populateOptions;
 
  function calculateTotal() {
    const totalsDiv = document.getElementById("totals");
    totalsDiv.innerHTML = ""; // Clear previous messages
 
    // Check size
    const sizeRadios = document.querySelectorAll('input[name="size"]:checked');
    if (sizeRadios.length === 0) {
      totalsDiv.innerHTML = `<div class="error"> Please select a size! </div>`;
      return;
    }
    const sizePrice = parseFloat(sizeRadios[0].value);
 
    // Check flavor
    const flavorRadios = document.querySelectorAll('input[name="flavor"]:checked');
    if (flavorRadios.length === 0) {
      totalsDiv.innerHTML = `<div class="error">❌ Please select flavor!</div>`;
      return;
    }
    const flavorIndex = parseInt(flavorRadios[0].value);
    const flavor = flavors[flavorIndex];
 

    // Toppings (multiple choice, limit 4)
    const toppingCheckboxes = document.querySelectorAll('input[name="topping"]:checked');
    if (toppingCheckboxes.length > 4) {
      totalsDiv.innerHTML = `<div class="error">❌ Please select no more than 4 toppings!</div>`;
      return;
    }
    const selectedToppings = Array.from(toppingCheckboxes).map(cb => toppings[parseInt(cb.value)]);
 
    // Calculate subtotal
    let subtotal = sizePrice + flavor.price
    selectedToppings.forEach(t => subtotal += t.price);
 
    // Calculate HST
    const hst = subtotal * 0.13;
 
    // Calculate total
    const total = subtotal + hst;
 
    // Build order summary
    let summary = `Your Cake Roll Order !!! ₊✩‧₊˚౨ৎ˚₊✩‧₊\n\n`;
    summary += `Size: $${sizePrice.toFixed(2)}\n`;
    summary += `Flavor: ${flavor.name} ($${flavor.price.toFixed(2)})\n`;
 
    if (selectedToppings.length > 0) {
      summary += `Toppings (${selectedToppings.length}):\n`;
      selectedToppings.forEach(t => {
        summary += `   - ${t.name} ($${t.price.toFixed(2)})\n`;
      });
    } else {
      summary += "Toppings: None\n";
    }
    summary += `\n Subtotal: $${subtotal.toFixed(2)}\n`;
    summary += `, HST (13%): $${hst.toFixed(2)}\n`;
    summary += `, Total Price: $${total.toFixed(2)}\n\n`;
    summary += `!!! Thank you for your order! Your Cake Roll will be ready soon !!!`;
 
    totalsDiv.textContent = summary;
  }