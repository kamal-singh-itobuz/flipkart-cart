import { tShirtData } from "../data/data.mjs";
import { addHTML } from "./html-creation.mjs";

const content = document.querySelector(".content");
const countInCart = document.querySelector(".count-in-cart");
const cartIcon = document.querySelector(".cart-image");
const loginBtn = document.querySelector('.login-button');
const userNameText = document.querySelector('.user-name');
const logoutBtn = document.querySelector('.logout-button');
const searchBar = document.querySelector('.search');
const currentUser = JSON.parse(localStorage.getItem("currentUser") || "[]");
const currentUserEmail = currentUser.length === 1 ? currentUser[0].userEmail : "";
const quantityInCart = JSON.parse(localStorage.getItem('quantity', '{}'));

let searchedProductsArray = [];

addHTML(currentUserEmail, tShirtData, content, ["home", countInCart]); 
if(currentUserEmail in quantityInCart) countInCart.innerText = quantityInCart[currentUserEmail].length;

if (currentUser.length) {
    loginBtn.style.display = "none";
    logoutBtn.style.display = "block";
    const username = currentUser[0].userName.substring(0, currentUser[0].userName.indexOf(' '));
    userNameText.innerText = `Hey_${username}!`;
    cartIcon.addEventListener('click', () => {
        location.href = "./pages/cart.html";
    });
}
else {
    cartIcon.addEventListener('click', () => {
        alert("First Login yourself.!");
        location.href = "./pages/login.html";
    })
}

logoutBtn.addEventListener('click', () => {
    location.href = "./pages/login.html";
    currentUser.pop();
    localStorage.setItem("currentUser", "[]");
});

searchBar.addEventListener('input', () => {
    const val = searchBar.value.toLowerCase();
    content.innerHTML = "";
    searchedProductsArray = []
    tShirtData.filter(item => {
        if (item.name.toLowerCase().includes(val)) searchedProductsArray.push(item);
    });
    if (searchedProductsArray.length) addHTML(currentUserEmail, searchedProductsArray, content, "home");
});
