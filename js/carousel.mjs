const carouselItems = document.querySelectorAll('.carousel-item');
const carouselDotsSection = document.querySelector('.carousel-dots');
const size = carouselItems.length;
let index = -1;

function dotsAdded(carouselDotsSection, size) {
    for (let i = 0; i < size; i++) {
        const dot = document.createElement('span');
        carouselDotsSection.append(dot);
    }
}

function highlightDot(index, dots) {
    dots.forEach(dot => dot.style.backgroundColor = "red");
    dots[index].style.backgroundColor = "black";
}

function currentSlide(index) {
    carouselItems.forEach(item => item.style.transform = 'unset');
    carouselItems[index].style.transform = `translateX(-${100 * index}%)`;
    highlightDot(index, carouselDotsSection.querySelectorAll('span'));
}

function nextItem(index) {
    index = (index + 1) % size;
    currentSlide(index);
}

setInterval(() => {
    index = (index + 1) % size;
    nextItem(index);
}, 2000);

dotsAdded(carouselDotsSection, size);
