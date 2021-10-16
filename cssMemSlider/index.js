const imagesWrapper = document.querySelector(".image-wrapper");
const images = document.getElementsByClassName("image");
const width = images[0].clientWidth + 25; //25 is gap taken from .slider
const texts = document.querySelectorAll("text");
const circles = document.querySelectorAll(".circle");
let counter = 0;
let isEnabled = true;

const slide = (e) => {
	if (isEnabled) {
		//check circle's index in order to slide left ot right
        const index = getCircleIndex(e.target)
		if (index == counter ) {
			return;
		} else if (index < counter) {
			imagesWrapper.style.transition = ".6s";
			counter --;
			imagesWrapper.style.transform = `translateX(${-width * index}px)`;
			activeCircle(getCircleIndex(e.target));
		} else {
			imagesWrapper.style.transition = ".6s";
			counter ++;
			imagesWrapper.style.transform = `translateX(${-width * index}px)`;
			activeCircle(getCircleIndex(e.target));
		}
	}
	isEnabled = false;
};

circles.forEach((circle) => {
	circle.addEventListener("click", slide);
});

imagesWrapper.addEventListener("transitionend", () => {
    if (counter > images.length - 1) {
		counter  = 0;
	} else if (counter < 0) {
		counter = images.length - 1;
	}

	isEnabled = true;
});

function activeCircle(n) {
	for (let circle of circles) {
		circle.classList.remove("active-circle");
	}
	if (n > circles.length - 1) {
		n = 0;
	} else if (n < 0) {
		n = circles.length - 1;
	}
	circles[n].classList.add("active-circle");
}

const getCircleIndex = function (element) {
	let children = element.parentNode.parentNode.children;
	for (let i = 0; i < children.length; i++) {
		if (children[i] == element.parentNode) {
			return i;
		}
	}
	return -i;
};
