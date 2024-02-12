export function addToLocalStorage(isCart, cardId, data, countObj, countInCart, priceObj, totalAmount) {
    let productsInCart = JSON.parse(localStorage.getItem("products") || "[]");
    let quantityInCart = JSON.parse(localStorage.getItem("quantity") || "[]");
    const indexAtAdd = productsInCart.findIndex((element) => element.index === Number(cardId));
    const productIndexToAdd = data.findIndex((element) => element.index === Number(cardId));
    if (indexAtAdd === -1) {
        productsInCart.push(data[productIndexToAdd]);
        let obj = {};
        obj[cardId] = 1;
        quantityInCart.push(obj);
        if(countInCart) countInCart.innerText = quantityInCart.length;
    } else {
        quantityInCart[indexAtAdd][cardId]++;
        countObj.innerText = quantityInCart[indexAtAdd][cardId];
        if (isCart === "cart") {
            let amount = data[productIndexToAdd].price * quantityInCart[indexAtAdd][cardId];
            priceObj.innerText = "Rs. " + amount;
            totalAmount.innerText = Number(totalAmount.innerText) + data[productIndexToAdd].price;
        }
    }
    localStorage.setItem("products", JSON.stringify(productsInCart));
    localStorage.setItem("quantity", JSON.stringify(quantityInCart));
}

export function removeFromLocalStorage(isCart, cardId, data, countObj, addToCartBtn, addRemoveBtn, countInCart, priceObj, cardObj, totalAmount) {
    let productsInCart = JSON.parse(localStorage.getItem("products") || "[]");
    let quantityInCart = JSON.parse(localStorage.getItem("quantity") || "[]");
    const indexAtRemove = productsInCart.findIndex((element) => element.index === Number(cardId));
    const productIndexToRemove = data.findIndex((element) => element.index === Number(cardId));
    quantityInCart[indexAtRemove][cardId]--;
    if (!quantityInCart[indexAtRemove][cardId]) {
        productsInCart.splice(indexAtRemove, 1);
        quantityInCart.splice(indexAtRemove, 1);
        if (isCart === "cart") cardObj.style.display = "none"; 
        if (isCart === "home") {
            addToCartBtn.style.display = "block";
            addRemoveBtn.style.display = "none";
        }
        if(countInCart) countInCart.innerText = quantityInCart.length;
    }
    if (indexAtRemove < quantityInCart.length) countObj.innerText = quantityInCart[indexAtRemove][cardId];
    if (isCart === "cart" && indexAtRemove < quantityInCart.length) {
        let amount = data[productIndexToRemove].price * quantityInCart[indexAtRemove][cardId];
        priceObj.innerText = "Rs. " + amount;
        totalAmount.innerText = Number(totalAmount.innerText) - data[productIndexToRemove].price;
    }
    localStorage.setItem("products", JSON.stringify(productsInCart));
    localStorage.setItem("quantity", JSON.stringify(quantityInCart));
}