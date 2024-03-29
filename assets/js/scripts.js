//======CLOCK START======//
var clock = document.querySelector("#utility-clock");
utilityClock(clock);

autoResize(clock, 280 + 32);

function utilityClock(container) {
    var dynamic = container.querySelector(".dynamic");
    var hourElement = container.querySelector(".hour");
    var minuteElement = container.querySelector(".minute");
    var secondElement = container.querySelector(".second");
    var minute = function (n) {
        return n % 5 == 0 ? minuteText(n) : minuteLine(n);
    };
    var minuteText = function (n) {
        var element = document.createElement("div");
        element.className = "minute-text";
        element.innerHTML = (n < 10 ? "0" : "") + n;
        position(element, n / 60, 135);
        dynamic.appendChild(element);
    };
    var minuteLine = function (n) {
        var anchor = document.createElement("div");
        anchor.className = "anchor";
        var element = document.createElement("div");
        element.className = "element minute-line";
        rotate(anchor, n);
        anchor.appendChild(element);
        dynamic.appendChild(anchor);
    };
    var hour = function (n) {
        var element = document.createElement("div");
        element.className = "hour-text hour-" + n;
        element.innerHTML = n;
        position(element, n / 12, 105);
        dynamic.appendChild(element);
    };
    var position = function (element, phase, r) {
        var theta = phase * 2 * Math.PI;
        element.style.top = (-r * Math.cos(theta)).toFixed(1) + "px";
        element.style.left = (r * Math.sin(theta)).toFixed(1) + "px";
    };
    var rotate = function (element, second) {
        element.style.transform = element.style.webkitTransform = "rotate(" + second * 6 + "deg)";
    };
    var animate = function () {
        var now = new Date();
        var time = now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds() * 1 + now.getMilliseconds() / 1000;
        rotate(secondElement, time);
        rotate(minuteElement, time / 60);
        rotate(hourElement, time / 60 / 12);
        requestAnimationFrame(animate);
    };
    for (var i = 1; i <= 60; i++) minute(i);
    for (var i = 1; i <= 12; i++) hour(i);
    animate();
}

function autoResize(element, nativeSize) {
    var update = function () {
        var parent = element.offsetParent;
        var scale = Math.min(parent.offsetWidth, parent.offsetHeight) / nativeSize;
        element.style.transform = element.style.webkitTransform = "scale(" + scale.toFixed(3) + ")";
    };
    update();
    window.addEventListener("resize", update);
}
//======CLOCK END======//

// SLIDESHOW START
var slideIndex = 0;
showSlides();

function showSlides() {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("dot");
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > slides.length) {
        slideIndex = 1;
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
    setTimeout(showSlides, 5000);
}
// SLIDESHOW END
