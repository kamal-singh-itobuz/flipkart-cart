import { tShirtData } from "../data/data.mjs";
import { addHTML } from "./htmlCreation.mjs";
import { addToLocalStorage, removeFromLocalStorage } from "./functions.mjs";

const content = document.querySelector("#content");
const countInCart = document.querySelector(".count-in-cart");
const counterObj = document.getElementsByClassName("counter");
const addToCartBtn = document.getElementsByClassName("add-cart-btn");
let currentUser = JSON.parse(localStorage.getItem("currentUser") || "[]");
let currentUserEmail = currentUser.length == 1 ? currentUser[0].userEmail : "";
let quantityInCart = JSON.parse(localStorage.getItem("quantity") || "{}");
let currentUserQuantity = currentUserEmail !== "" ? quantityInCart[currentUserEmail] : [];
addHTML(currentUserEmail, tShirtData, content, "home");

countInCart.innerText = currentUserQuantity?.length || 0;
content.addEventListener("click", (e) => {
  if (e.target.className === "add-cart-btn") {
    let currentUser = JSON.parse(localStorage.getItem("currentUser") || "[]");
    if(!currentUser.length) {
      alert("User does not exists.!");
      location.href="./pages/login.html";
      return;
    }
    currentUserEmail = currentUser[0].userEmail;
    const addCartButtonId = e.target.dataset.addcartbuttonid;
    addToLocalStorage(
      currentUserEmail,
      "home",
      addCartButtonId,
      tShirtData,
      counterObj[Number(addCartButtonId)],
      countInCart
    );
    e.target.style.display = "none";
    const addRemoveBtns = document.querySelectorAll(".add-remove-btns"); //why array is empty when keeping it on top
    addRemoveBtns[Number(addCartButtonId)].style.display = "block";
  }
  if (e.target.className === "remove-btn") {
    const removeButtonId = e.target.dataset.removebuttonid;
    const addRemoveBtns = document.querySelectorAll(".add-remove-btns"); //why array is empty when keeping it on top
    removeFromLocalStorage(
      currentUserEmail,
      "home",
      removeButtonId,
      tShirtData,
      counterObj[Number(removeButtonId)],
      addToCartBtn[Number(removeButtonId)],
      addRemoveBtns[Number(removeButtonId)],
      countInCart
    );
  }
  if (e.target.className === "add-btn") {
    const addButtonId = e.target.dataset.addbuttonid;
    addToLocalStorage(
      currentUserEmail,
      "home",
      addButtonId,
      tShirtData,
      counterObj[Number(addButtonId)],
      null
    );
  }
});
