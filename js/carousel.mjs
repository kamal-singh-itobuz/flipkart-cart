const carouselItems = document.querySelectorAll('.carousel-item');
const size = carouselItems.length;
let index = 0;
function currentSlide(index) {
    carouselItems.forEach(item => {
        item.style.display = "none";
    });
    carouselItems[index].style.display = "block";
}

function nextItem(index) {
    index = (index + 1) % size;
    currentSlide(index);
}

setInterval(() => {
    index = (index + 1) % size;
    nextItem(index);
}, 2000);