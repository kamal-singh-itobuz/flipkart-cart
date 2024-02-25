import { addToLocalStorage, removeFromLocalStorage } from "./functions.mjs";

const currentUser = JSON.parse(localStorage.getItem("currentUser") || "[]");
let currentUserEmail = currentUser.length === 1 ? currentUser[0].userEmail : "";
function addToCartFunction(e, isCart) {
    if(isCart[0] === "home") {
        isCart[1].innerText = Number(isCart[1].innerText) + 1;
    }
    if (!currentUser.length) {
        alert("User does not exists.!");
        location.href = "./pages/login.html";
        return;
    }
    currentUserEmail = currentUser[0].userEmail;
    const buttonId = e.target.dataset.addcartbuttonid;
    const parent = e.target.parentNode;
    const addRemoveButtons = parent.querySelector('.add-remove-btns');
    const countOfProduct = parent.querySelector('.counter');
    countOfProduct.innerText = 1;
    const item = {
        id : buttonId,
        quantity : 1,
        couponPrice : 0
    };
    e.target.style.display = "none";
    addRemoveButtons.style.display = "block";
    addToLocalStorage(currentUserEmail, item, countOfProduct, isCart);
}

function removeFunction(e, isCart) {
    const buttonId = e.target.dataset.removebuttonid;
    const parent = (e.target.parentNode).parentNode;
    const addRemoveButtons = parent.querySelector('.add-remove-btns');
    const addToCartBtn = parent.querySelector('.add-cart-btn');
    const countOfProduct = parent.querySelector('.counter');
    const priceElement = parent.querySelector('.price');
    if(isCart[0] === 'cart') priceElement.innerText = "Rs. " + (isCart[1]*(Number(countOfProduct.innerText)-1));
    removeFromLocalStorage(currentUserEmail, buttonId, addRemoveButtons, addToCartBtn, countOfProduct, isCart);
}

function addFunction (e, isCart) {
    const quantityInCart = JSON.parse(localStorage.getItem("quantity") || "{}");
    const buttonId = e.target.dataset.addbuttonid;
    const parent = (e.target.parentNode).parentNode;
    const countOfProduct = parent.querySelector('.counter');
    const priceElement = parent.querySelector('.price');
    const item = {
        id : buttonId,
        quantity : 1,
        couponPrice : 0
    };
    if(isCart[0] === 'cart') priceElement.innerText = "Rs. " + (isCart[1]*(Number(countOfProduct.innerText)+1));
    addToLocalStorage(currentUserEmail, item, countOfProduct, isCart);
}

export function addHTML(currentUserEmail, data, container, isCart) {
    data.forEach((tShirt) => {
        const quantityInCart = JSON.parse(localStorage.getItem("quantity") || "{}");
        let currentUserQuantity = [];
        if(currentUserEmail in quantityInCart) currentUserQuantity = quantityInCart[currentUserEmail];
        const indexInQuantityArray = currentUserQuantity.findIndex((ele) => Number(ele.id) === tShirt.index);
        const quantityOfProduct = indexInQuantityArray === -1 ? 1 : currentUserQuantity[indexInQuantityArray].quantity;

        let cardDiv = document.createElement("div");
        cardDiv.setAttribute("class", "card");
        let imgTag = document.createElement("img");
        imgTag.setAttribute("src", tShirt.picture);
        imgTag.setAttribute("alt", "tshirt image");
        cardDiv.appendChild(imgTag);

        let descpDiv = document.createElement("div");
        descpDiv.setAttribute("class", "description");

        let tshirtTitle = document.createElement("p");
        tshirtTitle.innerText = tShirt.name;
        let tshirtPrice = document.createElement("p");
        tshirtPrice.setAttribute("class", "price");
        isCart[0] === 'cart' ? tshirtPrice.innerText = "Rs. " + tShirt.price * currentUserQuantity[indexInQuantityArray].quantity : tshirtPrice.innerText = "Rs. " + tShirt.price;
        let addToCartBtn = document.createElement("button");
        addToCartBtn.innerText = "Add to Cart";
        addToCartBtn.setAttribute("class", "add-cart-btn");
        addToCartBtn.setAttribute("data-addcartbuttonid", tShirt.index);
        if(isCart[0] === 'cart'){
            isCart.push(tShirt.price);
        }
        addToCartBtn.addEventListener("click", (e) => addToCartFunction(e, isCart));

        let addRemoveDiv = document.createElement("div");
        addRemoveDiv.setAttribute("class", "add-remove-btns");
        let removeBtn = document.createElement("button");
        removeBtn.setAttribute("class", "remove-btn");
        removeBtn.setAttribute("data-removebuttonid", tShirt.index);
        removeBtn.addEventListener("click", (e) => removeFunction(e, isCart));
        removeBtn.innerText = "-";
        let counter = document.createElement("span");
        counter.setAttribute("class", "counter");
        counter.innerText = quantityOfProduct;
        let addBtn = document.createElement("button");
        addBtn.setAttribute("class", "add-btn");
        addBtn.setAttribute("data-addbuttonid", tShirt.index);
        addBtn.addEventListener("click", (e) => addFunction(e, isCart));
        addBtn.innerText = "+";
        addRemoveDiv.append(removeBtn, counter, addBtn);
        if (indexInQuantityArray >= 0) {
            addToCartBtn.style.display = "none";
            addRemoveDiv.style.display = "block";
        }
        else {
            addToCartBtn.style.display = "block";
        }

        descpDiv.append(tshirtTitle, tshirtPrice, addToCartBtn, addRemoveDiv);
        cardDiv.appendChild(descpDiv);
        container.appendChild(cardDiv);
    });
}
