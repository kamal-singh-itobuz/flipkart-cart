import { tShirtData } from "../data/data.mjs";
import { addHTML } from "./html-creation.mjs";
import { addToLocalStorage, removeFromLocalStorage } from "./functions.mjs";

const content = document.querySelector(".content");
const countInCart = document.querySelector(".count-in-cart");
const cartIcon = document.querySelector(".cart-image");
const counterObj = document.getElementsByClassName("counter");
const addToCartBtn = document.getElementsByClassName("add-cart-btn");
const loginSignUpBtn = document.querySelector('.login-signup-btn');
const userNameText = document.querySelector('.user-name');
const logoutBtn = document.querySelector('.logout-btn');
const searchBar = document.querySelector('.search');
const categorySection = document.querySelector('.category');
let currentUser = JSON.parse(localStorage.getItem("currentUser") || "[]");
let currentUserEmail = currentUser.length === 1 ? currentUser[0].userEmail : "";
let quantityInCart = JSON.parse(localStorage.getItem("quantity") || "{}");
let currentUserQuantity = currentUserEmail !== "" ? quantityInCart[currentUserEmail] : [];
let searchedProductsArray = [];

addHTML(currentUserEmail, tShirtData, content, "home");

countInCart.innerText = currentUserQuantity?.length || 0;
if (currentUser.length) {
  loginSignUpBtn.style.display = "none";
  userNameText.style.display = "block";
  const username = currentUser[0].userName.substring(0, currentUser[0].userName.indexOf(' '));
  userNameText.innerText = `Hey ${username}!`;
  logoutBtn.style.display = "block";
  cartIcon.addEventListener('click', () => {
    location.href = "./pages/cart.html";
  })
}
else {
  cartIcon.addEventListener('click', () => {
    alert("First Login yourself.!");
    location.href = "./pages/logIn.html";
  })
}

logoutBtn.addEventListener('click', () => {
  location.href = "./pages/logIn.html";
  currentUser.pop();
  localStorage.setItem("currentUser", "[]");
});

searchBar.addEventListener('input', () => {
  const val = searchBar.value;
  content.innerHTML = "";
  searchedProductsArray = []
  tShirtData.filter(item => {
    if (item.name.toLowerCase().includes(val)) searchedProductsArray.push(item);
  });
  if (searchedProductsArray.length) {
    addHTML(currentUserEmail, searchedProductsArray, content, "home");
  }
});

content.addEventListener("click", (e) => {
  if (e.target.className === "add-cart-btn") {
    let currentUser = JSON.parse(localStorage.getItem("currentUser") || "[]");
    if (!currentUser.length) {
      alert("User does not exists.!");
      location.href = "./pages/logIn.html";
      return;
    }
    currentUserEmail = currentUser[0].userEmail;
    const addCartButtonId = e.target.dataset.addcartbuttonid;
    let index = searchedProductsArray.findIndex(ele => ele.index === Number(addCartButtonId));
    index = index === -1 ? addCartButtonId : index;
    addToLocalStorage(
      currentUserEmail,
      "home",
      addCartButtonId,
      tShirtData,
      counterObj[Number(index)],
      countInCart
    );
    e.target.style.display = "none";
    const addRemoveBtns = document.querySelectorAll(".add-remove-btns"); //why array is empty when keeping it on top
    addRemoveBtns[Number(index)].style.display = "block";
  }
  if (e.target.className === "remove-btn") {
    const removeButtonId = e.target.dataset.removebuttonid;
    const addRemoveBtns = document.querySelectorAll(".add-remove-btns"); //why array is empty when keeping it on top
    let index = searchedProductsArray.findIndex(ele => ele.index === Number(removeButtonId));
    index = index === -1 ? removeButtonId : index;
    removeFromLocalStorage(
      currentUserEmail,
      "home",
      removeButtonId,
      tShirtData,
      counterObj[Number(index)],
      addToCartBtn[Number(index)],
      addRemoveBtns[Number(index)],
      countInCart
    );
  }
  if (e.target.className === "add-btn") {
    const addButtonId = e.target.dataset.addbuttonid;
    let index = searchedProductsArray.findIndex(ele => ele.index === Number(addButtonId));
    index = index === -1 ? addButtonId : index;
    addToLocalStorage(
      currentUserEmail,
      "home",
      addButtonId,
      tShirtData,
      counterObj[Number(index)],
      null
    );
  }
});
