import { addHTML } from "./htmlCreation.mjs";
import { addToLocalStorage, removeFromLocalStorage } from "./functions.mjs";
import { tShirtData } from "../data/data.mjs";

const content = document.querySelector("#content");
const counterObj = document.getElementsByClassName('counter');
const priceObj = document.getElementsByClassName('price');
const cardObj = document.getElementsByClassName('card');
const totalAmount = document.querySelector('.total-amount');
const addRemoveBtns = document.querySelectorAll(".add-remove-btns");
const addToCartBtn = document.querySelectorAll('.add-cart-btn');
let currentUser = JSON.parse(localStorage.getItem("currentUser") || "[]");

if (!currentUser.length) {
    alert("User does not exists.!");
    location.href = "./pages/login.html";
}

let productsInCart = JSON.parse(localStorage.getItem("products") || "{}");
let quantityInCart = JSON.parse(localStorage.getItem("quantity") || "{}");
let currentUserEmail = currentUser[0].userEmail;
let currentUserProducts = productsInCart[currentUserEmail] ? productsInCart[currentUserEmail] : [];
let currentUserQuantity = quantityInCart[currentUserEmail] ? quantityInCart[currentUserEmail] : [];

if (currentUserProducts.length !== 0) addHTML(currentUserEmail, currentUserProducts, content, "cart");

let totalAmountToPay = 0;
for (let i = 0; i < currentUserQuantity.length; i++) totalAmountToPay += (Object.values(currentUserQuantity[i])[0] * currentUserProducts[i].price);
totalAmount.innerText = totalAmountToPay;

content.addEventListener("click", (e) => {
    for (let i = 0; i < addRemoveBtns.length; i++) {
        addRemoveBtns[i].style.display = "block";
        addToCartBtn[i].style.display = "none";
    }
    if (e.target.className === "remove-btn") {
        const removeButtonId = e.target.dataset.removebuttonid;
        const index = currentUserQuantity.findIndex(ele => Object.keys(ele)[0] === removeButtonId);
        removeFromLocalStorage(currentUserEmail, "cart", removeButtonId, tShirtData, counterObj[index], addToCartBtn[index], addRemoveBtns[index], null, priceObj[index], cardObj[index], totalAmount);
    }
    if (e.target.className === "add-btn") {
        const addButtonId = e.target.dataset.addbuttonid;
        const index = currentUserQuantity.findIndex(ele => Object.keys(ele)[0] === addButtonId);
        addToLocalStorage(currentUserEmail, "cart", addButtonId, productsInCart[currentUserEmail], counterObj[index], null, priceObj[index], totalAmount);
    }
});
