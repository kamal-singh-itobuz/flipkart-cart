export function addHTML(data, content, isCart) {
    data.forEach((tShirt) => {
        let qtyArr = JSON.parse(localStorage.getItem("quantity") || "[]");
        let indexInQtyArr = qtyArr.findIndex(
            (ele) => Number(Object.keys(ele)[0]) === tShirt.index
        );

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
        isCart === 'cart' ? tshirtPrice.innerText = "Rs. " + tShirt.price * Object.values(qtyArr[indexInQtyArr])[0] : tshirtPrice.innerText = "Rs. " + tShirt.price;
        tshirtPrice.setAttribute("class", "price");
        let addToCartBtn = document.createElement("button");
        addToCartBtn.innerText = "Add to Cart";
        addToCartBtn.setAttribute("class", "add-cart-btn");
        addToCartBtn.setAttribute("data-addcartbuttonid", tShirt.index);

        let addRemoveDiv = document.createElement("div");
        addRemoveDiv.setAttribute("class", "add-remove-btns");
        let removeBtn = document.createElement("button");
        removeBtn.setAttribute("class", "remove-btn");
        removeBtn.setAttribute("data-removebuttonid", tShirt.index);
        removeBtn.innerText = "-";
        let counter = document.createElement("span");
        counter.setAttribute("class", "counter");
        if (indexInQtyArr >= 0) {
            counter.innerText = Object.values(qtyArr[indexInQtyArr])[0];
            addToCartBtn.style.display = "none";
            addRemoveDiv.style.display = "block";
        } else {
            addToCartBtn.style.display = "block";
            counter.innerText = 1;
        }
        let addBtn = document.createElement("button");
        addBtn.setAttribute("class", "add-btn");
        addBtn.setAttribute("data-addbuttonid", tShirt.index);
        addBtn.innerText = "+";
        addRemoveDiv.append(removeBtn, counter, addBtn);

        descpDiv.append(tshirtTitle, tshirtPrice, addToCartBtn, addRemoveDiv);
        cardDiv.appendChild(descpDiv);
        content.appendChild(cardDiv);
    });
}
