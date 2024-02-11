import { addHTML } from "./htmlCreation.mjs";
import { addToLocalStorage, removeFromLocalStorage } from "./functions.mjs";
import { tShirtData } from "../data/data.mjs";

const content = document.querySelector("#content");
const counterObj = document.getElementsByClassName('counter');
const priceObj = document.getElementsByClassName('price');
const cardObj = document.getElementsByClassName('card');
const totalAmount = document.querySelector('.total-amount');
let productsInCart = JSON.parse(localStorage.getItem("products") || "[]");
let quantityInCart = JSON.parse(localStorage.getItem("quantity") || "[]");
if (productsInCart.length !== 0) addHTML(productsInCart, content, "cart");

let total = 0;
for (let i = 0; i < quantityInCart.length; i++) total += (Object.values(quantityInCart[i])[0] * productsInCart[i].price);
totalAmount.innerText = total;

content.addEventListener("click", (e) => {
    // let quantityInCart = JSON.parse(localStorage.getItem("quantity") || "[]");
    const addRemoveBtns = document.querySelectorAll(".add-remove-btns");
    const addToCartBtn = document.querySelectorAll('.add-cart-btn');
    for (let i = 0; i < addRemoveBtns.length; i++) {
        addRemoveBtns[i].style.display = "block";
        addToCartBtn[i].style.display = "none";
    }
    if (e.target.className === "remove-btn") {
        const removeButtonId = e.target.dataset.removebuttonid;
        const index = quantityInCart.findIndex(ele => Object.keys(ele)[0] === removeButtonId);
        removeFromLocalStorage("cart", removeButtonId, tShirtData, counterObj[index], addToCartBtn[index], addRemoveBtns[index], priceObj[index], cardObj[index], totalAmount);
    }
    if (e.target.className === "add-btn") {
        const addButtonId = e.target.dataset.addbuttonid;
        const index = quantityInCart.findIndex(ele => Object.keys(ele)[0] === addButtonId);
        addToLocalStorage("cart", addButtonId, productsInCart, counterObj[index], priceObj[index], totalAmount);
    }
});
