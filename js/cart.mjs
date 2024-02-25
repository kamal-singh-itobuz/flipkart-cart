import { tShirtData } from "../data/data.mjs";
import { addHTML } from "./html-creation.mjs";

const cartContent = document.querySelector(".cart-content");
const totalAmount = document.querySelector('.total-amount');
const currentUser = JSON.parse(localStorage.getItem("currentUser") || "[]");

if (!currentUser.length) {
    alert("User does not exists.!");
    location.href = "./pages/login.html";
}

const quantityInCart = JSON.parse(localStorage.getItem("quantity") || "{}");
const currentUserEmail = currentUser[0].userEmail;
const currentUserQuantity = quantityInCart[currentUserEmail];
let productsInCart = [];
currentUserQuantity.forEach(ele => {
    tShirtData.forEach(product => {
        if(Number(ele.id) === product.index){
            productsInCart.push(product);
        }
    });
});

addHTML(currentUserEmail, productsInCart, cartContent, ["cart"]);

let totalAmountToPay = 0;
for (let i = 0; i < currentUserQuantity.length; i++) 
    totalAmountToPay += (currentUserQuantity[i].quantity * productsInCart[i].price);
totalAmount.innerText = totalAmountToPay;
