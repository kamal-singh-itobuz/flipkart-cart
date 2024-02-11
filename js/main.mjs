import { tShirtData } from "../data/data.mjs";
import { addHTML } from "./htmlCreation.mjs";
import { addToLocalStorage, removeFromLocalStorage } from "./functions.mjs";
const content = document.querySelector("#content");
const countInCart = document.querySelector(".count-in-cart");
const counterObj = document.getElementsByClassName("counter");
const addToCartBtn = document.getElementsByClassName('add-cart-btn');
let quantityInCart = JSON.parse(localStorage.getItem("quantity") || "[]");
addHTML(tShirtData, content, "home");

countInCart.innerText = quantityInCart.length;
content.addEventListener("click", (e) => {
    let quantityInCart = JSON.parse(localStorage.getItem("quantity") || "[]");
    if (e.target.className === "add-cart-btn") {
        const addCartButtonId = e.target.dataset.addcartbuttonid;
        addToLocalStorage("home", addCartButtonId, tShirtData, counterObj[Number(addCartButtonId)]);
        e.target.style.display = "none";
        const addRemoveBtns = document.querySelectorAll(".add-remove-btns"); //why array is empty when keeping it on top
        addRemoveBtns[Number(addCartButtonId)].style.display = "block";
        countInCart.innerText = quantityInCart.length;
    }
    if (e.target.className === "remove-btn") {
        const removeButtonId = e.target.dataset.removebuttonid;
        const addRemoveBtns = document.querySelectorAll(".add-remove-btns"); //why array is empty when keeping it on top
        removeFromLocalStorage("home", removeButtonId, tShirtData, counterObj[Number(removeButtonId)], addToCartBtn[Number(removeButtonId)], addRemoveBtns[Number(removeButtonId)]);
        countInCart.innerText = quantityInCart.length;
    }
    if (e.target.className === "add-btn") {
        const addButtonId = e.target.dataset.addbuttonid;
        addToLocalStorage("home", addButtonId, tShirtData, counterObj[Number(addButtonId)]);
        countInCart.innerText = quantityInCart.length;
    }
});
