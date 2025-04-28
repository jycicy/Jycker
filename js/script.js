var slideIndex = -1
var timer;


function showSlides() {
    var i;
    var slides = document.getElementsByClassName("slide");
    var dots = document.getElementsByClassName("dot");

    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }

    slideIndex = (slideIndex + 1) % slides.length;

    slides[slideIndex].style.display = "block";
    dots[slideIndex].className += " active";

    timer = setTimeout(showSlides, 3000); // Change image every 5 seconds
}

function changeSlide(n) {
    clearTimeout(timer);
    slideIndex = slideIndex + n;
    showSlides();
}

function currentSlide(n) {
    clearTimeout(timer);
    slideIndex = n;
    showSlides();
}