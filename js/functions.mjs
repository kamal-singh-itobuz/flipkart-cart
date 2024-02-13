export function addToLocalStorage(currentUserEmail, isCart, cardId, data, countObj, countInCart, priceObj, totalAmount) {
    let productsInCart = JSON.parse(localStorage.getItem("products") || "{}");
    let quantityInCart = JSON.parse(localStorage.getItem("quantity") || "{}");
    let currentUserProducts = [];
    let currentUserQuantity = [];
    if (currentUserEmail in productsInCart) {
        currentUserProducts = productsInCart[currentUserEmail];
        currentUserQuantity = quantityInCart[currentUserEmail];
    }
    const indexAtAdd = currentUserProducts.findIndex((element) => element.index === Number(cardId));
    const productIndexToAdd = data.findIndex((element) => element.index === Number(cardId));
    if (indexAtAdd === -1) {
        currentUserProducts.push(data[productIndexToAdd]);
        let obj = {};
        obj[cardId] = 1;
        currentUserQuantity.push(obj);
        if (countInCart) countInCart.innerText = currentUserQuantity.length;
    } else {
        currentUserQuantity[indexAtAdd][cardId]++;
        countObj.innerText = currentUserQuantity[indexAtAdd][cardId];
        if (isCart === "cart") {
            let amount = data[productIndexToAdd].price * currentUserQuantity[indexAtAdd][cardId];
            priceObj.innerText = "Rs. " + amount;
            totalAmount.innerText = Number(totalAmount.innerText) + data[productIndexToAdd].price;
        }
    }
    productsInCart[currentUserEmail] = currentUserProducts;
    quantityInCart[currentUserEmail] = currentUserQuantity;
    localStorage.setItem("products", JSON.stringify(productsInCart));
    localStorage.setItem("quantity", JSON.stringify(quantityInCart));
}

export function removeFromLocalStorage(currentUserEmail, isCart, cardId, data, countObj, addToCartBtn, addRemoveBtn, countInCart, priceObj, cardObj, totalAmount) {
    let productsInCart = JSON.parse(localStorage.getItem("products") || "{}");
    let quantityInCart = JSON.parse(localStorage.getItem("quantity") || "{}");
    let currentUserProducts = [];
    let currentUserQuantity = [];
    if (currentUserEmail in productsInCart) {
        currentUserProducts = productsInCart[currentUserEmail];
        currentUserQuantity = quantityInCart[currentUserEmail];
    }
    const indexAtRemove = currentUserProducts.findIndex((element) => element.index === Number(cardId));
    const productIndexToRemove = data.findIndex((element) => element.index === Number(cardId));
    currentUserQuantity[indexAtRemove][cardId]--;
    if (!currentUserQuantity[indexAtRemove][cardId]) {
        currentUserProducts.splice(indexAtRemove, 1);
        currentUserQuantity.splice(indexAtRemove, 1);
        if (isCart === "cart") cardObj.style.display = "none";
        if (isCart === "home") {
            addToCartBtn.style.display = "block";
            addRemoveBtn.style.display = "none";
        }
        if (countInCart) countInCart.innerText = currentUserQuantity.length;
    }
    if (indexAtRemove < currentUserQuantity.length) countObj.innerText = currentUserQuantity[indexAtRemove][cardId];
    if (isCart === "cart" && indexAtRemove < currentUserQuantity.length) {
        let amount = data[productIndexToRemove].price * currentUserQuantity[indexAtRemove][cardId];
        priceObj.innerText = "Rs. " + amount;
        totalAmount.innerText = Number(totalAmount.innerText) - data[productIndexToRemove].price;
    }
    productsInCart[currentUserEmail] = currentUserProducts;
    quantityInCart[currentUserEmail] = currentUserQuantity;
    localStorage.setItem("products", JSON.stringify(productsInCart));
    localStorage.setItem("quantity", JSON.stringify(quantityInCart));
}